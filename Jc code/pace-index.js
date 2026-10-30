(() => {
    "use strict";

    const STORAGE_KEY = "pace-index-athletes-v1";
    const DATABASE_STORAGE_KEY = "pace-index-performance-db-v1";
    const HERO_KEY = "pace-index-hero-v2";
    const HIDDEN_GAME_ACCESS_CODE = "yohan blake";
    const HIDDEN_GAME_ACCESS_KEY = "velocity-arcade-access";
    const PHOTO_LIMIT = 1024 * 1024;
    const DEFAULT_PHOTO = "images/5'10 GOAT YOHAN BLAKE.jpg";
    const DEFAULT_HERO_PHOTO = "images/pace-index-hero.jpg";
    const NOAH_PHOTO = "games/images/noah.webp";
    const TATE_PHOTO = "games/images/OIP.webp";

    const eventGroups = [
        { name: "Sprints", events: [["60m", "60 metres"], ["100m", "100 metres"], ["200m", "200 metres"], ["400m", "400 metres"]] },
        { name: "Middle distance", events: [["800m", "800 metres"], ["1500m", "1500 metres"], ["mile", "Mile"]] },
        { name: "Long distance", events: [["3000m", "3000 metres"], ["2.5-mile", "2.5 miles"], ["5000m", "5000 metres"], ["10000m", "10,000 metres"]] },
        { name: "Hurdles", events: [["60mh", "60 metres hurdles"], ["100mh", "100 metres hurdles"], ["110mh", "110 metres hurdles"], ["400mh", "400 metres hurdles"]] },
        { name: "Jumps", events: [["high-jump", "High jump"], ["pole-vault", "Pole vault"], ["long-jump", "Long jump"], ["triple-jump", "Triple jump"]] },
        { name: "Throws", events: [["shot-put", "Shot put"], ["discus", "Discus"], ["hammer", "Hammer"], ["javelin", "Javelin"]] },
        { name: "Combined events", events: [["decathlon", "Decathlon"], ["heptathlon", "Heptathlon"]] },
        { name: "Overall", events: [["overall-ranking", "Overall ranking"]] }
    ];
    const eventNames = Object.fromEntries(eventGroups.flatMap((group) => group.events));
    const fieldEvents = new Set(["high-jump", "pole-vault", "long-jump", "triple-jump", "shot-put", "discus", "hammer", "javelin"]);
    const eventNotes = {
        "60m": "Indoor sprint",
        "100m": "Outdoor sprint · wind reading may apply",
        "200m": "Indoor & outdoor sprint · track configuration differs",
        "400m": "Indoor & outdoor sprint · track configuration differs",
        "800m": "Indoor & outdoor · race format may differ",
        "1500m": "Indoor & outdoor middle distance",
        mile: "Indoor & outdoor middle distance",
        "3000m": "Indoor & outdoor distance",
        "2.5-mile": "2.5 miles (about 4,023 metres) · non-standard track distance",
        "5000m": "Indoor & outdoor distance",
        "10000m": "Outdoor distance",
        "60mh": "Indoor hurdles",
        "100mh": "Women's outdoor hurdles · wind reading may apply",
        "110mh": "Men's outdoor hurdles · wind reading may apply",
        "400mh": "Outdoor hurdles",
        "high-jump": "Indoor & outdoor field event",
        "pole-vault": "Indoor & outdoor field event",
        "long-jump": "Indoor & outdoor · wind reading may apply",
        "triple-jump": "Indoor & outdoor · wind reading may apply",
        "shot-put": "Indoor & outdoor throwing event",
        discus: "Outdoor throwing event",
        hammer: "Outdoor throwing event",
        javelin: "Outdoor throwing event",
        decathlon: "Outdoor combined event",
        heptathlon: "Indoor & outdoor combined event · format differs",
        "overall-ranking": "World Athletics ranking across all events"
    };

    const builtInProfiles = [
        {
            id: "yohan-blake", name: "Yohan Blake", country: "Jamaica", flag: "🇯🇲", gender: "men", ageGroup: "Senior",
            primaryEvent: "100m", events: ["100m", "200m"], seasons: [], classification: "historical-profile", verification: "unverified",
            personalBests: {
                "100m": { display: "9.69 s", score: 9.69, unit: "seconds" },
                "200m": { display: "19.26 s", score: 19.26, unit: "seconds" }
            },
            seasonBests: {}, latestResult: "",
            bio: "Yohan Blake is a Jamaican sprinter and 2011 world 100 m champion. At the London 2012 Olympic Games, he earned silver in the 100 m and 200 m and helped Jamaica set the 4 × 100 m relay world record. The personal-best marks were previously entered in this project and still need source verification.",
            achievements: ["2011 World Championships 100 m champion", "2012 Olympic silver medallist in the 100 m and 200 m", "Member of Jamaica's 4 × 100 m world-record team at London 2012"],
            timeline: [
                { year: "2011", title: "World Championships", detail: "Won the men's 100 m world title." },
                { year: "2012", title: "London Olympic Games", detail: "Won silver in the men's 100 m and 200 m and helped Jamaica set the 4 × 100 m world record." }
            ],
            progression: [], results: [],
            source: "https://worldathletics.org/athletes/united-states/noah-lyles-14536762",
            verifiedDate: "2026-10-28"
        },
        {
            id: "noah-lyles", name: "Noah Lyles", country: "United States", flag: "🇺🇸", gender: "men", ageGroup: "Senior",
            primaryEvent: "100m", events: ["100m", "200m"], seasons: ["outdoor"], verification: "manual",
            countryVerification: "verified",
            photo: NOAH_PHOTO,
            personalBests: {
                "100m": { display: "9.79 s", score: 9.79, unit: "seconds", verificationStatus: "verified", sourceUrl: "https://worldathletics.org/athletes/united-states/noah-lyles-14536762", lastCheckedDate: "2026-10-28", date: "2024-08-04" },
                "200m": { display: "19.31 s", score: 19.31, unit: "seconds", verificationStatus: "verified", sourceUrl: "https://worldathletics.org/athletes/united-states/noah-lyles-14536762", lastCheckedDate: "2026-10-28", date: "2022-07-21" }
            },
            seasonBests: {
                "100m": { display: "9.79 s", score: 9.79, season: "2026", seasonFormat: "outdoor", date: "2026-07-24", sourceUrl: "https://worldathletics.org/records/toplists/sprints/100-metres/outdoor/men/senior/2026", verificationStatus: "verified", lastCheckedDate: "2026-10-28" }
            },
            latestResult: "",
            bio: "Noah Lyles is an American sprinter known for his performances in the 100 m and 200 m. The personal bests and rankings shown here are linked to World Athletics; other profile details remain subject to source review.",
            achievements: [
                "2023 World Athletics Championships gold medallist in the 100 m and 200 m",
                "Olympic 100 m gold medallist at the Paris 2024 Olympic Games"
            ],
            timeline: [
                { year: "2023", title: "World Championships", detail: "World champion in both the men's 100 m and 200 m." },
                { year: "2024", title: "Paris Olympic Games", detail: "Olympic gold medallist in the men's 100 m." }
            ],
            progression: [], results: [],
            source: "https://worldathletics.org/athletes/united-states/noah-lyles-14536762",
            verifiedDate: "2026-10-28"
        },
        {
            id: "tate-taylor", name: "Tate Taylor", country: "", flag: "", gender: "", ageGroup: "",
            primaryEvent: "", events: [], seasons: [], verification: "manual", photo: TATE_PHOTO,
            personalBests: {}, seasonBests: {}, latestResult: "",
            bio: "", achievements: [], progression: [], results: [], source: "", verifiedDate: ""
        },
        {
            id: "jayden-jecrois", name: "Jayden Jecrois", country: "", flag: "", gender: "", ageGroup: "",
            nickname: "Casey",
            teamRank: 2,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "3000m", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified", profileAgeGroup: "",
            personalBests: {
                "3000m": {
                    display: "10:38.9", score: 638.9, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "https://www.athletic.net/result/VxFLZp4SLVX01", date: "2026-10-03"
                }
            },
            seasonBests: {
                "3000m": {
                    display: "10:38.9", score: 638.9, season: "2026", seasonFormat: "outdoor",
                    date: "2026-10-03", sourceUrl: "https://www.athletic.net/result/VxFLZp4SLVX01",
                    verificationStatus: "unverified"
                },
                "5000m": {
                    display: "17:22.9", score: 1042.9, season: "2026", seasonFormat: "outdoor",
                    sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "Don’t run too far, I don’t feel like running very fast today",
            profileBio: "Don’t run too far, I don’t feel like running very fast today",
            profileStatus: "The supplied Athletic.net profile is marked claimed by Jayden Jecrois. Results and school details are shown as provided and have not been independently verified.",
            storyQuote: "They thought they could outrun me, but they don't know I am speed—and the future of all of XC.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "10th Grade",
                teamPlace: "2nd",
                profileUrl: "https://www.athletic.net/profile/33389686/log/",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "3000m", label: "Personal best", mark: "10:38.9", sourceUrl: "https://www.athletic.net/result/VxFLZp4SLVX01" },
                    { event: "5000m", label: "Season best", mark: "17:22.9", sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests" }
                ],
                meets: [
                    { date: "Sep 12, 2026", name: "Highland Park Invitational", distance: "3.11 mi" },
                    { date: "Oct 3, 2026", name: "MSTCA Frank Kelley (Daytime Meet)", distance: "1.86 mi", mark: "10:38.9 · 3,000m PB" },
                    { date: "Oct 10, 2026", name: "MSTCA Bob Glennon Twilight XC (Small & Medium Schools)", distance: "3.11 mi" },
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "3.11 mi" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/33389686/cross-country",
            verifiedDate: ""
        },
        {
            id: "casey-fitzgerald", name: "Casey Fitzgerald", country: "", flag: "", gender: "", ageGroup: "",
            profileTagline: "Jayden papa",
            teamRank: 1, teamRole: "Captain",
            primaryEvent: "2.5-mile", events: ["2.5-mile", "3000m", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified", profileAgeGroup: "",
            userRanks: { "2.5-mile": 1 },
            personalBests: {
                "3000m": {
                    display: "10:28.1", score: 628.1, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "https://www.athletic.net/result/rOF4R85CyBeWn", date: "2026-10-03"
                }
            },
            seasonBests: {
                "3000m": {
                    display: "10:28.1", score: 628.1, season: "2026", seasonFormat: "outdoor",
                    date: "2026-10-03", sourceUrl: "https://www.athletic.net/result/rOF4R85CyBeWn",
                    verificationStatus: "unverified"
                },
                "5000m": {
                    display: "17:06.1", score: 1026.1, season: "2026", seasonFormat: "outdoor",
                    sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is marked claimed by Casey Fitzgerald. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "11th Grade",
                teamPlace: "1st",
                profileUrl: "https://www.athletic.net/profile/26714652/log/",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "3000m", label: "Personal best", mark: "10:28.1", sourceUrl: "https://www.athletic.net/result/rOF4R85CyBeWn" },
                    { event: "5000m", label: "Season best", mark: "17:06.1", sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests" }
                ],
                meets: [
                    { date: "Sep 12, 2026", name: "Highland Park Invitational", distance: "3.11 mi", mark: "18:29.5 · 5,000m" },
                    { date: "Oct 3, 2026", name: "MSTCA Frank Kelley (Daytime Meet)", distance: "1.86 mi", mark: "10:28.1 · 3,000m PB" },
                    { date: "Oct 10, 2026", name: "MSTCA Bob Glennon Twilight XC (Small & Medium Schools)", distance: "3.11 mi" },
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "3.11 mi" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" }
                ]
            },
            achievements: ["High school cross-country state champion in two consecutive years (user-provided; unverified)."],
            progression: [], results: [],
            source: "https://www.athletic.net/profile/26714652/cross-country",
            verifiedDate: ""
        },
        {
            id: "shepherd-ward", name: "Shepherd Ward", country: "", flag: "", gender: "", ageGroup: "",
            nickname: "Hawk",
            teamRank: 3,
            teamRank: 3,
            primaryEvent: "5000m", events: ["2.5-mile", "5000m"], seasons: ["outdoor"], classification: "seed-profile", verification: "unverified",
            personalBests: {
                "5000m": {
                    display: "18:52.1", score: 1132.1, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/wyF165yiVeJzg", date: "2026-10-10"
                }
            },
            seasonBests: {
                "5000m": {
                    display: "18:52.1", score: 1132.1, season: "2026", seasonFormat: "outdoor",
                    sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net page indicates the profile has not been claimed. Results and team details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                teamPlace: "3rd",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "5000m", label: "Personal best", mark: "18:52.1", sourceUrl: "http://www.athletic.net/result/wyF165yiVeJzg" }
                ],
                meets: [
                    { date: "Oct 10, 2026", name: "MSTCA Bob Glennon Twilight XC (Small & Medium Schools)", distance: "3.11 mi", mark: "18:52.1 · 5,000m PB" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/athlete/33158207/cross-country",
            verifiedDate: ""
        },
        {
            id: "moses-fellman", name: "Moses Fellman", country: "", flag: "", gender: "", ageGroup: "",
            teamRank: 4,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "3000m", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified",
            personalBests: {
                "3000m": {
                    display: "12:54.5", score: 774.5, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/z3FV3aWszRYpE", date: "2026-09-12"
                },
                "5000m": {
                    display: "19:48.6", score: 1188.6, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/EdFdWvZuRAJyq", date: "2026-10-20"
                }
            },
            seasonBests: {
                "3000m": {
                    display: "12:54.5", score: 774.5, season: "2026", seasonFormat: "outdoor",
                    date: "2026-09-12", sourceUrl: "http://www.athletic.net/result/z3FV3aWszRYpE",
                    verificationStatus: "unverified"
                },
                "5000m": {
                    display: "19:48.6", score: 1188.6, season: "2026", seasonFormat: "outdoor",
                    date: "2026-10-20", sourceUrl: "http://www.athletic.net/result/EdFdWvZuRAJyq",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is not claimed. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "10th Grade",
                teamPlace: "3rd (3,000m) · 4th (5,000m)",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "3000m", label: "Personal best · team place 3rd", mark: "12:54.5", sourceUrl: "http://www.athletic.net/result/z3FV3aWszRYpE" },
                    { event: "5000m", label: "Personal best · team place 4th", mark: "19:48.6", sourceUrl: "http://www.athletic.net/result/EdFdWvZuRAJyq" }
                ],
                meets: [
                    { date: "Sep 12, 2026", name: "Highland Park Invitational", distance: "1.86 mi", mark: "12:54.5 · 3,000m PB" },
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "3.11 mi", mark: "19:48.6 · 5,000m PB" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" },
                    { date: "Oct 28, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" },
                    { date: "Nov 8, 2026 · scheduled", name: "MIAA Division 3A-3B-3C", distance: "3.11 mi" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/29833982",
            verifiedDate: ""
        },
        {
            id: "aaron-michaloski", name: "Aaron Michaloski", country: "", flag: "", gender: "", ageGroup: "",
            teamRank: 5,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified",
            personalBests: {}, seasonBests: {}, latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is not claimed. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "10th Grade",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "5000m", label: "Meet result · 39th place", mark: "20:55.0", sourceUrl: "http://www.athletic.net/result/RxFBZxJUEZKE0" }
                ],
                meets: [
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "3.11 mi", mark: "20:55.0 · 5,000m · 39th place" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/33313127",
            verifiedDate: ""
        },
        {
            id: "jake-pilarella", name: "Jake Pilarella", country: "", flag: "", gender: "", ageGroup: "",
            teamRank: 6,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "3000m", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified",
            personalBests: {
                "3000m": {
                    display: "14:30.1", score: 870.1, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/OyFOorguJwvpz", date: "2026-09-12"
                }
            },
            seasonBests: {
                "3000m": {
                    display: "14:30.1", score: 870.1, season: "2026", seasonFormat: "outdoor",
                    date: "2026-09-12", sourceUrl: "http://www.athletic.net/result/OyFOorguJwvpz",
                    verificationStatus: "unverified"
                },
                "5000m": {
                    display: "22:50.6", score: 1370.6, season: "2026", seasonFormat: "outdoor",
                    sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is not claimed. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "11th Grade",
                teamPlace: "5th (3,000m) · 6th (5,000m)",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "3000m", label: "Personal best · team place 5th", mark: "14:30.1", sourceUrl: "http://www.athletic.net/result/OyFOorguJwvpz" },
                    { event: "5000m", label: "Season best · team place 6th", mark: "22:50.6", sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests" }
                ],
                meets: [
                    { date: "Sep 12, 2026", name: "Highland Park Invitational", distance: "1.86 mi", mark: "14:30.1 · 3,000m PB" },
                    { date: "Oct 10, 2026", name: "MSTCA Bob Glennon Twilight XC (Small & Medium Schools)", distance: "3.11 mi", mark: "24:06.0 · 5,000m" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/33158208/cross-country",
            verifiedDate: ""
        },
        {
            id: "landon-donahue", name: "Landon Donahue", country: "", flag: "", gender: "", ageGroup: "",
            teamRank: 7,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "3000m", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified",
            personalBests: {
                "3000m": {
                    display: "14:01.3", score: 841.3, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/KAFNmvEiv4xlm", date: "2026-10-03"
                }
            },
            seasonBests: {
                "3000m": {
                    display: "14:01.3", score: 841.3, season: "2026", seasonFormat: "outdoor",
                    date: "2026-10-03", sourceUrl: "http://www.athletic.net/result/KAFNmvEiv4xlm",
                    verificationStatus: "unverified"
                },
                "5000m": {
                    display: "23:54.3", score: 1434.3, season: "2026", seasonFormat: "outdoor",
                    sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is not claimed. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "10th Grade",
                teamPlace: "4th (3,000m) · 1st (2.1 miles) · 7th (5,000m)",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "3000m", label: "Personal best · team place 4th", mark: "14:01.3", sourceUrl: "http://www.athletic.net/result/KAFNmvEiv4xlm" },
                    { event: "2.1 miles", label: "Personal best · team place 1st", mark: "14:37.4", sourceUrl: "http://www.athletic.net/result/PlFW4BEINBgA0" },
                    { event: "5000m", label: "Season best · team place 7th", mark: "23:54.3", sourceUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests" }
                ],
                meets: [
                    { date: "Oct 3, 2026", name: "MSTCA Frank Kelley (Daytime Meet)", distance: "1.86 mi", mark: "14:01.3 · 3,000m PB" },
                    { date: "Oct 10, 2026", name: "MSTCA Bob Glennon Twilight XC (Small & Medium Schools)", distance: "2.1 mi", mark: "14:37.4 · 2.1-mile PB" },
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "3.11 mi", mark: "24:28.2 · 5,000m" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi" },
                    { date: "Nov 8, 2026 · scheduled", name: "MIAA Division 3A-3B-3C", distance: "3.11 mi" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/29833977",
            verifiedDate: ""
        },
        {
            id: "jayden-cambell", name: "Jayden Cambell", country: "", flag: "", gender: "", ageGroup: "",
            teamRank: 8,
            primaryEvent: "2.5-mile", events: ["2.5-mile", "5000m"], seasons: ["outdoor"],
            classification: "seed-profile", verification: "unverified",
            personalBests: {
                "5000m": {
                    display: "26:27.6", score: 1587.6, unit: "seconds", verificationStatus: "unverified",
                    sourceUrl: "http://www.athletic.net/result/xoFQyKLtpja0r", date: "2026-10-26"
                }
            },
            seasonBests: {
                "5000m": {
                    display: "26:27.6", score: 1587.6, season: "2026", seasonFormat: "outdoor",
                    date: "2026-10-26", sourceUrl: "http://www.athletic.net/result/xoFQyKLtpja0r",
                    verificationStatus: "unverified"
                }
            },
            latestResult: "",
            bio: "",
            profileStatus: "The supplied Athletic.net profile is not claimed. Results and school details are shown as provided and have not been independently verified.",
            crossCountrySeason: {
                season: "2026",
                team: "Cape Cod Reg Tech",
                division: "Division 3 · Massachusetts · High School",
                grade: "9th Grade",
                teamPlace: "1st (1.55 miles) · 8th (5,000m)",
                teamUrl: "https://www.athletic.net/team/19268/cross-country/2026/season-bests",
                records: [
                    { event: "1.55 miles", label: "Personal best · team place 1st", mark: "11:48.7", sourceUrl: "http://www.athletic.net/result/4qF5jarT60ZoV" },
                    { event: "5000m", label: "Personal best · team place 8th", mark: "26:27.6", sourceUrl: "http://www.athletic.net/result/xoFQyKLtpja0r" }
                ],
                meets: [
                    { date: "Oct 20, 2026", name: "Mayflower Athletic Conference Championships", distance: "1.55 mi", mark: "11:48.7 · 1.55-mile PB" },
                    { date: "Oct 26, 2026", name: "MVADA Cross Country Championships", distance: "3.11 mi", mark: "26:27.6 · 5,000m PB" }
                ]
            },
            achievements: [], progression: [], results: [],
            source: "https://www.athletic.net/profile/33313271",
            verifiedDate: ""
        }
    ];

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    let activeEvent = "100m";
    let athletes = [];
    const database = window.PACE_INDEX_DATABASE || {
        athletes: [], performances: [], rankingSnapshots: [], competitions: []
    };

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
    }

    function loadAthletes() {
        const seeds = Array.isArray(database.athletes) ? database.athletes : [];
        const defaultsById = new Map(builtInProfiles.map((athlete) => [athlete.id, athlete]));
        seeds.forEach((seed) => {
            const existing = defaultsById.get(seed.id);
            defaultsById.set(seed.id, existing ? {
                ...seed,
                ...existing,
                events: [...new Set([...(seed.events || []), ...(existing.events || [])])],
                country: existing.country || seed.country,
                flag: existing.flag || seed.flag,
                photo: existing.photo || seed.photo,
                classification: seed.classification
            } : seed);
        });

        const mergeStoredProfiles = (storedProfiles) => {
            const storedById = new Map(storedProfiles.map((athlete) => [athlete.id, athlete]));
            const seededProfiles = [...defaultsById.values()].map((seed) => {
                const stored = storedById.get(seed.id);
                if (!stored) return seed;
                storedById.delete(seed.id);
                const mergeMarkData = (defaults = {}, saved = {}) => {
                    const merged = { ...defaults, ...saved };
                    Object.entries(defaults).forEach(([event, mark]) => {
                        const savedMark = saved[event];
                        if (!savedMark) return;
                        merged[event] = savedMark.display === mark.display
                            ? { ...savedMark, ...mark }
                            : savedMark;
                    });
                    return merged;
                };
                return {
                    ...seed,
                    ...stored,
                    events: [...new Set([...(seed.events || []), ...(stored.events || [])])],
                    personalBests: mergeMarkData(seed.personalBests, stored.personalBests),
                    seasonBests: mergeMarkData(seed.seasonBests, stored.seasonBests),
                    achievements: [...new Set([...(seed.achievements || []), ...(stored.achievements || [])])],
                    results: [...new Map([...(seed.results || []), ...(stored.results || [])]
                        .map((result) => [`${result.event}|${result.date}|${result.mark}|${result.competition}`, result])).values()],
                    bio: seed.profileBio ?? stored.bio ?? seed.bio ?? "",
                    profileHook: stored.profileHook || seed.profileHook || "",
                    country: stored.country || seed.country || "",
                    flag: stored.flag || seed.flag || "",
                    ageGroup: seed.profileAgeGroup ?? stored.ageGroup ?? seed.ageGroup ?? "",
                    gender: stored.gender || seed.gender || "",
                    photo: stored.photo || seed.photo || "",
                    primaryEvent: seed.profilePrimaryEvent || stored.primaryEvent || seed.primaryEvent || "",
                    profileStatus: stored.profileStatus || seed.profileStatus || "",
                    crossCountrySeason: seed.crossCountrySeason || stored.crossCountrySeason,
                    countryVerification: seed.countryVerification || stored.countryVerification || "",
                    source: stored.source || seed.source || "",
                    verifiedDate: stored.verifiedDate || seed.verifiedDate || "",
                    classification: seed.classification || stored.classification,
                    dataNote: seed.dataNote || stored.dataNote
                };
            });
            return [...seededProfiles, ...storedById.values()];
        };

        try {
            const databaseStorage = localStorage.getItem(DATABASE_STORAGE_KEY);
            if (databaseStorage) {
                const persisted = JSON.parse(databaseStorage);
                if (!persisted || !Array.isArray(persisted.performances) || !Array.isArray(persisted.rankingSnapshots)) {
                    throw new Error("Stored results database has an invalid shape.");
                }
                const mergeRecords = (defaults, stored, getKey) => {
                    const records = new Map(defaults.map((record) => [getKey(record), record]));
                    stored.forEach((record) => records.set(getKey(record), record));
                    return [...records.values()];
                };
                database.performances = mergeRecords(database.performances || [], persisted.performances, (record) => record.id);
                database.rankingSnapshots = mergeRecords(database.rankingSnapshots || [], persisted.rankingSnapshots, (record) => record.storageKey || record.id);
                database.competitions = mergeRecords(database.competitions || [], persisted.competitions || [], (record) => record.id);
            }
        } catch (error) {
            console.error("Could not load stored performances or ranking snapshots:", error);
            showStorageWarning("Saved ranking data could not be loaded. Only unranked seed profiles are available.");
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                const initial = mergeStoredProfiles([]);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
                return initial;
            }
            const parsed = JSON.parse(stored);
            if (!Array.isArray(parsed)) {
                throw new Error("Stored athlete data is not a list.");
            }
            const validAthletes = parsed.filter((athlete) =>
                athlete && typeof athlete.id === "string" && typeof athlete.name === "string"
                && !athlete.id.startsWith("demo-") && !athlete.name.startsWith("Demo ")
            );
            const updatedAthletes = mergeStoredProfiles(validAthletes);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAthletes));
            return updatedAthletes;
        } catch (error) {
            console.error("Could not read local demo data:", error);
            showStorageWarning("Browser storage is unavailable or contains invalid data. Showing the built-in demonstration records instead.");
            return mergeStoredProfiles([]);
        }
    }

    function saveAthletes(nextAthletes) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAthletes));
            athletes = nextAthletes;
            return true;
        } catch (error) {
            console.error("Could not save local demo data:", error);
            return false;
        }
    }

    function saveRankingDatabase() {
        try {
            localStorage.setItem(DATABASE_STORAGE_KEY, JSON.stringify({
                performances: database.performances || [],
                competitions: database.competitions || [],
                rankingSnapshots: database.rankingSnapshots || []
            }));
            return true;
        } catch (error) {
            console.error("Could not save ranking database:", error);
            return false;
        }
    }

    function showStorageWarning(message) {
        const summary = $("#ranking-summary");
        const adminMessage = $("#admin-message");
        if (summary) summary.textContent = message;
        if (adminMessage) adminMessage.textContent = message;
    }

    function getStoredValue(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error("Could not read browser storage:", error);
            showStorageWarning("Browser storage is disabled. Local changes and custom images may not persist.");
            return null;
        }
    }

    function photoFor(athlete) {
        return athlete.photo || ({
            "yohan-blake": DEFAULT_PHOTO,
            "noah-lyles": NOAH_PHOTO,
            "tate-taylor": TATE_PHOTO
        })[athlete.id] || "";
    }

    function photoCreditMarkup(athlete) {
        const credit = athlete.photoCredit;
        if (!photoFor(athlete) || !credit) return "";
        const sourceUrl = safeSourceUrl(credit.sourceUrl);
        const licenseUrl = safeSourceUrl(credit.licenseUrl);
        const attribution = String(credit.attribution || "").trim() || credit.artist || "Wikimedia Commons";
        return `<small class="athlete-photo-credit">Photo: ${escapeHtml(attribution)} · ${licenseUrl ? `<a href="${escapeHtml(licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(credit.license || "License")}</a>` : escapeHtml(credit.license || "License details")} ${sourceUrl ? `· <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">Source</a>` : ""}</small>`;
    }

    function statusLabel(athlete) {
        if (athlete.verification === "verified") return '<span class="verified-label">Source reviewed</span>';
        if (athlete.verification === "manual") return '<span class="manual-label">Manual entry</span>';
        return '<span class="demo-label">Demo / unverified</span>';
    }

    function parseMarkScore(display) {
        const value = display.trim().replace(/,/g, ".");
        const time = value.match(/^(\d+):(\d+(?:\.\d+)?)\s*(?:s|sec|seconds)?$/i);
        if (time) return Number(time[1]) * 60 + Number(time[2]);
        const numeric = value.match(/^-?\d+(?:\.\d+)?/);
        if (!numeric) return null;
        const score = Number(numeric[0]);
        return Number.isFinite(score) ? score : null;
    }

    function initMobileNavigation() {
        const toggle = $(".menu-toggle");
        const nav = $("#primary-nav");
        if (!toggle || !nav) return;
        toggle.addEventListener("click", () => {
            const open = toggle.getAttribute("aria-expanded") !== "true";
            toggle.setAttribute("aria-expanded", String(open));
            nav.classList.toggle("is-open", open);
        });
        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                toggle.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
            }
        });
    }

    function initKeyboardShortcuts() {
        window.addEventListener("keydown", (event) => {
            const target = event.target;
            const isEditing = target instanceof HTMLElement
                && (target.isContentEditable || target.matches("input, textarea, select"));
            if (event.defaultPrevented || event.key !== "9" || event.repeat
                || event.altKey || event.ctrlKey || event.metaKey || isEditing) return;
            window.location.assign("https://classroom.google.com/");
        });
    }

    function initReveal() {
        const revealItems = $$(".reveal");
        if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => observer.observe(item));
    }

    function initEventExplorer() {
        const groups = $("#event-groups");
        if (!groups) return;
        const hiddenGameDialog = $("#hidden-game-dialog");
        const hiddenGameForm = $("#hidden-game-access-form");
        const hiddenGameCode = $("#hidden-game-code");
        const hiddenGameError = $("#hidden-game-error");
        $("#hidden-game-cancel")?.addEventListener("click", () => hiddenGameDialog?.close());
        hiddenGameForm?.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!hiddenGameCode || !hiddenGameError) return;
            if (hiddenGameCode.value.trim().toLowerCase() !== HIDDEN_GAME_ACCESS_CODE) {
                hiddenGameError.textContent = "That code is not correct. Try again.";
                hiddenGameError.hidden = false;
                hiddenGameCode.select();
                return;
            }
            try {
                sessionStorage.setItem(HIDDEN_GAME_ACCESS_KEY, "granted");
            } catch (error) {
                console.error("Could not start the hidden arcade session:", error);
                hiddenGameError.textContent = "The arcade could not open because browser session storage is unavailable.";
                hiddenGameError.hidden = false;
                return;
            }
            hiddenGameDialog.close();
            window.location.assign("arcade.html");
        });
        groups.innerHTML = eventGroups.map((group) => `
            <section class="event-group" aria-label="${escapeHtml(group.name)}">
                <h3>${escapeHtml(group.name.toUpperCase())}</h3>
                <div class="event-buttons">${group.events.map(([id, name]) => `
                    <button class="event-button" type="button" data-event="${escapeHtml(id)}" aria-pressed="${id === activeEvent}">${escapeHtml(name)}</button>
                `).join("")}</div>
            </section>
        `).join("");
        groups.addEventListener("click", (event) => {
            const button = event.target.closest("[data-event]");
            if (!button) return;
            if (button.dataset.event === "overall-ranking") {
                if (!hiddenGameDialog || !hiddenGameCode) {
                    showStorageWarning("The hidden arcade access form is unavailable.");
                    return;
                }
                hiddenGameCode.value = "";
                if (hiddenGameError) {
                    hiddenGameError.textContent = "";
                    hiddenGameError.hidden = true;
                }
                hiddenGameDialog.showModal();
                hiddenGameCode.focus();
                return;
            }
            activeEvent = button.dataset.event;
            $$(".event-button", groups).forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            updateEventDetail();
            renderRankings();
        });
        updateEventDetail();
    }

    function eventNote(eventId, athlete) {
        const athleteSeason = athlete && athlete.seasons?.length === 1 ? ` · sample ${athlete.seasons[0]}` : "";
        return `${eventNotes[eventId] || "Competition format depends on the rules"}${athleteSeason}`;
    }

    function updateEventDetail() {
        const name = $("#selected-event-name");
        const note = $("#selected-event-note");
        if (!name || !note) return;
        name.textContent = eventNames[activeEvent] || activeEvent;
        note.textContent = eventNote(activeEvent);
    }

    function renderRankings() {
        const grid = $("#athlete-grid");
        if (!grid) return;
        const scope = $("#global-scope")?.value || "world";
        const age = $("#age-filter")?.value || "all";
        const season = $("#season-filter")?.value || "all";
        const gender = $("#gender-filter")?.value || "all";
        const query = ($("#athlete-search")?.value || "").trim().toLowerCase();
        const sort = $("#sort-filter")?.value || "name";
        const type = $("#ranking-type")?.value || "profiles";
        const matchesFilters = (athlete) =>
            (scope !== "usa" || athlete.country === "United States")
            && (age === "all" || athlete.ageGroup === age)
            && (gender === "all" || athlete.gender === gender)
            && (season === "all" || athlete.seasons?.includes(season));
        const matchesSearch = (athlete) => athlete.name.toLowerCase().includes(query);
        const records = [];

        if (type === "profiles" || type === "historical") {
            athletes.forEach((athlete) => {
                const historical = athlete.classification === "historical-profile";
                if ((type === "historical") !== historical) return;
                if (!athlete.events?.includes(activeEvent) || !matchesFilters(athlete) || !matchesSearch(athlete)) return;
                const hasTeamOrder = type === "profiles" && activeEvent === "2.5-mile" && Number.isInteger(athlete.teamRank);
                const userRank = hasTeamOrder ? athlete.teamRank : athlete.userRanks?.[activeEvent];
                records.push({
                    athlete,
                    rank: Number.isInteger(userRank) && userRank > 0 ? userRank : null,
                    mark: null,
                    source: null,
                    label: hasTeamOrder
                        ? "USER-PROVIDED TEAM POSITION / UNVERIFIED"
                        : Number.isInteger(userRank) && userRank > 0
                        ? "USER-PROVIDED RANK / UNVERIFIED"
                        : historical ? "HISTORICAL PROFILE / NOT RANKED" : "SEED PROFILE / NOT RANKED"
                });
            });
        } else if (type === "current-season" || type === "official") {
            (database.rankingSnapshots || []).forEach((snapshot) => {
                const verifiedSnapshot = snapshot.verificationStatus === "verified"
                    && Boolean(safeSourceUrl(snapshot.sourceUrl))
                    && Boolean(snapshot.asOfDate)
                    && Boolean(snapshot.verifiedAt);
                if (!verifiedSnapshot
                    || snapshot.rankingType !== type
                    || snapshot.event !== activeEvent
                    || (scope === "usa" && snapshot.countryScope !== "usa")
                    || (scope === "world" && snapshot.countryScope !== "world")
                    || (gender !== "all" && snapshot.gender !== gender)
                    || (age !== "all" && snapshot.ageGroup !== age)
                    || (season !== "all" && snapshot.seasonFormat !== season)) return;
                (snapshot.entries || []).forEach((entry) => {
                    const athlete = athletes.find((candidate) => candidate.id === entry.athleteId);
                    if (!athlete || !matchesFilters(athlete) || !matchesSearch(athlete)) return;
                    const performance = (database.performances || []).find((item) => item.id === entry.performanceId);
                    if (entry.performanceId && (!performance || performance.verificationStatus !== "verified"
                        || !safeSourceUrl(performance.sourceUrl) || !performance.lastCheckedDate)) return;
                    records.push({
                        athlete,
                        rank: entry.rank,
                        mark: performance?.mark || entry.mark || null,
                        numericMark: performance?.numericMark ?? parseMarkScore(performance?.mark || entry.mark || ""),
                        source: snapshot,
                        label: `${type === "official" ? `OFFICIAL / ${snapshot.organization}` : `CURRENT SEASON / ${snapshot.season}`}${snapshot.completeness === "partial" ? " / PARTIAL SNAPSHOT" : ""}`
                    });
                });
            });
        } else if (type === "all-time") {
            (database.performances || []).forEach((performance) => {
                const athlete = athletes.find((candidate) => candidate.id === performance.athleteId);
                if (!athlete || performance.listType !== "all-time"
                    || performance.verificationStatus !== "verified"
                    || !safeSourceUrl(performance.sourceUrl)
                    || !performance.lastCheckedDate
                    || performance.event !== activeEvent
                    || !athlete.events?.includes(activeEvent)
                    || !matchesFilters(athlete)
                    || !matchesSearch(athlete)) return;
                records.push({ athlete, rank: null, mark: performance.mark, numericMark: performance.numericMark, source: performance, label: "ALL-TIME PERFORMANCE / VERIFIED" });
            });
        }

        records.sort((left, right) => {
            if (type === "profiles" && activeEvent === "2.5-mile") {
                const leftRank = Number.isInteger(left.athlete.teamRank) ? left.athlete.teamRank : Number.MAX_SAFE_INTEGER;
                const rightRank = Number.isInteger(right.athlete.teamRank) ? right.athlete.teamRank : Number.MAX_SAFE_INTEGER;
                if (leftRank !== rightRank) return leftRank - rightRank;
            }
            if (sort === "rank" && left.rank !== null && right.rank !== null) return left.rank - right.rank;
            if (sort === "mark" && Number.isFinite(left.numericMark) && Number.isFinite(right.numericMark)) {
                const difference = left.numericMark - right.numericMark;
                return fieldEvents.has(activeEvent) ? -difference : difference;
            }
            return left.athlete.name.localeCompare(right.athlete.name);
        });

        grid.innerHTML = records.map(({ athlete, rank, mark, source, label }) => {
            const photo = photoFor(athlete);
            const profileMode = type === "profiles" || type === "historical";
            const personalBest = profileMode ? athlete.personalBests?.[activeEvent] : null;
            const displayedMark = mark || personalBest?.display || null;
            const athleteIdentity = athlete.country
                ? `${escapeHtml(athlete.flag || "")} ${escapeHtml(athlete.country)}${athlete.countryVerification === "verified" ? "" : " · unverified"}`
                : athlete.crossCountrySeason?.team
                    ? `${escapeHtml(athlete.crossCountrySeason.team)} · team listed`
                    : "Country not verified";
            const position = rank === null || rank === undefined ? "Not ranked" : `#${escapeHtml(rank)}`;
            const recordSource = source || personalBest;
            const sourceLink = recordSource?.sourceUrl
                ? `<a class="text-link" href="${escapeHtml(safeSourceUrl(recordSource.sourceUrl))}" target="_blank" rel="noopener noreferrer">Source ↗</a>`
                : "";
            const provenance = label === "USER-PROVIDED TEAM POSITION / UNVERIFIED"
                ? "Team order supplied by user · not independently verified"
                : label === "USER-PROVIDED RANK / UNVERIFIED"
                    ? "Rank supplied by user · not independently verified"
                : source
                ? `${escapeHtml(source.organization || source.season || source.lastCheckedDate || "")} ${escapeHtml(source.asOfDate || source.lastCheckedDate || "")}`
                : personalBest?.verificationStatus === "verified"
                    ? `Personal best verified${personalBest.lastCheckedDate ? ` · checked ${escapeHtml(personalBest.lastCheckedDate)}` : ""}`
                    : personalBest
                        ? "Owner-provided · not independently verified"
                        : "No verified result stored";
            return `
                <article class="athlete-card">
                    <div class="athlete-card-top">
                        <div class="athlete-avatar${photo ? "" : " athlete-avatar-placeholder"}">${photo ? `<img src="${escapeHtml(photo)}" alt="" loading="lazy">` : escapeHtml(athlete.name.split(" ").map((part) => part[0]).slice(0, 2).join(""))}</div>
                        <div><span class="athlete-position">${escapeHtml(label)}</span><h3>${escapeHtml(athlete.name)}${athlete.teamRole === "Captain" ? " · CAPTAIN" : ""}</h3><p class="athlete-country">${athleteIdentity} · ${escapeHtml(athlete.ageGroup || "age group not verified")}</p>${photoCreditMarkup(athlete)}</div>
                    </div>
                    <div class="athlete-meta">
                        <div><span>Event</span><strong>${escapeHtml(eventNames[activeEvent] || activeEvent)}</strong></div>
                        <div><span>Position</span><strong>${position}</strong></div>
                        <div><span>${personalBest ? `Personal best · ${personalBest.verificationStatus === "verified" ? "verified" : "unverified"}` : "Verified mark"}</span><strong>${escapeHtml(displayedMark || "Not provided")}</strong></div>
                        <div><span>Source / date</span><strong>${provenance}</strong></div>
                    </div>
                    <div class="athlete-card-foot"><span class="demo-label">${source ? "Source-linked" : "Seed / unverified"}</span>${sourceLink}<a class="text-link" href="athlete.html?id=${encodeURIComponent(athlete.id)}">View more ↗</a></div>
                </article>
            `;
        }).join("");
        renderUnrankedProfiles({ scope, age, gender, query, hide: type !== "profiles" });
        const empty = $("#ranking-empty");
        if (empty) {
            empty.hidden = records.length !== 0;
            if (type === "current-season") {
                empty.textContent = "No verified current-season ranking snapshots are loaded. Add an official source, ranking date, and verified athlete results before publishing this list.";
            } else if (type === "official") {
                empty.textContent = "No verified organization ranking snapshots are loaded. The seed list is not an official ranking.";
            } else if (type === "all-time") {
                empty.textContent = "No verified, source-linked all-time performances are loaded for this event.";
            } else {
                empty.textContent = "No athlete seed matches these filters. No official ranking is being shown.";
            }
        }
        const summary = $("#ranking-summary");
        if (summary) {
            const partialSnapshot = records.some((record) => record.source?.completeness === "partial");
            const profileDescription = type === "profiles" && activeEvent === "2.5-mile" && records.some((record) => Number.isInteger(record.athlete.teamRank))
                ? "user-provided team positions · unverified, not official rankings"
                : type === "profiles" || type === "historical" ? "unranked seed profiles" : "source-verified records only";
            summary.textContent = `${records.length} ${records.length === 1 ? "profile" : "profiles"} · ${eventNames[activeEvent] || activeEvent} · ${scope === "usa" ? "U.S. country labels" : "Worldwide"} · ${profileDescription}${partialSnapshot ? " · partial source snapshot, not a complete list" : ""}`;
        }
    }

    function renderUnrankedProfiles(filters) {
        const container = $("#unranked-athletes");
        const grid = $("#unranked-athlete-grid");
        if (!container || !grid) return;
        if (filters.hide) {
            container.hidden = true;
            return;
        }
        const profiles = athletes.filter((athlete) => {
            const hasNoEvent = !athlete.events?.length;
            return hasNoEvent
                && (filters.scope !== "usa" || athlete.country === "United States")
                && (filters.age === "all" || athlete.ageGroup === filters.age)
                && (filters.gender === "all" || athlete.gender === filters.gender)
                && (athlete.events?.includes(activeEvent) || athlete.events?.length === 0)
                && athlete.name.toLowerCase().includes(filters.query);
        });
        container.hidden = profiles.length === 0;
        grid.innerHTML = profiles.map((athlete) => `
            <article class="athlete-card">
                <div class="athlete-card-top">
                    <div class="athlete-avatar${photoFor(athlete) ? "" : " athlete-avatar-placeholder"}">${photoFor(athlete) ? `<img src="${escapeHtml(photoFor(athlete))}" alt="" loading="lazy">` : escapeHtml(athlete.name.split(" ").map((part) => part[0]).slice(0, 2).join(""))}</div>
                    <div><span class="athlete-position">PROFILE / UNRANKED</span><h3>${escapeHtml(athlete.name)}</h3><p class="athlete-country">${athlete.country ? `${escapeHtml(athlete.flag || "")} ${escapeHtml(athlete.country)}` : "Country not provided"}</p>${photoCreditMarkup(athlete)}</div>
                </div>
                <div class="athlete-meta">
                    <div><span>Event</span><strong>${athlete.primaryEvent ? escapeHtml(eventNames[athlete.primaryEvent] || athlete.primaryEvent) : "Not provided"}</strong></div>
                    <div><span>Personal best</span><strong>Not provided</strong></div>
                    <div><span>Season best</span><strong>Not provided</strong></div>
                    <div><span>Ranking</span><strong>Not ranked</strong></div>
                </div>
                <div class="athlete-card-foot"><span class="manual-label">Details needed</span><a class="text-link" href="athlete.html?id=${encodeURIComponent(athlete.id)}">View more ↗</a></div>
            </article>
        `).join("");
    }

    function initRankings() {
        if (!$("#athlete-grid")) return;
        ["#global-scope", "#age-filter", "#season-filter", "#gender-filter", "#sort-filter", "#athlete-search", "#ranking-type"].forEach((selector) => {
            $(selector)?.addEventListener("input", renderRankings);
            $(selector)?.addEventListener("change", renderRankings);
        });
        renderRankings();
        const hero = $(".hero-photo");
        const savedHero = getStoredValue(HERO_KEY);
        if (hero && savedHero) hero.src = savedHero;
    }

    function athleteOptions(select, preferredId) {
        if (!select) return;
        const previous = select.value;
        select.innerHTML = athletes.map((athlete) => `<option value="${escapeHtml(athlete.id)}">${escapeHtml(athlete.name)} · ${escapeHtml(athlete.country)}</option>`).join("");
        if (preferredId && athletes.some((athlete) => athlete.id === preferredId)) select.value = preferredId;
        else if (athletes.some((athlete) => athlete.id === previous)) select.value = previous;
    }

    function renderComparison() {
        const output = $("#comparison-result");
        const firstSelect = $("#compare-one");
        const secondSelect = $("#compare-two");
        const eventSelect = $("#compare-event");
        if (!output || !firstSelect || !secondSelect) return;
        const first = athletes.find((athlete) => athlete.id === firstSelect.value);
        const second = athletes.find((athlete) => athlete.id === secondSelect.value);
        const eventId = eventSelect?.value || activeEvent;
        const name = eventNames[eventId] || eventId;
        output.innerHTML = [first, second].map((athlete) => {
            if (!athlete) return "";
            const pb = athlete.personalBests?.[eventId]?.display || "No stored value";
            const sb = athlete.seasonBests?.[eventId]?.display || "No stored value";
            return `<article class="compare-athlete"><h3>${escapeHtml(athlete.name)}</h3><p>${escapeHtml(athlete.country)} · ${escapeHtml(athlete.ageGroup)}</p><div class="compare-mark"><span>${escapeHtml(name)} personal best</span><strong>${escapeHtml(pb)}</strong></div><div class="compare-mark"><span>Season best</span><strong>${escapeHtml(sb)}</strong></div><div class="compare-mark"><span>Latest result</span><span>${escapeHtml(athlete.latestResult || "Not recorded")}</span></div></article>`;
        }).join("");
    }

    function initComparison() {
        const first = $("#compare-one");
        const second = $("#compare-two");
        const eventSelect = $("#compare-event");
        if (!first || !second) return;
        const requested = new URLSearchParams(location.search).get("compare");
        athleteOptions(first, requested);
        athleteOptions(second, athletes.find((athlete) => athlete.id !== first.value)?.id);
        if (eventSelect) {
            eventSelect.innerHTML = Object.entries(eventNames).map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join("");
            eventSelect.value = activeEvent;
            eventSelect.addEventListener("change", renderComparison);
        }
        [first, second].forEach((select) => select.addEventListener("change", renderComparison));
        renderComparison();
    }

    function safeSourceUrl(source) {
        try {
            const parsed = new URL(source);
            return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
        } catch {
            return "";
        }
    }

    function renderProgression(points, fieldEvent) {
        if (!Array.isArray(points) || points.length < 2) {
            return "<p>No performance progression data has been added.</p>";
        }
        const values = points.map((point) => Number(point.mark)).filter(Number.isFinite);
        if (values.length < 2) return "<p>No valid progression data is available.</p>";
        const min = Math.min(...values);
        const max = Math.max(...values);
        const span = max - min || 1;
        const coordinates = points.map((point, index) => {
            const x = 70 + (660 * index) / Math.max(points.length - 1, 1);
            const progress = fieldEvent ? (Number(point.mark) - min) / span : (max - Number(point.mark)) / span;
            const y = 172 - progress * 112;
            return { x, y, year: point.year, mark: point.mark };
        });
        const path = coordinates.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
        return `<svg class="performance-chart" viewBox="0 0 800 220" role="img" aria-label="Illustrative performance progression chart">
            <title>Performance progression · demonstration data</title>
            <path class="chart-grid" d="M50 60H750 M50 115H750 M50 172H750 M50 35V180" fill="none"></path>
            <path class="chart-line" d="${path}"></path>
            ${coordinates.map((point) => `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="5"><title>${escapeHtml(point.year)}: ${escapeHtml(point.mark)}</title></circle><text x="${point.x}" y="202" text-anchor="middle" fill="#a5a79d" font-size="12">${escapeHtml(point.year)}</text>`).join("")}
        </svg><p class="source-note">The available progression values are illustrative/unverified. A verified chart requires sourced performance data.</p>`;
    }

    function renderProfile(athlete) {
        const main = $("#profile-content");
        if (!main) return;
        const photo = photoFor(athlete);
        const eventLabel = eventNames[athlete.primaryEvent] || athlete.primaryEvent || "Not recorded";
        const primarySb = athlete.seasonBests?.[athlete.primaryEvent]?.display || "Not provided";
        const source = safeSourceUrl(athlete.source);
        const crossCountrySeason = athlete.crossCountrySeason;
        const profileStats = crossCountrySeason
            ? [
                ...crossCountrySeason.records.map((record) => ({
                    label: `${eventNames[record.event] || record.event} / ${record.label}`,
                    value: record.mark
                })),
                ...(crossCountrySeason.teamPlace ? [{ label: "TEAM PLACE / LISTED", value: crossCountrySeason.teamPlace }] : []),
                ...(crossCountrySeason.grade ? [{ label: "GRADE / LISTED", value: crossCountrySeason.grade }] : [])
            ]
            : Object.entries(athlete.personalBests || {}).slice(0, 2).map(([event, mark]) => ({
                label: `${eventNames[event] || event} PERSONAL BEST`,
                value: mark.display
            }));
        while (profileStats.length < 2) profileStats.push({ label: "PERSONAL BEST", value: "Not provided" });
        const officialRankings = (database.rankingSnapshots || [])
            .filter((snapshot) => snapshot.rankingType === "official"
                && snapshot.verificationStatus === "verified"
                && Boolean(safeSourceUrl(snapshot.sourceUrl))
                && Boolean(snapshot.asOfDate)
                && Boolean(snapshot.verifiedAt))
            .flatMap((snapshot) => (snapshot.entries || [])
                .filter((entry) => entry.athleteId === athlete.id)
                .map((entry) => ({ event: snapshot.event, rank: entry.rank, date: snapshot.asOfDate })));
        const userProfileRank = athlete.userRanks?.[athlete.primaryEvent];
        const rankingValue = officialRankings.length
            ? officialRankings.map((ranking) => `#${ranking.rank} ${eventNames[ranking.event] || ranking.event}`).join(" · ")
            : Number.isInteger(userProfileRank) && userProfileRank > 0
                ? `#${userProfileRank} ${eventLabel} · user-provided / unverified`
                : "Not verified";
        const rankingLabel = officialRankings.length
            ? `WORLD ATHLETICS RANKING / ${officialRankings[0].date}`
            : Number.isInteger(userProfileRank) && userProfileRank > 0
                ? "USER-PROVIDED RANK / UNVERIFIED"
                : "RANKING";
        if (!crossCountrySeason) {
            profileStats.push(
                { label: "SEASON BEST", value: primarySb },
                { label: rankingLabel, value: rankingValue }
            );
        }
        const crossCountryListedInfo = crossCountrySeason?.teamPlace && crossCountrySeason?.grade
            ? "Team place and grade are"
            : crossCountrySeason?.teamPlace ? "Team place is"
                : crossCountrySeason?.grade ? "Grade is" : "Team information is";
        main.dataset.athleteId = athlete.id;
        const seasonSpotlight = crossCountrySeason ? `
            <section class="xc-season-card" aria-labelledby="xc-season-title">
                <div class="xc-season-heading">
                    <p class="eyebrow">ATHLETE SPOTLIGHT / ${escapeHtml(crossCountrySeason.season)} CROSS COUNTRY</p>
                    <h2 id="xc-season-title">THE SEASON<br><em>IN NUMBERS.</em></h2>
                    <p>${escapeHtml(crossCountrySeason.team)} · ${escapeHtml(crossCountrySeason.division)}</p>
                </div>
                <div class="xc-season-records">
                    ${crossCountrySeason.records.map((record) => {
                        const recordSource = safeSourceUrl(record.sourceUrl);
                        return `<article class="xc-season-record">
                            <span>${escapeHtml(eventNames[record.event] || record.event)} / ${escapeHtml(record.label)}</span>
                            <strong>${escapeHtml(record.mark)}</strong>
                            ${recordSource ? `<a href="${escapeHtml(recordSource)}" target="_blank" rel="noopener noreferrer">View source ↗</a>` : ""}
                        </article>`;
                    }).join("")}
                </div>
                <p class="xc-season-note">${crossCountryListedInfo} shown as listed on the supplied profile. Season marks are source-linked but have not been independently verified.</p>
            </section>
        ` : "";
        main.innerHTML = `
            <section class="profile-hero${crossCountrySeason ? " profile-hero--cross-country" : ""}" aria-labelledby="profile-name">
                <div class="profile-hero-image">${photo ? `<img src="${escapeHtml(photo)}" alt="Photo of ${escapeHtml(athlete.name)}">` : `<div class="athlete-avatar athlete-avatar-placeholder" role="img" aria-label="No photo provided for ${escapeHtml(athlete.name)}">${escapeHtml(athlete.name.split(" ").map((part) => part[0]).slice(0, 2).join(""))}<small>ATHLETE PHOTO NOT PROVIDED</small></div>`}</div>
                <div class="profile-hero-copy">
                    <p class="eyebrow">${escapeHtml(athlete.flag || "")} ${escapeHtml(athlete.country || crossCountrySeason?.team || "")} / ${escapeHtml(eventLabel)}</p>
                    <h1 id="profile-name">${escapeHtml(athlete.name.split(" ")[0])}<br><em>${escapeHtml(athlete.name.split(" ").slice(1).join(" "))}.</em></h1>
                    ${athlete.nickname ? `<p class="profile-nickname">AKA <strong>${escapeHtml(athlete.nickname)}</strong></p>` : ""}
                    ${athlete.profileTagline ? `<p class="profile-nickname"><strong>${escapeHtml(athlete.profileTagline)}</strong></p>` : ""}
                    ${athlete.teamRole === "Captain" ? `<p class="profile-nickname"><strong>TEAM CAPTAIN</strong></p>` : ""}
                    <p>${escapeHtml(athlete.bio || "No biography has been added.")}</p>
                    <span>${statusLabel(athlete)}</span>
                </div>
            </section>
            <div class="profile-data-strip${crossCountrySeason ? " profile-data-strip--cross-country" : ""}">
                ${profileStats.map((stat) => `<div><span>${escapeHtml(stat.label)}</span><strong>${escapeHtml(stat.value)}</strong></div>`).join("")}
            </div>
            ${seasonSpotlight}
            <section class="section">
                <div class="section-topline"><span>ATHLETE PROFILE</span><span>${escapeHtml(athlete.country)}</span></div>
                <div class="profile-tabs" role="tablist" aria-label="Athlete profile sections">
                    ${["Performance", "Career", "Race history", "Story", "Comparison"].map((tab, index) => `<button class="profile-tab" type="button" role="tab" aria-selected="${index === 0}" data-tab="${escapeHtml(tab.toLowerCase().replace(" ", "-"))}">${escapeHtml(tab.toUpperCase())}</button>`).join("")}
                </div>
                <div class="profile-panel" id="profile-panel" role="tabpanel"></div>
                <p class="source-note">${source ? `Source: <a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a>` : "No results source is recorded for this athlete."} ${athlete.verifiedDate ? `Last source review recorded: ${escapeHtml(athlete.verifiedDate)}.` : "No source verification date is recorded."} ${photoCreditMarkup(athlete)}</p>
            </section>
        `;
        const tabs = $$(".profile-tab", main);
        const panel = $("#profile-panel", main);
        const drawTab = (name) => {
            if (name === "performance") {
                const bests = Object.entries(athlete.personalBests || {});
                const allBestsVerified = bests.length > 0 && bests.every(([, mark]) =>
                    mark.verificationStatus === "verified" && Boolean(safeSourceUrl(mark.sourceUrl)) && Boolean(mark.lastCheckedDate));
                const seasonBestSource = safeSourceUrl(athlete.seasonBests?.[athlete.primaryEvent]?.sourceUrl);
                const personalBestNote = allBestsVerified
                    ? `Personal bests are linked to a source and were last checked ${escapeHtml(athlete.verifiedDate || "on the date shown in the source note")}.`
                    : "Personal best marks were entered from user-provided data and have not been independently verified.";
                const personalBestChart = bests.length
                    ? crossCountrySeason
                        ? `<p class="source-note">${personalBestNote} ${source ? `Profile and season details: <a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">Athletic.net athlete profile ↗</a>.` : ""}</p>`
                        : `<div class="pb-chart" role="img" aria-label="Personal best marks for ${escapeHtml(athlete.name)}">${bests.map(([event, mark]) => `<div class="pb-chart-row"><span>${escapeHtml(eventNames[event] || event)}${mark.verificationStatus === "verified" ? " · verified" : " · unverified"}</span><div class="pb-chart-track"><i style="--bar-width:${Math.max(14, Math.min(100, (mark.score / (event === "100m" ? 11 : 25)) * 100))}%"></i></div><strong>${escapeHtml(mark.display)}</strong></div>`).join("")}</div><p class="source-note">${personalBestNote} ${athlete.progression?.length ? "" : "No dated progression series have been provided."}${seasonBestSource ? ` Season best source: <a href="${escapeHtml(seasonBestSource)}" target="_blank" rel="noopener noreferrer">World Athletics 2026 outdoor list</a> (performance dated ${escapeHtml(athlete.seasonBests[athlete.primaryEvent].date)}; checked ${escapeHtml(athlete.seasonBests[athlete.primaryEvent].lastCheckedDate)}).` : " Season bests are not provided."}</p>`
                    : "<p>No personal bests have been provided.</p>";
                const seasonRecords = crossCountrySeason
                    ? `<div class="xc-season-records xc-season-records--panel">${crossCountrySeason.records.map((record) => {
                        const recordSource = safeSourceUrl(record.sourceUrl);
                        return `<article class="xc-season-record"><span>${escapeHtml(eventNames[record.event] || record.event)} / ${escapeHtml(record.label)}</span><strong>${escapeHtml(record.mark)}</strong>${recordSource ? `<a href="${escapeHtml(recordSource)}" target="_blank" rel="noopener noreferrer">View source ↗</a>` : ""}</article>`;
                    }).join("")}</div>`
                    : "";
                panel.innerHTML = `<h2>Performance / personal bests</h2><p>Personal best marks are shown separately from season statistics.</p><div class="profile-data-strip">${bests.length ? bests.map(([event, mark]) => `<div><span>${escapeHtml(eventNames[event] || event)} PB · ${mark.verificationStatus === "verified" ? "verified" : "unverified"}</span><strong>${escapeHtml(mark.display)}</strong></div>`).join("") : "<p>No personal bests recorded.</p>"}</div>${seasonRecords}${personalBestChart}${renderProgression(athlete.progression, fieldEvents.has(athlete.primaryEvent))}`;
            } else if (name === "career") {
                const timeline = athlete.timeline?.length
                    ? `<ol class="career-timeline">${athlete.timeline.map((item) => `<li><strong>${escapeHtml(item.year)} / ${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></li>`).join("")}</ol>`
                    : `<ul>${(athlete.achievements || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>No career milestones have been provided.</li>"}</ul>`;
                panel.innerHTML = `<h2>Career / highlights</h2>${timeline}${athlete.profileStatus ? `<p>${escapeHtml(athlete.profileStatus)}</p>` : ""}<p>Achievements were provided for this demo profile and have not yet been independently verified.</p>`;
            } else if (name === "story") {
                panel.innerHTML = `<h2>Story / athlete notes</h2><p>${escapeHtml(athlete.bio || "No biography has been added.")}</p>${athlete.storyQuote ? `<blockquote class="athlete-story-quote"><p>“${escapeHtml(athlete.storyQuote)}”</p><cite>— ${escapeHtml(athlete.name)}</cite></blockquote>` : ""}${athlete.profileHook ? `<h3>PROFILE FOCUS</h3><p>${escapeHtml(athlete.profileHook)}</p>` : ""}<p>Profile notes are supplied for this demo and have not been independently verified.</p>`;
            } else if (name === "race-history") {
                const results = athlete.results || [];
                const seasonMeets = crossCountrySeason?.meets || [];
                panel.innerHTML = `<h2>Race history / results</h2>${seasonMeets.length ? `<div class="xc-meet-list">${seasonMeets.map((meet) => `<article class="xc-meet">
                    <span>${escapeHtml(meet.date)}</span>
                    <div><strong>${escapeHtml(meet.name)}</strong><small>${escapeHtml(meet.distance)}${meet.mark ? ` · ${escapeHtml(meet.mark)}` : ""}</small></div>
                </article>`).join("")}</div><p class="source-note">${source ? `<a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">View Athletic.net profile and meet history ↗</a>.` : ""} The meet list was transcribed from the supplied profile and has not been independently verified.</p>` : ""}${results.length ? `<div class="race-list">${results.map((result) => {
                    const resultSource = safeSourceUrl(result.source);
                    return `<article class="compare-mark"><span>${escapeHtml(result.date)} · ${escapeHtml(result.competition)} · ${escapeHtml(eventNames[result.event] || result.event)}${result.wind ? ` · wind ${escapeHtml(result.wind)}` : ""}</span><strong>${escapeHtml(result.mark)}</strong>${resultSource ? `<a href="${escapeHtml(resultSource)}" target="_blank" rel="noopener noreferrer">Source ↗</a>` : `<span>${escapeHtml(result.status || "unverified")}</span>`}</article>`;
                }).join("")}</div>` : seasonMeets.length ? "" : "<p>No results have been added.</p>"}<p>Indoor/outdoor status, source links, and verification state should be recorded with each result.</p>`;
            } else {
                panel.innerHTML = `<h2>Compare / stored results</h2><p>Compare ${escapeHtml(athlete.name)} with another athlete using recorded personal bests and season statistics.</p><a class="button button-outline" href="index.html?compare=${encodeURIComponent(athlete.id)}#compare">Open comparison tool ↗</a><p>Head-to-head results are not available in the demonstration data.</p>`;
            }
        };
        drawTab("performance");
        tabs.forEach((tab) => tab.addEventListener("click", () => {
            tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
            drawTab(tab.dataset.tab);
        }));
    }

    function initProfile() {
        if (!$("#profile-content")) return;
        const requestedId = new URLSearchParams(location.search).get("id");
        const athlete = athletes.find((entry) => entry.id === requestedId);
        if (athlete) {
            renderProfile(athlete);
        } else {
            $("#profile-content").innerHTML = `<section class="section"><p class="eyebrow">ATHLETE / NOT FOUND</p><h1 class="admin-content">NO PROFILE<br><em>AVAILABLE.</em></h1><p>This athlete is not in the current local demo data. The record may have been removed from this browser.</p><a class="button button-lime" href="index.html#rankings">Return to rankings</a></section>`;
        }
    }

    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error("Choose an image file."));
                return;
            }
            if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                reject(new Error("Use a JPG, PNG, or WebP image."));
                return;
            }
            if (file.size > PHOTO_LIMIT) {
                reject(new Error("Image must be 1 MB or smaller."));
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") resolve(reader.result);
                else reject(new Error("The browser could not read this image."));
            }, { once: true });
            reader.addEventListener("error", () => reject(new Error("The browser could not read this image.")), { once: true });
            reader.readAsDataURL(file);
        });
    }

    function initAdmin() {
        const form = $("#athlete-form");
        const list = $("#admin-athlete-list");
        if (!form || !list) {
            initRankingAdminForm();
            return;
        }
        const eventSelect = $('select[name="event"]', form);
        eventSelect.innerHTML = Object.entries(eventNames).map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join("");
        const fileInput = $('input[name="photo"]', form);
        const preview = $("#athlete-preview");
        let selectedPhoto = "";
        const message = (text, error = false) => {
            const output = $("#admin-message");
            output.textContent = text;
            output.style.color = error ? "#ffb8a5" : "";
        };

        const resetForm = () => {
            form.reset();
            $('input[name="id"]', form).value = "";
            selectedPhoto = "";
            preview.hidden = false;
            preview.src = DEFAULT_HERO_PHOTO;
            $("#athlete-form-title").textContent = "Add athlete";
            message("");
        };

        const renderList = () => {
            list.innerHTML = athletes.map((athlete) => `
                <article class="admin-athlete-row">
                    <div><strong>${escapeHtml(athlete.name)}</strong><small>${escapeHtml(athlete.country)} · ${escapeHtml(eventNames[athlete.primaryEvent] || athlete.primaryEvent || "No event")} · ${escapeHtml(athlete.verification || "unverified")}</small></div>
                    <div class="admin-actions"><button type="button" data-edit="${escapeHtml(athlete.id)}">Edit</button><button type="button" class="delete-button" data-delete="${escapeHtml(athlete.id)}">Delete</button></div>
                </article>
            `).join("");
        };
        renderList();

        fileInput.addEventListener("change", async () => {
            try {
                selectedPhoto = await fileToDataUrl(fileInput.files[0]);
                preview.src = selectedPhoto;
                preview.hidden = false;
                message("Photo ready. It will be stored in this browser only.");
            } catch (error) {
                selectedPhoto = "";
                preview.hidden = true;
                message(error.message, true);
                fileInput.value = "";
            }
        });

        $("#clear-form").addEventListener("click", resetForm);
        list.addEventListener("click", (event) => {
            const editButton = event.target.closest("[data-edit]");
            const deleteButton = event.target.closest("[data-delete]");
            if (editButton) {
                const athlete = athletes.find((entry) => entry.id === editButton.dataset.edit);
                if (!athlete) return;
                $('input[name="id"]', form).value = athlete.id;
                $('input[name="name"]', form).value = athlete.name;
                $('input[name="country"]', form).value = athlete.country;
                $('select[name="gender"]', form).value = athlete.gender || "men";
                $('select[name="ageGroup"]', form).value = athlete.ageGroup || "Senior";
                eventSelect.value = athlete.primaryEvent || "100m";
                $('input[name="pb"]', form).value = athlete.personalBests?.[athlete.primaryEvent]?.display || "";
                $('input[name="sb"]', form).value = athlete.seasonBests?.[athlete.primaryEvent]?.display || "";
                const latest = athlete.results?.[0] || {};
                $('input[name="competition"]', form).value = latest.competition || "";
                $('input[name="resultDate"]', form).value = latest.date || "";
                $('input[name="resultMark"]', form).value = latest.mark || "";
                $('select[name="resultSeason"]', form).value = latest.season || "outdoor";
                $('input[name="wind"]', form).value = latest.wind || "";
                $('select[name="verification"]', form).value = athlete.verification === "verified" ? "verified" : "manual";
                $('textarea[name="bio"]', form).value = athlete.bio || "";
                $('textarea[name="achievements"]', form).value = (athlete.achievements || []).join("\n");
                $('input[name="source"]', form).value = athlete.source || "";
                $('input[name="verifiedDate"]', form).value = athlete.verifiedDate || "";
                selectedPhoto = athlete.photo || "";
                if (selectedPhoto) {
                    preview.src = selectedPhoto;
                    preview.hidden = false;
                } else {
                    preview.hidden = true;
                }
                $("#athlete-form-title").textContent = `Edit ${athlete.name}`;
                message("Edit the record and save to update it.");
                form.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            if (deleteButton) {
                const athlete = athletes.find((entry) => entry.id === deleteButton.dataset.delete);
                if (!athlete || !window.confirm(`Delete ${athlete.name} from this browser's demo data?`)) return;
                const nextAthletes = athletes.filter((entry) => entry.id !== athlete.id);
                if (!saveAthletes(nextAthletes)) {
                    message("Could not save changes. Browser storage may be full or disabled.", true);
                    return;
                }
                renderList();
                message(`${athlete.name} was removed from this browser's demo data.`);
            }
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const id = String(formData.get("id") || "");
            const existing = athletes.find((athlete) => athlete.id === id);
            const name = String(formData.get("name") || "").trim();
            const country = String(formData.get("country") || "").trim();
            const primaryEvent = String(formData.get("event") || "");
            const pbDisplay = String(formData.get("pb") || "").trim();
            const sbDisplay = String(formData.get("sb") || "").trim();
            const source = String(formData.get("source") || "").trim();
            const verifiedDate = String(formData.get("verifiedDate") || "");
            const requestedVerification = String(formData.get("verification") || "manual");
            if (!name || !country || !pbDisplay || !primaryEvent) {
                message("Name, country, event, and personal best are required.", true);
                return;
            }
            let photo = selectedPhoto || existing?.photo || "";
            try {
                if (fileInput.files[0]) photo = await fileToDataUrl(fileInput.files[0]);
            } catch (error) {
                message(error.message, true);
                return;
            }
            if (source && !safeSourceUrl(source)) {
                message("Enter a valid HTTP or HTTPS source link.", true);
                return;
            }
            if (requestedVerification === "verified" && (!source || !verifiedDate)) {
                message("A source link and last-verified date are required for source-reviewed status.", true);
                return;
            }
            const verification = requestedVerification === "verified" ? "verified" : "manual";
            const oldBests = existing?.personalBests || {};
            const oldSeasonBests = existing?.seasonBests || {};
            const markScore = parseMarkScore(pbDisplay);
            if (markScore === null) {
                message("Enter a numeric mark, or a time in minutes:seconds format.", true);
                return;
            }
            const personalBests = { ...oldBests, [primaryEvent]: { display: pbDisplay, score: markScore } };
            const seasonBests = { ...oldSeasonBests };
            if (sbDisplay) {
                const seasonScore = parseMarkScore(sbDisplay);
                if (seasonScore === null) {
                    message("Enter a numeric season best, or a time in minutes:seconds format.", true);
                    return;
                }
                seasonBests[primaryEvent] = { display: sbDisplay, score: seasonScore };
            }
            const competition = String(formData.get("competition") || "").trim();
            const resultDate = String(formData.get("resultDate") || "");
            const resultMark = String(formData.get("resultMark") || "").trim();
            const resultSeason = String(formData.get("resultSeason") || "outdoor");
            const wind = String(formData.get("wind") || "").trim();
            if (Boolean(competition) !== Boolean(resultMark)) {
                message("Add both a competition name and result mark, or leave both blank.", true);
                return;
            }
            if (resultMark && parseMarkScore(resultMark) === null) {
                message("Enter a numeric result mark, or a time in minutes:seconds format.", true);
                return;
            }
            const latestResult = competition && resultMark
                ? `${competition}${resultDate ? ` · ${resultDate}` : ""} · ${resultMark}`
                : existing?.latestResult || "Not recorded";
            const results = [...(existing?.results || [])];
            if (competition && resultMark) {
                results.unshift({
                    date: resultDate || "Date not recorded",
                    competition,
                    event: primaryEvent,
                    mark: resultMark,
                    wind,
                    season: resultSeason,
                    place: "",
                    source,
                    status: verification
                });
            }
            const seasons = [...new Set([...(existing?.seasons || []), resultSeason])];
            const nextAthlete = {
                ...existing,
                id: id || `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name,
                country,
                flag: country === "United States" ? "🇺🇸" : "",
                gender: String(formData.get("gender")),
                ageGroup: String(formData.get("ageGroup")),
                primaryEvent,
                events: [...new Set([...(existing?.events || []), primaryEvent])],
                seasons,
                personalBests,
                seasonBests,
                latestResult,
                results,
                bio: String(formData.get("bio") || "").trim(),
                achievements: String(formData.get("achievements") || "").split(/\r?\n/).map((value) => value.trim()).filter(Boolean),
                source,
                verifiedDate,
                verification,
                demo: false,
                photo,
                photoCredit: fileInput.files[0] ? null : existing?.photoCredit || null
            };
            const nextAthletes = existing
                ? athletes.map((athlete) => athlete.id === existing.id ? nextAthlete : athlete)
                : [...athletes, nextAthlete];
            if (!saveAthletes(nextAthletes)) {
                message("Could not save the record. Browser storage may be full or disabled.", true);
                return;
            }
            renderList();
            resetForm();
            message("Record saved in this browser. Published use still requires review and a secured backend.");
        });

        initHeroUpload();
        initRankingAdminForm();
    }

    function initRankingAdminForm() {
        const form = $("#ranking-form");
        if (!form) return;
        const eventSelect = $('select[name="event"]', form);
        const athleteSelect = $('select[name="athleteId"]', form);
        const message = $("#ranking-message");
        const report = (text, error = false) => {
            message.textContent = text;
            message.style.color = error ? "#ffb8a5" : "";
        };
        eventSelect.innerHTML = Object.entries(eventNames)
            .map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`)
            .join("");
        const refreshAthletes = () => {
            const previous = athleteSelect.value;
            athleteSelect.innerHTML = athletes
                .map((athlete) => `<option value="${escapeHtml(athlete.id)}">${escapeHtml(athlete.name)} · ${escapeHtml(athlete.country || "country not set")}</option>`)
                .join("");
            if (athletes.some((athlete) => athlete.id === previous)) athleteSelect.value = previous;
        };
        refreshAthletes();
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const sourceUrl = safeSourceUrl(String(formData.get("sourceUrl") || "").trim());
            const athleteId = String(formData.get("athleteId") || "");
            const athlete = athletes.find((entry) => entry.id === athleteId);
            const eventId = String(formData.get("event") || "");
            const gender = String(formData.get("gender") || "");
            const ageGroup = String(formData.get("ageGroup") || "");
            const countryScope = String(formData.get("countryScope") || "world");
            const seasonFormat = String(formData.get("seasonFormat") || "");
            const season = String(formData.get("season") || "").trim();
            const organization = String(formData.get("organization") || "").trim();
            const asOfDate = String(formData.get("asOfDate") || "");
            const checkedDate = String(formData.get("lastCheckedDate") || "");
            const rank = Number(formData.get("rank"));
            const mark = String(formData.get("mark") || "").trim();
            const performanceDate = String(formData.get("performanceDate") || "");
            const competitionName = String(formData.get("competition") || "").trim();
            const wind = String(formData.get("wind") || "").trim();

            if (!athlete || !sourceUrl || !organization || !season || !asOfDate || !checkedDate
                || !Number.isInteger(rank) || rank < 1 || !formData.get("sourceChecked")) {
                report("Provide an athlete, official source, list name, season, ranking date, last-checked date, valid position, and confirm the source check.", true);
                return;
            }
            if (countryScope === "usa" && athlete.country !== "United States") {
                report("A U.S. list entry requires an athlete record with a United States country label. Verify the athlete details first.", true);
                return;
            }
            if (mark && parseMarkScore(mark) === null) {
                report("Enter a numeric performance mark or a time in minutes:seconds format.", true);
                return;
            }

            const rankingType = String(formData.get("rankingType") || "current-season");
            const previousPerformances = database.performances;
            const previousCompetitions = database.competitions;
            const previousSnapshots = database.rankingSnapshots;
            database.performances = [...(database.performances || [])];
            database.competitions = [...(database.competitions || [])];
            database.rankingSnapshots = (database.rankingSnapshots || []).map((item) => ({ ...item, entries: [...(item.entries || [])] }));
            let performanceId = "";
            if (mark) {
                performanceId = `performance-${athleteId}-${eventId}-${performanceDate || asOfDate}-${Date.now()}`;
                const competitionId = competitionName
                    ? `competition-${competitionName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${performanceDate || asOfDate}`
                    : "";
                if (competitionName && !database.competitions.some((item) => item.id === competitionId)) {
                    database.competitions.push({
                        id: competitionId,
                        name: competitionName,
                        date: performanceDate || asOfDate,
                        seasonFormat,
                        sourceUrl
                    });
                }
                database.performances.push({
                    id: performanceId,
                    athleteId,
                    event: eventId,
                    mark,
                    numericMark: parseMarkScore(mark),
                    competitionId,
                    competition: competitionName,
                    competitionDate: performanceDate || "",
                    seasonFormat,
                    wind,
                    sourceUrl,
                    verificationStatus: "verified",
                    lastCheckedDate: checkedDate,
                    listType: "season"
                });
            }

            const snapshotKey = [rankingType, eventId, gender, ageGroup, countryScope, seasonFormat, season, organization, asOfDate].join("|");
            let snapshot = database.rankingSnapshots.find((item) => item.storageKey === snapshotKey);
            if (!snapshot) {
                snapshot = {
                    id: `ranking-${Date.now()}`,
                    storageKey: snapshotKey,
                    rankingType,
                    event: eventId,
                    gender,
                    ageGroup,
                    countryScope,
                    seasonFormat,
                    season,
                    organization,
                    sourceUrl,
                    asOfDate,
                    verifiedAt: checkedDate,
                    verificationStatus: "verified",
                    entries: []
                };
                database.rankingSnapshots.push(snapshot);
            } else {
                snapshot.sourceUrl = sourceUrl;
                snapshot.verifiedAt = checkedDate;
                snapshot.verificationStatus = "verified";
            }
            snapshot.verifiedAt = checkedDate;
            snapshot.entries = snapshot.entries.filter((entry) => entry.athleteId !== athleteId);
            snapshot.entries.push({ athleteId, rank, mark, performanceId });
            snapshot.entries.sort((left, right) => left.rank - right.rank);

            if (!saveRankingDatabase()) {
                database.performances = previousPerformances;
                database.competitions = previousCompetitions;
                database.rankingSnapshots = previousSnapshots;
                report("Could not save this ranking entry. Browser storage may be full or disabled.", true);
                return;
            }
            report("Entry saved locally with the source and check date. Rankings are still only stored in this browser.");
            form.reset();
            refreshAthletes();
        });
    }

    function initBulkPhotoTools() {
        const exportButton = $("#export-photo-catalog");
        const manifestInput = $("#photo-manifest-file");
        const output = $("#bulk-photo-message");
        if (!exportButton || !manifestInput || !output) return;

        const report = (text, error = false) => {
            output.textContent = text;
            output.style.color = error ? "#ffb8a5" : "";
        };
        const safeFileId = (id) => id.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");

        exportButton.addEventListener("click", () => {
            const uniqueAthletes = new Map();
            athletes.forEach((athlete) => {
                if (!uniqueAthletes.has(athlete.id)) {
                    uniqueAthletes.set(athlete.id, {
                        id: athlete.id,
                        name: athlete.name,
                        events: [...new Set(athlete.events || [])],
                        hasPhoto: Boolean(photoFor(athlete)),
                        photoCredit: athlete.photoCredit || null
                    });
                }
            });
            const catalog = {
                schemaVersion: 1,
                generatedAt: new Date().toISOString(),
                athletes: [...uniqueAthletes.values()]
            };
            const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: "application/json" });
            const link = document.createElement("a");
            const downloadUrl = URL.createObjectURL(blob);
            link.href = downloadUrl;
            link.download = "athlete-photo-catalog.json";
            link.click();
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
            report(`Exported ${catalog.athletes.length} unique athlete records. No athlete or event data was changed.`);
        });

        manifestInput.addEventListener("change", async () => {
            const file = manifestInput.files?.[0];
            if (!file) return;
            try {
                const manifest = JSON.parse(await file.text());
                if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.photos)) {
                    throw new Error("The photo manifest must have schemaVersion 1 and a photos list.");
                }
                const manifestById = new Map();
                manifest.photos.forEach((record) => {
                    if (!record || typeof record.id !== "string" || manifestById.has(record.id)) {
                        throw new Error("The manifest contains an invalid or duplicate athlete ID.");
                    }
                    manifestById.set(record.id, record);
                });
                const nextAthletes = athletes.map((athlete) => {
                    const record = manifestById.get(athlete.id);
                    if (!record || record.status !== "downloaded" || athlete.photo) return athlete;
                    const expectedPath = `images/athletes/${safeFileId(athlete.id)}.jpg`;
                    if (record.photoPath !== expectedPath) {
                        throw new Error(`Unexpected photo path for ${athlete.name}.`);
                    }
                    const credit = record.photoCredit;
                    const sourceUrl = safeSourceUrl(credit?.sourceUrl);
                    const licenseUrl = safeSourceUrl(credit?.licenseUrl);
                    const license = String(credit?.license || "");
                    const reusableLicense = /^(CC0|Public domain|CC BY(?:\s|$)|CC BY-SA(?:\s|$))/i.test(license);
                    if (!sourceUrl || new URL(sourceUrl).hostname !== "commons.wikimedia.org"
                        || !licenseUrl || !["creativecommons.org", "commons.wikimedia.org"].includes(new URL(licenseUrl).hostname)
                        || !reusableLicense || !String(credit?.artist || "").trim()) {
                        throw new Error(`Missing or unsupported license attribution for ${athlete.name}.`);
                    }
                    return {
                        ...athlete,
                        photo: record.photoPath,
                        photoCredit: {
                            artist: String(credit.artist).trim(),
                            license,
                            licenseUrl,
                            sourceUrl,
                            attribution: String(credit.attribution || "").trim()
                        }
                    };
                });
                const imported = nextAthletes.filter((athlete, index) => athlete !== athletes[index]).length;
                if (!imported) {
                    report("No eligible photos to import. Existing photos are kept; confirm that the manifest has downloaded matches.");
                    return;
                }
                if (!saveAthletes(nextAthletes)) {
                    throw new Error("Could not save photo links. Browser storage may be full or disabled.");
                }
                report(`Connected ${imported} approved photo${imported === 1 ? "" : "s"} to athlete profiles. Review the generated photo report for missing or uncertain matches.`);
            } catch (error) {
                console.error("Could not import athlete photo manifest:", error);
                report(error.message || "Could not import the photo manifest.", true);
            } finally {
                manifestInput.value = "";
            }
        });
    }

    function initHeroUpload() {
        const form = $("#hero-form");
        if (!form) return;
        const input = $("#hero-file");
        const preview = $("#hero-preview");
        let selectedImage = "";
        const message = (text, error = false) => {
            const output = $("#hero-message");
            output.textContent = text;
            output.style.color = error ? "#ffb8a5" : "";
        };
        const current = getStoredValue(HERO_KEY);
        if (current) {
            preview.src = current;
            preview.hidden = false;
        }
        input.addEventListener("change", async () => {
            try {
                selectedImage = await fileToDataUrl(input.files[0]);
                preview.src = selectedImage;
                preview.hidden = false;
                message("Image ready to save in this browser.");
            } catch (error) {
                selectedImage = "";
                preview.hidden = true;
                message(error.message, true);
                input.value = "";
            }
        });
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!selectedImage) {
                message("Choose a supported image before saving.", true);
                return;
            }
            try {
                localStorage.setItem(HERO_KEY, selectedImage);
                message("Homepage photo saved in this browser.");
            } catch (error) {
                console.error("Could not save the homepage photo:", error);
                message("Could not save the photo. The browser's storage may be full.", true);
            }
        });
        $("#reset-hero").addEventListener("click", () => {
            try {
                localStorage.removeItem(HERO_KEY);
                selectedImage = "";
                input.value = "";
                preview.hidden = true;
                preview.removeAttribute("src");
                message("The default project photo will be used.");
            } catch (error) {
                console.error("Could not remove the homepage photo:", error);
                message("Could not restore the default image.", true);
            }
        });
    }

    athletes = loadAthletes();
    initMobileNavigation();
    initKeyboardShortcuts();
    initReveal();
    initEventExplorer();
    initRankings();
    initComparison();
    initProfile();
    initAdmin();
    initBulkPhotoTools();
})();
