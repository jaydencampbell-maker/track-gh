param(
    [ValidateSet("Search", "Apply")]
    [string]$Action = "Search",
    [string]$ProjectRoot = $PSScriptRoot,
    [string]$CatalogPath = (Join-Path $ProjectRoot "athlete-photo-catalog.json"),
    [string]$CandidatesPath = (Join-Path $ProjectRoot "athlete-photo-candidates.csv"),
    [string]$ReportPath = (Join-Path $ProjectRoot "athlete-photo-report.csv"),
    [string]$ManifestPath = (Join-Path $ProjectRoot "athlete-photo-manifest.json"),
    [string]$ImageDirectory = (Join-Path $ProjectRoot "images\athletes")
)

$ErrorActionPreference = "Stop"
$commonsApi = "https://commons.wikimedia.org/w/api.php"
$requestHeaders = @{ "User-Agent" = "PACEIndexBulkPhotos/1.0 (local athlete photo utility)" }

function Get-PlainText {
    param([AllowNull()][object]$Value)
    if ($null -eq $Value) { return "" }
    $text = [System.Net.WebUtility]::HtmlDecode([string]$Value)
    $text = [regex]::Replace($text, "<[^>]*>", " ")
    return [regex]::Replace($text, "\s+", " ").Trim()
}

function Get-MetadataValue {
    param([AllowNull()][object]$Metadata, [string]$Name)
    if ($null -eq $Metadata) { return "" }
    $property = $Metadata.PSObject.Properties[$Name]
    if ($null -eq $property -or $null -eq $property.Value) { return "" }
    return Get-PlainText $property.Value.value
}

function Test-ReusableLicense {
    param([string]$License)
    return $License -match "^(CC0(?:\s|$)|Public domain(?:\s|$)|CC BY(?:\s|$)|CC BY-SA(?:\s|$))"
}

function Test-AttributionLicense {
    param([string]$License)
    return $License -match "^CC BY(?:-SA)?(?:\s|$)"
}

function Test-LicenseUrl {
    param([string]$LicenseUrl)
    if ([string]::IsNullOrWhiteSpace($LicenseUrl)) { return $false }
    try {
        return ([uri]$LicenseUrl).Host -in @("creativecommons.org", "commons.wikimedia.org")
    } catch {
        return $false
    }
}

function Get-SafeId {
    param([string]$Id)
    $safe = $Id.ToLowerInvariant() -replace "[^a-z0-9-]+", "-"
    return $safe.Trim("-")
}

function Get-SourceUrl {
    param([string]$Title)
    $encodedTitle = [uri]::EscapeDataString($Title.Replace(" ", "_"))
    return "https://commons.wikimedia.org/wiki/$encodedTitle"
}

function Get-UniqueAthletes {
    param([object[]]$Athletes)
    $unique = [ordered]@{}
    foreach ($athlete in $Athletes) {
        if ([string]::IsNullOrWhiteSpace([string]$athlete.id) -or [string]::IsNullOrWhiteSpace([string]$athlete.name)) {
            Write-Warning "Skipped a catalog row without an athlete ID or name."
            continue
        }
        if (-not $unique.Contains([string]$athlete.id)) {
            $unique[[string]$athlete.id] = $athlete
        }
    }
    return @($unique.Values)
}

function Get-ExistingCredit {
    param([AllowNull()][object]$Athlete)
    if ($null -eq $Athlete -or $null -eq $Athlete.photoCredit) { return @{ SourceUrl=""; Artist=""; License=""; LicenseUrl="" } }
    return @{
        SourceUrl = [string]$Athlete.photoCredit.sourceUrl
        Artist = [string]$Athlete.photoCredit.artist
        License = [string]$Athlete.photoCredit.license
        LicenseUrl = [string]$Athlete.photoCredit.licenseUrl
    }
}

function Read-Catalog {
    if (-not (Test-Path -LiteralPath $CatalogPath -PathType Leaf)) {
        throw "Catalog not found: $CatalogPath. Export the photo catalog from admin.html and save it in the project folder."
    }
    $catalog = Get-Content -LiteralPath $CatalogPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($catalog.schemaVersion -ne 1 -or $null -eq $catalog.athletes) {
        throw "Catalog format is invalid. Export a fresh catalog from admin.html."
    }
    return ,(Get-UniqueAthletes @($catalog.athletes))
}

function Get-CommonsPage {
    param([string]$Title)
    $query = @{
        action = "query"
        titles = $Title
        prop = "imageinfo"
        iiprop = "url|extmetadata"
        iiurlwidth = "1200"
        format = "json"
        formatversion = "2"
    }
    $uri = $commonsApi + "?" + (($query.GetEnumerator() | ForEach-Object {
        [uri]::EscapeDataString([string]$_.Key) + "=" + [uri]::EscapeDataString([string]$_.Value)
    }) -join "&")
    $response = Invoke-RestMethod -Uri $uri -Headers $requestHeaders -TimeoutSec 45
    $page = @($response.query.pages)[0]
    if ($null -eq $page -or $page.missing -or $null -eq $page.imageinfo -or $page.imageinfo.Count -eq 0) {
        throw "Commons no longer returns image metadata for '$Title'."
    }
    $info = $page.imageinfo[0]
    $metadata = $info.extmetadata
    $license = Get-MetadataValue $metadata "LicenseShortName"
    $licenseUrl = Get-MetadataValue $metadata "LicenseUrl"
    $artist = Get-MetadataValue $metadata "Artist"
    $credit = Get-MetadataValue $metadata "Credit"
    $attributionRequired = (Get-MetadataValue $metadata "AttributionRequired") -match "^(true|yes|1)$"
    if (-not (Test-ReusableLicense $license)) {
        throw "License '$license' is not in the approved CC0, public-domain, CC BY, or CC BY-SA set."
    }
    if (-not (Test-LicenseUrl $licenseUrl)) {
        throw "Commons has no license URL for '$Title'."
    }
    if (($attributionRequired -or (Test-AttributionLicense $license)) -and [string]::IsNullOrWhiteSpace($artist)) {
        throw "The license requires attribution, but Commons provides no creator for '$Title'."
    }
    if ([string]::IsNullOrWhiteSpace($artist)) { $artist = "Creator not listed" }
    $downloadUrl = [string]$info.thumburl
    if ([string]::IsNullOrWhiteSpace($downloadUrl)) { $downloadUrl = [string]$info.url }
    $parsedDownloadUrl = [uri]$downloadUrl
    if ($parsedDownloadUrl.Scheme -ne "https" -or $parsedDownloadUrl.Host -notin @("upload.wikimedia.org", "thumb.wikimedia.org")) {
        throw "Unexpected image download host for '$Title'."
    }
    return [pscustomobject]@{
        title = [string]$page.title
        sourceUrl = Get-SourceUrl ([string]$page.title)
        downloadUrl = $downloadUrl
        artist = $artist
        credit = $credit
        license = $license
        licenseUrl = $licenseUrl
        attributionRequired = $attributionRequired
    }
}

function Write-CsvFile {
    param([object[]]$Rows, [string]$Path, [string[]]$Headers)
    if ($Rows.Count -gt 0) {
        $Rows | Export-Csv -LiteralPath $Path -NoTypeInformation -Encoding UTF8
    } else {
        Set-Content -LiteralPath $Path -Value ($Headers -join ",") -Encoding UTF8
    }
}

function Write-Outputs {
    param([object[]]$ReportRows, [object[]]$ManifestRows, [object[]]$CandidateRows)
    $reportHeaders = @("AthleteId", "AthleteName", "Status", "PhotoPath", "SourceUrl", "Artist", "License", "LicenseUrl", "CandidateCount", "Note")
    Write-CsvFile $ReportRows $ReportPath $reportHeaders
    $manifest = [ordered]@{
        schemaVersion = 1
        generatedAt = [DateTime]::UtcNow.ToString("o")
        source = "Wikimedia Commons"
        photos = @($ManifestRows)
    }
    $manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ManifestPath -Encoding UTF8
    if ($null -ne $CandidateRows) {
        $candidateHeaders = @("AthleteId", "AthleteName", "FileTitle", "SourceUrl", "Artist", "Credit", "License", "LicenseUrl", "LicenseAllowed", "Decision")
        Write-CsvFile $CandidateRows $CandidatesPath $candidateHeaders
    }
}

function Invoke-Search {
    $athletes = Read-Catalog
    $candidateRows = [System.Collections.Generic.List[object]]::new()
    $reportRows = [System.Collections.Generic.List[object]]::new()
    $manifestRows = [System.Collections.Generic.List[object]]::new()
    $safeIds = @{}
    $searchFailures = 0

    foreach ($athlete in $athletes) {
        $id = [string]$athlete.id
        $name = [string]$athlete.name
        $safeId = Get-SafeId $id
        if ([string]::IsNullOrWhiteSpace($safeId)) { throw "Athlete '$name' has an ID that cannot be used for a file name." }
        if ($safeIds.ContainsKey($safeId) -and $safeIds[$safeId] -ne $id) {
            throw "Athlete IDs '$id' and '$($safeIds[$safeId])' map to the same image file name."
        }
        $safeIds[$safeId] = $id

        if ($athlete.hasPhoto) {
            $credit = Get-ExistingCredit $athlete
            $note = if ($credit.Artist) { "Existing photo preserved; credit details included." } else { "Existing photo preserved; no attribution details recorded in the catalog." }
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="already-has-photo"; PhotoPath=""; SourceUrl=$credit.SourceUrl; Artist=$credit.Artist; License=$credit.License; LicenseUrl=$credit.LicenseUrl; CandidateCount=0; Note=$note })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="already-has-photo"; photoPath=""; photoCredit=$null })
            continue
        }

        try {
            $searchText = '"' + $name + '" filetype:bitmap'
            $query = @{
                action = "query"; generator = "search"; gsrsearch = $searchText; gsrnamespace = "6"; gsrlimit = "20"
                prop = "imageinfo"; iiprop = "url|extmetadata"; iiurlwidth = "1200"; format = "json"; formatversion = "2"
            }
            $uri = $commonsApi + "?" + (($query.GetEnumerator() | ForEach-Object {
                [uri]::EscapeDataString([string]$_.Key) + "=" + [uri]::EscapeDataString([string]$_.Value)
            }) -join "&")
            $response = Invoke-RestMethod -Uri $uri -Headers $requestHeaders -TimeoutSec 45
            $pages = @($response.query.pages)
            $usableRows = 0
            foreach ($page in $pages | Select-Object -First 8) {
                if ($null -eq $page.imageinfo -or $page.imageinfo.Count -eq 0) { continue }
                $info = $page.imageinfo[0]
                $metadata = $info.extmetadata
                $license = Get-MetadataValue $metadata "LicenseShortName"
                $licenseUrl = Get-MetadataValue $metadata "LicenseUrl"
                $artist = Get-MetadataValue $metadata "Artist"
                $credit = Get-MetadataValue $metadata "Credit"
                $allowed = Test-ReusableLicense $license
                if ($allowed -and -not (Test-LicenseUrl $licenseUrl)) { $allowed = $false }
                $attributionRequired = (Get-MetadataValue $metadata "AttributionRequired") -match "^(true|yes|1)$"
                if ($allowed -and ($attributionRequired -or (Test-AttributionLicense $license)) -and [string]::IsNullOrWhiteSpace($artist)) { $allowed = $false }
                $candidateRows.Add([pscustomobject]@{
                    AthleteId=$id
                    AthleteName=$name
                    FileTitle=[string]$page.title
                    SourceUrl=Get-SourceUrl ([string]$page.title)
                    Artist=$artist
                    Credit=$credit
                    License=$license
                    LicenseUrl=$licenseUrl
                    LicenseAllowed=[string]$allowed
                    Decision=""
                })
                $usableRows++
            }
            if ($usableRows -gt 0) {
                $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="needs-review"; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=$usableRows; Note="Candidate identity must be confirmed by a person; approve only an exact match with LicenseAllowed=True." })
                $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="uncertain"; photoPath=""; photoCredit=$null })
            } else {
                $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="no-candidates"; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=0; Note="No Commons file candidates returned." })
                $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="missing"; photoPath=""; photoCredit=$null })
            }
        } catch {
            $searchFailures++
            $message = $_.Exception.Message
            Write-Warning "Commons search failed for $name ($id): $message"
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="search-error"; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=0; Note=$message })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="missing"; photoPath=""; photoCredit=$null })
        }
        Start-Sleep -Milliseconds 250
    }
    Write-Outputs @($reportRows) @($manifestRows) @($candidateRows)
    Write-Host "Search complete. Review '$CandidatesPath', then run with -Action Apply. Nothing was downloaded or assigned. Search failures: $searchFailures."
    if ($searchFailures -gt 0) { throw "$searchFailures athlete searches failed. Review the report before continuing." }
}

function Save-OptimizedJpeg {
    param([byte[]]$Bytes, [string]$Path)
    $stream = New-Object System.IO.MemoryStream
    $image = $null
    $bitmap = $null
    $parameters = $null
    try {
        $stream.Write($Bytes, 0, $Bytes.Length)
        $stream.Position = 0
        $image = [System.Drawing.Image]::FromStream($stream, $true, $true)
        $scale = [Math]::Min(1.0, 1200.0 / [Math]::Max($image.Width, $image.Height))
        $width = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
        $height = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))
        $bitmap = [System.Drawing.Bitmap]::new($width, $height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.DrawImage($image, 0, 0, $width, $height)
        } finally {
            $graphics.Dispose()
        }
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
        $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]86)
        $bitmap.Save($Path, $codec, $parameters)
    } finally {
        if ($null -ne $parameters) { $parameters.Dispose() }
        if ($null -ne $bitmap) { $bitmap.Dispose() }
        if ($null -ne $image) { $image.Dispose() }
        $stream.Dispose()
    }
}

function Invoke-Apply {
    Add-Type -AssemblyName System.Drawing
    $athletes = Read-Catalog
    if (-not (Test-Path -LiteralPath $CandidatesPath -PathType Leaf)) {
        throw "Candidate file not found: $CandidatesPath. Run with -Action Search first."
    }
    $candidateRows = @(Import-Csv -LiteralPath $CandidatesPath -Encoding UTF8)
    $approvedById = @{}
    foreach ($candidate in $candidateRows) {
        if ($candidate.Decision -ine "approve") { continue }
        if ($candidate.LicenseAllowed -ine "True") {
            Write-Warning "Ignored an approval with an unapproved license for $($candidate.AthleteName)."
            continue
        }
        if (-not $approvedById.ContainsKey($candidate.AthleteId)) { $approvedById[$candidate.AthleteId] = [System.Collections.Generic.List[object]]::new() }
        $approvedById[$candidate.AthleteId].Add($candidate)
    }
    if (-not (Test-Path -LiteralPath $ImageDirectory -PathType Container)) {
        New-Item -ItemType Directory -Path $ImageDirectory -Force | Out-Null
    }

    $reportRows = [System.Collections.Generic.List[object]]::new()
    $manifestRows = [System.Collections.Generic.List[object]]::new()
    $failures = 0
    $safeIds = @{}
    foreach ($athlete in $athletes) {
        $id = [string]$athlete.id
        $name = [string]$athlete.name
        $safeId = Get-SafeId $id
        if ($safeIds.ContainsKey($safeId) -and $safeIds[$safeId] -ne $id) { throw "Athlete IDs collide as image file names: $id and $($safeIds[$safeId])." }
        $safeIds[$safeId] = $id

        if ($athlete.hasPhoto) {
            $credit = Get-ExistingCredit $athlete
            $note = if ($credit.Artist) { "Existing photo preserved; credit details included." } else { "Existing photo preserved; no attribution details recorded in the catalog." }
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="already-has-photo"; PhotoPath=""; SourceUrl=$credit.SourceUrl; Artist=$credit.Artist; License=$credit.License; LicenseUrl=$credit.LicenseUrl; CandidateCount=0; Note=$note })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="already-has-photo"; photoPath=""; photoCredit=$null })
            continue
        }
        $approved = @()
        if ($approvedById.ContainsKey($id)) { $approved = @($approvedById[$id]) }
        if ($approved.Count -gt 1) {
            $failures++
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="uncertain-multiple-approvals"; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=$approved.Count; Note="Exactly one candidate may be approved per athlete." })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="uncertain"; photoPath=""; photoCredit=$null })
            continue
        }
        if ($approved.Count -eq 0) {
            $candidateCount = @($candidateRows | Where-Object { $_.AthleteId -eq $id }).Count
            $status = if ($candidateCount -gt 0) { "uncertain-not-approved" } else { "missing" }
            $note = if ($candidateCount -gt 0) { "No candidate was explicitly approved; no photo assigned." } else { "No candidate available; placeholder should remain." }
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status=$status; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=$candidateCount; Note=$note })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status=$(if ($candidateCount -gt 0) { "uncertain" } else { "missing" }); photoPath=""; photoCredit=$null })
            continue
        }

        $destinationName = "$safeId.jpg"
        $destinationPath = Join-Path $ImageDirectory $destinationName
        $relativePath = "images/athletes/$destinationName"
        try {
            $metadata = Get-CommonsPage ([string]$approved[0].FileTitle)
            if (-not (Test-Path -LiteralPath $destinationPath -PathType Leaf)) {
                $client = New-Object System.Net.WebClient
                try {
                    $client.Headers.Add("User-Agent", $requestHeaders["User-Agent"])
                    $imageBytes = $client.DownloadData($metadata.downloadUrl)
                } finally {
                    $client.Dispose()
                }
                if ($imageBytes.Length -gt 20000000) {
                    throw "Image download exceeds the 20 MB safety limit."
                }
                Save-OptimizedJpeg ([byte[]]$imageBytes) $destinationPath
            }
            $credit = [pscustomobject]@{
                artist = $metadata.artist
                license = $metadata.license
                licenseUrl = $metadata.licenseUrl
                sourceUrl = $metadata.sourceUrl
                attribution = $metadata.credit
            }
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="downloaded"; PhotoPath=$relativePath; SourceUrl=$metadata.sourceUrl; Artist=$metadata.artist; License=$metadata.license; LicenseUrl=$metadata.licenseUrl; CandidateCount=1; Note="Identity candidate explicitly approved; image optimized to JPEG." })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="downloaded"; photoPath=$relativePath; photoCredit=$credit; identityReviewed=$true })
        } catch {
            $failures++
            $message = $_.Exception.Message
            Write-Warning "Photo processing failed for $name ($id): $message"
            $reportRows.Add([pscustomobject]@{ AthleteId=$id; AthleteName=$name; Status="download-error"; PhotoPath=""; SourceUrl=""; Artist=""; License=""; LicenseUrl=""; CandidateCount=1; Note=$message })
            $manifestRows.Add([pscustomobject]@{ id=$id; name=$name; status="missing"; photoPath=""; photoCredit=$null })
        }
    }
    Write-Outputs @($reportRows) @($manifestRows) $null
    Write-Host "Apply complete. See '$ReportPath' and '$ManifestPath'. Download failures: $failures."
    if ($failures -gt 0) { throw "$failures approved photo downloads failed. Review the report before importing the manifest." }
}

if ($Action -eq "Search") {
    Invoke-Search
} else {
    Invoke-Apply
}
