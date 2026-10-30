(() => {
    "use strict";

    const seedGroups = [
        ["100m", "men", ["Oblique Seville", "Noah Lyles", "Usain Bolt", "Kishane Thompson", "Fred Kerley", "Christian Coleman", "Kayinsola Ajayi"]],
        ["200m", "men", ["Noah Lyles", "Letsile Tebogo", "Erriyon Knighton", "Kenneth Bednarek", "Usain Bolt"]],
        ["400m", "men", ["Wayde van Niekerk", "Steven Gardiner", "Kirani James", "Quincy Hall", "Michael Johnson"]],
        ["100m", "women", ["Sha'Carri Richardson", "Julien Alfred", "Shelly-Ann Fraser-Pryce", "Elaine Thompson-Herah", "Melissa Jefferson-Wooden"]],
        ["200m", "women", ["Gabby Thomas", "Julien Alfred", "Shericka Jackson", "Sha'Carri Richardson", "Elaine Thompson-Herah"]],
        ["400m", "women", ["Sydney McLaughlin-Levrone", "Marileidy Paulino", "Salwa Eid Naser", "Sanya Richards-Ross", "Allyson Felix"]],
        ["800m", "men", ["David Rudisha", "Emmanuel Wanyonyi", "Marco Arop"]],
        ["1500m", "men", ["Jakob Ingebrigtsen", "Josh Kerr", "Cole Hocker"]],
        ["mile", "men", ["Jakob Ingebrigtsen", "Josh Kerr", "Hicham El Guerrouj"]],
        ["800m", "women", ["Keely Hodgkinson", "Mary Moraa", "Athing Mu"]],
        ["1500m", "women", ["Faith Kipyegon", "Jessica Hull", "Laura Muir"]],
        ["mile", "women", ["Faith Kipyegon", "Laura Muir", "Sifan Hassan"]],
        ["3000m", "men", ["Jakob Ingebrigtsen", "Grant Fisher", "Cole Hocker"]],
        ["5000m", "men", ["Joshua Cheptegei", "Jakob Ingebrigtsen", "Grant Fisher"]],
        ["10000m", "men", ["Joshua Cheptegei", "Berihu Aregawi", "Grant Fisher"]],
        ["3000m", "women", ["Faith Kipyegon", "Beatrice Chebet", "Jessica Hull"]],
        ["5000m", "women", ["Beatrice Chebet", "Faith Kipyegon", "Gudaf Tsegay"]],
        ["10000m", "women", ["Beatrice Chebet", "Gudaf Tsegay", "Letesenbet Gidey"]],
        ["110mh", "men", ["Grant Holloway", "Hansle Parchment", "Daniel Roberts"]],
        ["400mh", "men", ["Karsten Warholm", "Rai Benjamin", "Alison dos Santos"]],
        ["100mh", "women", ["Masai Russell", "Jasmine Camacho-Quinn", "Tobi Amusan"]],
        ["400mh", "women", ["Sydney McLaughlin-Levrone", "Femke Bol", "Dalilah Muhammad"]],
        ["long-jump", "men", ["Miltiadis Tentoglou", "Mattia Furlani", "Carl Lewis"]],
        ["triple-jump", "men", ["Jordan Díaz", "Pedro Pichardo", "Christian Taylor"]],
        ["high-jump", "men", ["Mutaz Barshim", "Gianmarco Tamberi", "Hamish Kerr"]],
        ["pole-vault", "men", ["Armand Duplantis", "Sam Kendricks", "Renaud Lavillenie"]],
        ["long-jump", "women", ["Tara Davis-Woodhall", "Malaika Mihambo", "Ivana Španović"]],
        ["triple-jump", "women", ["Yulimar Rojas", "Thea LaFond", "Leyanis Pérez"]],
        ["high-jump", "women", ["Yaroslava Mahuchikh", "Nicola Olyslagers", "Eleanor Patterson"]],
        ["pole-vault", "women", ["Katie Moon", "Nina Kennedy", "Sandi Morris"]],
        ["shot-put", "men", ["Ryan Crouser", "Joe Kovacs", "Leonardo Fabbri"]],
        ["discus", "men", ["Mykolas Alekna", "Daniel Ståhl", "Kristjan Čeh"]],
        ["hammer", "men", ["Ethan Katzberg", "Wojciech Nowicki", "Paweł Fajdek"]],
        ["javelin", "men", ["Neeraj Chopra", "Arshad Nadeem", "Anderson Peters"]],
        ["shot-put", "women", ["Yemisi Ogunleye", "Chase Jackson", "Jessica Schilder"]],
        ["discus", "women", ["Valarie Allman", "Feng Bin", "Sandra Elkasević"]],
        ["hammer", "women", ["Camryn Rogers", "Brooke Andersen", "DeAnna Price"]],
        ["javelin", "women", ["Haruka Kitaguchi", "Adriana Vilagoš", "Jo-Ane van Dyk"]],
        ["decathlon", "men", ["Kevin Mayer", "Markus Rooth", "Damian Warner"]],
        ["heptathlon", "women", ["Nafissatou Thiam", "Anna Hall", "Katarina Johnson-Thompson"]]
    ];

    const countries = {
        "Noah Lyles": ["United States", "🇺🇸"], "Usain Bolt": ["Jamaica", "🇯🇲"],
        "Oblique Seville": ["Jamaica", "🇯🇲"], "Kayinsola Ajayi": ["Nigeria", "🇳🇬"],
        "Kishane Thompson": ["Jamaica", "🇯🇲"], "Fred Kerley": ["United States", "🇺🇸"],
        "Christian Coleman": ["United States", "🇺🇸"], "Letsile Tebogo": ["Botswana", "🇧🇼"],
        "Erriyon Knighton": ["United States", "🇺🇸"], "Kenneth Bednarek": ["United States", "🇺🇸"],
        "Wayde van Niekerk": ["South Africa", "🇿🇦"], "Steven Gardiner": ["Bahamas", "🇧🇸"],
        "Kirani James": ["Grenada", "🇬🇩"], "Quincy Hall": ["United States", "🇺🇸"],
        "Michael Johnson": ["United States", "🇺🇸"], "Sha'Carri Richardson": ["United States", "🇺🇸"],
        "Julien Alfred": ["Saint Lucia", "🇱🇨"], "Shelly-Ann Fraser-Pryce": ["Jamaica", "🇯🇲"],
        "Elaine Thompson-Herah": ["Jamaica", "🇯🇲"], "Melissa Jefferson-Wooden": ["United States", "🇺🇸"],
        "Gabby Thomas": ["United States", "🇺🇸"], "Shericka Jackson": ["Jamaica", "🇯🇲"],
        "Sydney McLaughlin-Levrone": ["United States", "🇺🇸"], "Marileidy Paulino": ["Dominican Republic", "🇩🇴"],
        "Salwa Eid Naser": ["Bahrain", "🇧🇭"], "Sanya Richards-Ross": ["United States", "🇺🇸"],
        "Allyson Felix": ["United States", "🇺🇸"], "David Rudisha": ["Kenya", "🇰🇪"],
        "Emmanuel Wanyonyi": ["Kenya", "🇰🇪"], "Marco Arop": ["Canada", "🇨🇦"],
        "Jakob Ingebrigtsen": ["Norway", "🇳🇴"], "Josh Kerr": ["Great Britain", "🇬🇧"],
        "Cole Hocker": ["United States", "🇺🇸"], "Hicham El Guerrouj": ["Morocco", "🇲🇦"],
        "Keely Hodgkinson": ["Great Britain", "🇬🇧"], "Mary Moraa": ["Kenya", "🇰🇪"],
        "Athing Mu": ["United States", "🇺🇸"], "Faith Kipyegon": ["Kenya", "🇰🇪"],
        "Jessica Hull": ["Australia", "🇦🇺"], "Laura Muir": ["Great Britain", "🇬🇧"],
        "Sifan Hassan": ["Netherlands", "🇳🇱"], "Grant Fisher": ["United States", "🇺🇸"],
        "Joshua Cheptegei": ["Uganda", "🇺🇬"], "Berihu Aregawi": ["Ethiopia", "🇪🇹"],
        "Beatrice Chebet": ["Kenya", "🇰🇪"], "Gudaf Tsegay": ["Ethiopia", "🇪🇹"],
        "Letesenbet Gidey": ["Ethiopia", "🇪🇹"], "Grant Holloway": ["United States", "🇺🇸"],
        "Hansle Parchment": ["Jamaica", "🇯🇲"], "Daniel Roberts": ["United States", "🇺🇸"],
        "Karsten Warholm": ["Norway", "🇳🇴"], "Rai Benjamin": ["United States", "🇺🇸"],
        "Alison dos Santos": ["Brazil", "🇧🇷"], "Masai Russell": ["United States", "🇺🇸"],
        "Jasmine Camacho-Quinn": ["Puerto Rico", "🇵🇷"], "Tobi Amusan": ["Nigeria", "🇳🇬"],
        "Femke Bol": ["Netherlands", "🇳🇱"], "Dalilah Muhammad": ["United States", "🇺🇸"],
        "Miltiadis Tentoglou": ["Greece", "🇬🇷"], "Mattia Furlani": ["Italy", "🇮🇹"],
        "Carl Lewis": ["United States", "🇺🇸"], "Jordan Díaz": ["Spain", "🇪🇸"],
        "Pedro Pichardo": ["Portugal", "🇵🇹"], "Christian Taylor": ["United States", "🇺🇸"],
        "Mutaz Barshim": ["Qatar", "🇶🇦"], "Gianmarco Tamberi": ["Italy", "🇮🇹"],
        "Hamish Kerr": ["New Zealand", "🇳🇿"], "Armand Duplantis": ["Sweden", "🇸🇪"],
        "Sam Kendricks": ["United States", "🇺🇸"], "Renaud Lavillenie": ["France", "🇫🇷"],
        "Tara Davis-Woodhall": ["United States", "🇺🇸"], "Malaika Mihambo": ["Germany", "🇩🇪"],
        "Ivana Španović": ["Serbia", "🇷🇸"], "Yulimar Rojas": ["Venezuela", "🇻🇪"],
        "Thea LaFond": ["Dominica", "🇩🇲"], "Leyanis Pérez": ["Cuba", "🇨🇺"],
        "Yaroslava Mahuchikh": ["Ukraine", "🇺🇦"], "Nicola Olyslagers": ["Australia", "🇦🇺"],
        "Eleanor Patterson": ["Australia", "🇦🇺"], "Katie Moon": ["United States", "🇺🇸"],
        "Nina Kennedy": ["Australia", "🇦🇺"], "Sandi Morris": ["United States", "🇺🇸"],
        "Ryan Crouser": ["United States", "🇺🇸"], "Joe Kovacs": ["United States", "🇺🇸"],
        "Leonardo Fabbri": ["Italy", "🇮🇹"], "Mykolas Alekna": ["Lithuania", "🇱🇹"],
        "Daniel Ståhl": ["Sweden", "🇸🇪"], "Kristjan Čeh": ["Slovenia", "🇸🇮"],
        "Ethan Katzberg": ["Canada", "🇨🇦"], "Wojciech Nowicki": ["Poland", "🇵🇱"],
        "Paweł Fajdek": ["Poland", "🇵🇱"], "Neeraj Chopra": ["India", "🇮🇳"],
        "Arshad Nadeem": ["Pakistan", "🇵🇰"], "Anderson Peters": ["Grenada", "🇬🇩"],
        "Yemisi Ogunleye": ["Germany", "🇩🇪"], "Chase Jackson": ["United States", "🇺🇸"],
        "Jessica Schilder": ["Netherlands", "🇳🇱"], "Valarie Allman": ["United States", "🇺🇸"],
        "Feng Bin": ["China", "🇨🇳"], "Sandra Elkasević": ["Croatia", "🇭🇷"],
        "Camryn Rogers": ["Canada", "🇨🇦"], "Brooke Andersen": ["United States", "🇺🇸"],
        "DeAnna Price": ["United States", "🇺🇸"], "Haruka Kitaguchi": ["Japan", "🇯🇵"],
        "Adriana Vilagoš": ["Serbia", "🇷🇸"], "Jo-Ane van Dyk": ["South Africa", "🇿🇦"],
        "Kevin Mayer": ["France", "🇫🇷"], "Markus Rooth": ["Norway", "🇳🇴"],
        "Damian Warner": ["Canada", "🇨🇦"], "Nafissatou Thiam": ["Belgium", "🇧🇪"],
        "Anna Hall": ["United States", "🇺🇸"], "Katarina Johnson-Thompson": ["Great Britain", "🇬🇧"]
    };

    const historicalNames = new Set([
        "Usain Bolt", "Michael Johnson", "David Rudisha", "Hicham El Guerrouj",
        "Carl Lewis", "Sanya Richards-Ross", "Allyson Felix"
    ]);

    const ownerProvidedBests = [
        ["Noah Lyles", "100m", "9.79 s"], ["Usain Bolt", "100m", "9.58 s"],
        ["Kishane Thompson", "100m", "9.75 s"], ["Fred Kerley", "100m", "9.76 s"],
        ["Christian Coleman", "100m", "9.76 s"], ["Noah Lyles", "200m", "19.31 s"],
        ["Letsile Tebogo", "200m", "19.46 s"], ["Erriyon Knighton", "200m", "19.49 s"],
        ["Kenneth Bednarek", "200m", "19.49 s"], ["Usain Bolt", "200m", "19.19 s"],
        ["Wayde van Niekerk", "400m", "43.03 s"], ["Steven Gardiner", "400m", "43.48 s"],
        ["Kirani James", "400m", "43.74 s"], ["Quincy Hall", "400m", "43.40 s"],
        ["Michael Johnson", "400m", "43.18 s"],
        ["Sha'Carri Richardson", "100m", "10.65 s"], ["Julien Alfred", "100m", "10.70 s"],
        ["Shelly-Ann Fraser-Pryce", "100m", "10.60 s"], ["Elaine Thompson-Herah", "100m", "10.54 s"],
        ["Melissa Jefferson-Wooden", "100m", "10.61 s"], ["Gabby Thomas", "200m", "21.60 s"],
        ["Julien Alfred", "200m", "21.45 s"], ["Shericka Jackson", "200m", "21.41 s"],
        ["Sha'Carri Richardson", "200m", "21.92 s"], ["Elaine Thompson-Herah", "200m", "21.53 s"],
        ["Sydney McLaughlin-Levrone", "400m", "48.74 s"], ["Marileidy Paulino", "400m", "48.17 s"],
        ["Salwa Eid Naser", "400m", "48.14 s"], ["Sanya Richards-Ross", "400m", "48.70 s"],
        ["Allyson Felix", "400m", "49.26 s"],
        ["David Rudisha", "800m", "1:40.91"], ["Emmanuel Wanyonyi", "800m", "1:41.11"],
        ["Marco Arop", "800m", "1:41.20"], ["Jakob Ingebrigtsen", "1500m", "3:26.73"],
        ["Josh Kerr", "1500m", "3:27.62"], ["Cole Hocker", "1500m", "3:27.65"],
        ["Jakob Ingebrigtsen", "mile", "3:43.73"], ["Josh Kerr", "mile", "3:42.66"],
        ["Hicham El Guerrouj", "mile", "3:43.13"],
        ["Keely Hodgkinson", "800m", "1:54.61"], ["Mary Moraa", "800m", "1:56.03"],
        ["Athing Mu", "800m", "1:54.97"], ["Faith Kipyegon", "1500m", "3:48.68"],
        ["Jessica Hull", "1500m", "3:50.83"], ["Laura Muir", "1500m", "3:53.37"],
        ["Faith Kipyegon", "mile", "4:07.64"], ["Laura Muir", "mile", "4:18.03"],
        ["Sifan Hassan", "mile", "4:14.71"],
        ["Jakob Ingebrigtsen", "3000m", "7:17.55"], ["Grant Fisher", "3000m", "7:28.48"],
        ["Joshua Cheptegei", "5000m", "12:35.36"], ["Jakob Ingebrigtsen", "5000m", "12:48.45"],
        ["Grant Fisher", "5000m", "12:46.96"], ["Joshua Cheptegei", "10000m", "26:11.00"],
        ["Berihu Aregawi", "10000m", "26:31.13"], ["Grant Fisher", "10000m", "26:33.84"],
        ["Faith Kipyegon", "3000m", "8:07.04"], ["Beatrice Chebet", "3000m", "8:11.56"],
        ["Jessica Hull", "3000m", "8:24.39"], ["Beatrice Chebet", "5000m", "13:58.06"],
        ["Faith Kipyegon", "5000m", "14:05.20"], ["Gudaf Tsegay", "5000m", "14:00.21"],
        ["Beatrice Chebet", "10000m", "28:54.14"], ["Gudaf Tsegay", "10000m", "29:05.92"],
        ["Letesenbet Gidey", "10000m", "29:01.03"],
        ["Grant Holloway", "110mh", "12.81 s"], ["Hansle Parchment", "110mh", "12.93 s"],
        ["Karsten Warholm", "400mh", "45.94 s"], ["Rai Benjamin", "400mh", "46.17 s"],
        ["Alison dos Santos", "400mh", "46.29 s"], ["Masai Russell", "100mh", "12.25 s"],
        ["Jasmine Camacho-Quinn", "100mh", "12.26 s"], ["Tobi Amusan", "100mh", "12.12 s"],
        ["Sydney McLaughlin-Levrone", "400mh", "50.37 s"], ["Femke Bol", "400mh", "50.95 s"],
        ["Dalilah Muhammad", "400mh", "52.16 s"],
        ["Miltiadis Tentoglou", "long-jump", "8.65 m"], ["Mattia Furlani", "long-jump", "8.39 m"],
        ["Carl Lewis", "long-jump", "8.87 m"], ["Jordan Díaz", "triple-jump", "18.18 m"],
        ["Pedro Pichardo", "triple-jump", "18.08 m"], ["Christian Taylor", "triple-jump", "18.21 m"],
        ["Mutaz Barshim", "high-jump", "2.43 m"], ["Gianmarco Tamberi", "high-jump", "2.39 m"],
        ["Hamish Kerr", "high-jump", "2.36 m"], ["Sam Kendricks", "pole-vault", "6.06 m"],
        ["Renaud Lavillenie", "pole-vault", "6.16 m"],
        ["Tara Davis-Woodhall", "long-jump", "7.18 m"], ["Malaika Mihambo", "long-jump", "7.30 m"],
        ["Ivana Španović", "long-jump", "7.24 m"], ["Yulimar Rojas", "triple-jump", "15.74 m"],
        ["Thea LaFond", "triple-jump", "15.02 m"], ["Yaroslava Mahuchikh", "high-jump", "2.10 m"],
        ["Nicola Olyslagers", "high-jump", "2.03 m"], ["Eleanor Patterson", "high-jump", "2.02 m"],
        ["Katie Moon", "pole-vault", "4.95 m"], ["Nina Kennedy", "pole-vault", "4.90 m"],
        ["Sandi Morris", "pole-vault", "5.00 m"],
        ["Ryan Crouser", "shot-put", "23.56 m"], ["Joe Kovacs", "shot-put", "23.23 m"],
        ["Leonardo Fabbri", "shot-put", "22.98 m"], ["Mykolas Alekna", "discus", "75.56 m"],
        ["Daniel Ståhl", "discus", "71.86 m"], ["Kristjan Čeh", "discus", "71.86 m"],
        ["Ethan Katzberg", "hammer", "84.38 m"], ["Wojciech Nowicki", "hammer", "82.52 m"],
        ["Paweł Fajdek", "hammer", "83.93 m"], ["Neeraj Chopra", "javelin", "89.94 m"],
        ["Arshad Nadeem", "javelin", "92.97 m"], ["Anderson Peters", "javelin", "93.07 m"],
        ["Yemisi Ogunleye", "shot-put", "20.19 m"], ["Chase Jackson", "shot-put", "20.76 m"],
        ["Jessica Schilder", "shot-put", "20.69 m"], ["Valarie Allman", "discus", "71.46 m"],
        ["Feng Bin", "discus", "69.12 m"], ["Sandra Elkasević", "discus", "71.41 m"],
        ["Camryn Rogers", "hammer", "78.62 m"], ["DeAnna Price", "hammer", "80.31 m"],
        ["Haruka Kitaguchi", "javelin", "67.38 m"], ["Adriana Vilagoš", "javelin", "66.88 m"],
        ["Kevin Mayer", "decathlon", "9,126 points"], ["Markus Rooth", "decathlon", "8,796 points"],
        ["Damian Warner", "decathlon", "9,018 points"], ["Nafissatou Thiam", "heptathlon", "7,013 points"],
        ["Anna Hall", "heptathlon", "6,988 points"], ["Katarina Johnson-Thompson", "heptathlon", "6,981 points"]
    ];

    const athletesByName = new Map();
    seedGroups.forEach(([event, gender, names]) => {
        names.forEach((name) => {
            const existing = athletesByName.get(name);
            if (existing) {
                if (!existing.events.includes(event)) existing.events.push(event);
                return;
            }
            const [country, flag] = countries[name] || ["", ""];
            athletesByName.set(name, {
                id: name === "Kenneth Bednarek" ? "kenny-bednarek" : name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                name,
                country,
                flag,
                gender,
                ageGroup: "Senior",
                primaryEvent: event,
                events: [event],
                seasons: [],
                classification: historicalNames.has(name) ? "historical-profile" : "seed-profile",
                verification: "unverified",
                source: "",
                verifiedDate: "",
                personalBests: {},
                seasonBests: {},
                latestResult: "",
                achievements: [],
                progression: [],
                results: [],
                rankingSnapshotIds: [],
                photo: "",
                dataNote: "Name, event assignment, and any country label are seeded for discovery only; verify against an official athlete profile before relying on them."
            });
        });
    });

    ownerProvidedBests.forEach(([name, event, display]) => {
        const athlete = athletesByName.get(name);
        if (!athlete) return;
        const numericText = display.match(/[\d,]+(?:\.\d+)?/);
        const numericValue = numericText ? Number(numericText[0].replace(/,/g, "")) : NaN;
        const score = display.includes(":")
            ? Number(display.split(" ")[0].split(":").reduce((seconds, part) => seconds * 60 + Number(part), 0))
            : numericValue;
        athlete.personalBests[event] = {
            display,
            score: Number.isFinite(score) ? score : null,
            verificationStatus: "owner-provided-unverified",
            sourceUrl: "",
            lastCheckedDate: ""
        };
    });

    const fourHundredMeterProfileDetails = {
        "Kirani James": {
            bio: "Kirani James is one of the most accomplished 400m runners in history. He became Grenada's first Olympic medallist with gold at London 2012, then earned Olympic silver in 2016 and bronze in 2020. Known for consistency at major championships and longevity at the highest level.",
            achievements: ["Olympic 400m gold (2012), silver (2016), and bronze (2020)", "2011 World Championships 400m champion"],
            profileHook: "Follow his medal timeline across three Olympic Games and the story of Grenada's first Olympic gold.",
            profileStatus: "Senior athlete; current competitive status and ranking require verification."
        },
        "Marileidy Paulino": {
            bio: "Marileidy Paulino established herself as one of the leading 400m runners of her generation through major championship victories and consistently fast performances. Her Olympic gold in Paris made her the first Dominican woman to win an individual Olympic gold medal.",
            achievements: ["Olympic 400m gold (Paris 2024) and silver (Tokyo 2020)", "2023 World Championships 400m champion"],
            profileHook: "Explore her role in Dominican athletics and the race strategy of the 400m.",
            profileStatus: "Senior athlete; latest ranking requires verification."
        },
        "Quincy Hall": {
            bio: "Quincy Hall won Olympic gold in the men's 400m at Paris 2024 in a dramatic race, finishing in 43.40 seconds. His performance established him among the world's elite one-lap sprinters.",
            achievements: ["Olympic men's 400m gold (Paris 2024)"],
            profileHook: "Explore a final-100m split and how 400m athletes manage fatigue.",
            profileStatus: "Senior athlete; latest ranking requires verification."
        },
        "Salwa Eid Naser": {
            bio: "Salwa Eid Naser became the 2019 world champion in the women's 400m with a 48.14-second performance. Her personal best places her among the fastest women ever over one lap.",
            achievements: ["2019 World Championships women's 400m champion"],
            profileHook: "Break down a 400m across the opening bend, back straight, and final bend.",
            profileStatus: "Senior athlete; latest ranking requires verification."
        },
        "Steven Gardiner": {
            bio: "Steven Gardiner is one of the Bahamas' most successful track athletes. He won the 400m world title in 2019 and Olympic gold in Tokyo, establishing himself as one of the premier one-lap runners of his era.",
            achievements: ["Olympic men's 400m gold (Tokyo 2020)", "2017 World Championships silver medallist", "2019 World Championships 400m champion"],
            profileHook: "Explore the balance between speed and endurance in the 400m.",
            profileStatus: "Senior athlete; current competitive status and ranking require verification."
        },
        "Sydney McLaughlin-Levrone": {
            bio: "Sydney McLaughlin-Levrone is one of the most accomplished 400m hurdlers in history. Her performances combine world-class sprint speed with highly efficient hurdle technique. Her flat 400m ability also makes her a valuable athlete in the individual event and the 4 × 400m relay.",
            achievements: ["Olympic 400m hurdles gold (Tokyo 2020 and Paris 2024)", "Member of the U.S. women's 4 × 400m relay gold-medal teams at Tokyo 2020 and Paris 2024", "Multiple-time world champion"],
            profileHook: "Explore hurdle rhythm and how stride patterns affect speed.",
            profileStatus: "Senior athlete; latest ranking requires verification.",
            primaryEvent: "400mh",
            results: [{
                event: "400m",
                mark: "48.74 s",
                date: "Date not provided",
                competition: "Flat 400m personal best",
                status: "User-provided, unverified"
            }]
        },
        "Wayde van Niekerk": {
            bio: "Wayde van Niekerk holds the men's 400m world record of 43.03 seconds. He set the record while winning Olympic gold at Rio 2016, producing one of the most memorable performances in track and field history.",
            achievements: ["Olympic men's 400m gold and world record (Rio 2016)", "2015 and 2017 World Championships 400m champion"],
            profileHook: "Break down his Rio race and how lane position affects 400m tactics.",
            profileStatus: "Senior athlete; latest competitive status and ranking require verification."
        }
    };
    const profileStories = {
        "Noah Lyles": ["A leading American sprinter who won the 100m, 200m, and 4×100m relay at the 2023 World Championships. His 200m best is the American record.", "Follow his progression from 200m specialist to global 100m champion."],
        "Usain Bolt": ["Jamaican sprint legend and world-record holder in the 100m (9.58) and 200m (19.19), with Olympic sprint titles at Beijing 2008, London 2012, and Rio 2016.", "Explore the 2008–09 record-breaking era."],
        "Oblique Seville": ["Jamaican sprinter ranked first in the men's 100m in the supplied World Athletics ranking snapshot dated 27 October 2026. Other profile details and current status need verification.", "Add verified career milestones and race results from official sources."],
        "Kayinsola Ajayi": ["Nigerian sprinter ranked third in the men's 100m in the supplied World Athletics ranking snapshot dated 27 October 2026. Other profile details and current status need verification.", "Add verified career milestones and race results from official sources."],
        "Kishane Thompson": ["Jamaican sprinter and one of the leading 100m runners of his generation. The supplied 9.75-second best places him among the fastest men ever; recent championship results need checking.", "Explore Jamaican sprint depth and the competition for major-team places."],
        "Fred Kerley": ["American sprinter who has competed successfully in the 100m, 200m, and 400m. He won the 2022 World Championships 100m title after previously earning a world 400m silver medal.", "Trace his unusual transition from 400m to 100m."],
        "Christian Coleman": ["American sprinter known for explosive starts and indoor sprinting. He won the 2019 World Championships 100m title and has been a leading indoor 60m runner.", "Learn why reaction, acceleration, and the first 30 metres matter in the 100m."],
        "Letsile Tebogo": ["Botswana sprinter who won the Olympic 200m title at Paris 2024, earning Botswana its first Olympic gold. He is also a world-class 100m runner.", "Explore Botswana's rise in sprinting and his development through junior championships."],
        "Erriyon Knighton": ["American sprinter who rose to international attention as a teenager and became one of the youngest athletes to reach a senior world 200m final.", "Follow a sourced year-by-year junior-to-senior timeline."],
        "Kenneth Bednarek": ["American sprinter known for major 200m performances and medals. He won Olympic 200m silver at Tokyo 2020 and Paris 2024.", "Compare the demands of his 200m racing with the 100m."],
        "Michael Johnson": ["Retired American sprinter known for his upright running style and 200m/400m combination. He won both events at Atlanta 1996 and set world records during his career.", "Explore his running form and the rare 200m/400m double."],
        "Sha'Carri Richardson": ["American sprinter and 2023 world 100m champion, known for her expressive celebrations and confident race-day presence. Her career includes setbacks and major championship success.", "Trace a sourced timeline of her return to the top and 2023 world title."],
        "Julien Alfred": ["Saint Lucian sprinter who won Olympic 100m gold and 200m silver at Paris 2024, making history for Saint Lucia. She also developed as a standout collegiate sprinter at the University of Texas.", "Explore Saint Lucia's first Olympic medal and gold."],
        "Shelly-Ann Fraser-Pryce": ["Jamaican sprint icon and one of the most successful women's 100m athletes. She won Olympic 100m gold in 2008 and 2012 and multiple world titles.", "Explore her longevity and return to elite sprinting after becoming a parent."],
        "Elaine Thompson-Herah": ["Jamaican sprinter who completed the Olympic 100m/200m double at Rio 2016 and Tokyo 2020.", "Compare the tactics and results of her two Olympic doubles."],
        "Melissa Jefferson-Wooden": ["American sprinter and world-level 100m contender who won Olympic relay gold with Team USA at Paris 2024. Current titles and marks should be checked against official records.", "Explore relay running and how individual speed contributes to a team result."],
        "Gabby Thomas": ["American sprinter who won three gold medals at Paris 2024: the 200m and the 4×100m and 4×400m relays. She studied neurobiology at Harvard and earned a master's degree in public health at the University of Texas.", "Explore her academic path alongside elite athletics."],
        "Shericka Jackson": ["Jamaican sprinter who succeeded in the 100m and 200m after initially establishing herself in the 400m. She won the 2023 World Championships 200m title in 21.41 seconds.", "Trace her transition from 400m to shorter sprints."],
        "Sanya Richards-Ross": ["Retired American 400m star and Olympic champion. She won individual 400m gold at London 2012 after earning relay medals at earlier Olympics, and later worked in sports broadcasting.", "Explore her transition from athlete to broadcaster and analyst."],
        "Allyson Felix": ["American sprint legend who won 11 Olympic medals across five Games, including seven golds. She excelled in the 200m, 400m, and relays and advocated for maternal protections in sport.", "Pair her medal timeline with her impact on athlete-parent support."],
        "David Rudisha": ["Kenyan 800m legend and world-record holder at 1:40.91. He won Olympic gold at London 2012 in a world-record race, leading from the front.", "Break down the 2012 final lap by lap."],
        "Emmanuel Wanyonyi": ["Kenyan 800m star who won Olympic gold at Paris 2024 and became one of the fastest 800m runners in history.", "Compare his race tactics with Rudisha's front-running style."],
        "Marco Arop": ["Canadian 800m runner and 2023 world champion, known for powerful finishing speed.", "Explore how positioning before the final bend can decide a crowded 800m."],
        "Jakob Ingebrigtsen": ["Norwegian distance runner and Olympic 1500m champion at Tokyo 2020, as well as a multiple-time world champion. He is known for precise pacing and front-running.", "Explore pace control and his family's role in the sport without diminishing his achievements."],
        "Josh Kerr": ["British middle-distance runner who won the 1500m world title in 2023 and Olympic 1500m bronze at Tokyo 2020. He is also a major force in the mile and indoor events.", "Explore tactical racing and documented rivalries."],
        "Cole Hocker": ["American middle-distance runner who won Olympic 1500m gold at Paris 2024 in an Olympic-record final, with a decisive late kick.", "Replay the final lap and track when he moved into contention."],
        "Hicham El Guerrouj": ["Moroccan middle-distance legend and long-standing 1500m and mile world-record holder. He won Olympic gold in the 1500m and 5000m at Athens 2004.", "Explore his path from Olympic disappointment to a historic double gold."],
        "Keely Hodgkinson": ["British 800m runner who won Olympic gold at Paris 2024 after taking silver at Tokyo 2020. She has been a leading athlete since her teenage years.", "Follow her progression from Olympic silver to gold."],
        "Mary Moraa": ["Kenyan 800m runner and 2023 world champion, known for an assertive racing style. She also competed in the 400m earlier in her career.", "Compare tactics and positioning in the 400m and 800m."],
        "Athing Mu": ["American middle-distance runner who won Olympic 800m gold at Tokyo 2020 and helped the U.S. win the 4×400m relay. She had a standout collegiate season at Texas A&M.", "Trace her rapid rise from college athletics to Olympic champion."],
        "Faith Kipyegon": ["Kenyan distance-running icon and three-time Olympic 1500m champion (2016, 2020, 2024), with world records in the 1500m and mile and success in the 5000m.", "Explore her return to the top after motherhood and expansion into longer events."],
        "Jessica Hull": ["Australian middle-distance runner who won Olympic 1500m silver at Paris 2024 and has set high-level records over several distances.", "Explore her range from the 1500m to longer track events."],
        "Laura Muir": ["British middle-distance runner and Olympic 1500m silver medallist at Tokyo 2020. She also qualified as a veterinary surgeon.", "Explore balancing demanding study with international athletics."],
        "Sifan Hassan": ["Dutch distance runner, born in Ethiopia, who competes on track, road, and marathon. At Tokyo 2020 she won 5000m and 10,000m gold and 1500m bronze; at Paris 2024 she won the marathon and earned 5000m and 10,000m bronze.", "Explore her extraordinary range of racing distances."],
        "Grant Fisher": ["American distance runner who won Olympic bronze in both the 5000m and 10,000m at Paris 2024 and has also led indoor track events.", "Explore the rare challenge of medalling in both long track events at one Olympics."],
        "Joshua Cheptegei": ["Ugandan distance runner and former 5000m and 10,000m world-record holder. He won Olympic 5000m gold at Tokyo 2020 and 10,000m gold at Paris 2024.", "Trace his progression from record-holder to Olympic champion over two distances."],
        "Berihu Aregawi": ["Ethiopian distance runner and leading 5000m/10,000m competitor who won Olympic 10,000m silver at Paris 2024.", "Explore championship racing, where placing matters as much as time."],
        "Beatrice Chebet": ["Kenyan distance runner who won Olympic gold in both the 5000m and 10,000m at Paris 2024. She also built a strong cross-country career and set major track records.", "Follow her development from junior cross-country champion to double Olympic champion."],
        "Gudaf Tsegay": ["Ethiopian distance runner who has excelled from the 1500m through the 10,000m and set a women's 5000m world record in 2023.", "Compare training and race tactics across different distances."],
        "Letesenbet Gidey": ["Ethiopian distance runner and former 5000m and 10,000m world-record holder, as well as a world cross-country champion.", "Explore the connection between cross-country strength and track distance running."],
        "Grant Holloway": ["American hurdler and one of the leading 110m hurdlers of his era. He won Olympic 110m hurdles gold at Paris 2024 and multiple world titles.", "Explore how elite hurdlers maintain speed with precise, repeatable steps."],
        "Hansle Parchment": ["Jamaican hurdler who won Olympic 110m hurdles gold at Tokyo 2020 after earning Olympic bronze at London 2012.", "Trace his path from an earlier Olympic medal to gold."],
        "Daniel Roberts": ["American 110m hurdler and international championship medallist. Verify major championship finishes and personal bests against official records.", "Feature sourced championship results; do not use the malformed supplied mark."],
        "Karsten Warholm": ["Norwegian 400m hurdler and world-record holder. He broke the world record while winning Olympic gold at Tokyo 2020.", "Explore the speed-endurance and hurdle-rhythm demands of the event."],
        "Rai Benjamin": ["American 400m hurdler who won individual Olympic silver at Tokyo 2020 and gold at Paris 2024, and has Olympic relay gold with the U.S.", "Compare his racing approach with Warholm and Alison dos Santos using race data."],
        "Alison dos Santos": ["Brazilian 400m hurdler who won world gold in 2022 and Olympic bronze at Tokyo 2020.", "Explore the international rivalry among leading 400m hurdlers."],
        "Masai Russell": ["American 100m hurdler who won Olympic gold at Paris 2024 and developed through U.S. collegiate competition.", "Follow her college-to-Olympic journey and the precision of sprint hurdling."],
        "Jasmine Camacho-Quinn": ["Puerto Rican hurdler who won Olympic 100m hurdles gold at Tokyo 2020 and bronze at Paris 2024.", "Explore how hurdle technique and sprint speed combine in the 100m hurdles."],
        "Tobi Amusan": ["Nigerian hurdler and 100m hurdles world-record holder, with a 12.12-second performance at the 2022 World Championships. She became Nigeria's first world athletics champion.", "Explore her record-breaking run and its importance for Nigerian athletics."],
        "Femke Bol": ["Dutch athlete who excels in the 400m hurdles and flat 400m. She won Olympic 400m hurdles bronze at Tokyo 2020 and helped the Netherlands win the mixed 4×400m relay at Paris 2024.", "Compare the rhythm and stamina demands of her flat and hurdles events."],
        "Dalilah Muhammad": ["American 400m hurdler and Olympic champion at Rio 2016, followed by silver at Tokyo 2020. She repeatedly broke the world record during her career.", "Explore her role in the era when the women's 400m hurdles record dropped dramatically."],
        "Miltiadis Tentoglou": ["Greek long jumper and Olympic champion at Tokyo 2020 and Paris 2024, known for consistency in major finals.", "Explore how a long-jump final is decided over multiple attempts."],
        "Mattia Furlani": ["Italian long jumper who rose quickly as a young international athlete and won a world indoor long-jump title in 2024.", "Explore runway speed, takeoff, and landing."],
        "Carl Lewis": ["American athletics legend who won nine Olympic gold medals across sprinting and long jump. At Los Angeles 1984, he won gold in the 100m, 200m, long jump, and 4×100m relay.", "Explore the unusual challenge of dominating both sprinting and a field event."],
        "Jordan Díaz": ["Spanish triple jumper, born in Cuba, who won Olympic gold at Paris 2024. The event links three phases—hop, step, and jump—requiring rhythm and balance.", "Break down the three phases of the triple jump."],
        "Pedro Pichardo": ["Portuguese triple jumper and Olympic champion at Tokyo 2020, with further major championship medals. He was born in Cuba and later represented Portugal.", "Explore his sporting journey between countries neutrally and accurately."],
        "Christian Taylor": ["American triple jumper and two-time Olympic champion (2012 and 2016), with multiple world titles.", "Explore how repeatable technique and consistency produce major titles."],
        "Mutaz Barshim": ["Qatari high jumper who shared Olympic gold with Italy's Gianmarco Tamberi at Tokyo 2020 after the athletes agreed not to continue to a jump-off.", "Explore the sportsmanship behind Tokyo's shared gold."],
        "Gianmarco Tamberi": ["Italian high jumper who shared Olympic gold with Mutaz Barshim at Tokyo 2020, known for expressive celebrations and a close friendship with Barshim.", "Tell the shared-gold story from both athletes' perspectives."],
        "Hamish Kerr": ["New Zealand high jumper who won Olympic gold at Paris 2024.", "Explore his path to Olympic gold and the technical challenge of clearing each height."],
        "Armand Duplantis": ["Swedish-American pole vaulter and world-record holder who has repeatedly raised the record. He won Olympic gold at Tokyo 2020 and Paris 2024.", "Track record progression using official results; pole vault combines speed, pole control, takeoff, and aerial technique."],
        "Sam Kendricks": ["American pole vaulter and two-time world champion. He won Olympic bronze at Rio 2016 and silver at Paris 2024.", "Explore the sequence from runway approach to plant, swing, and bar clearance."],
        "Renaud Lavillenie": ["French pole vaulter and Olympic champion at London 2012. He broke the indoor world record in 2014 and held the outdoor record before Duplantis surpassed it.", "Explore his record-setting era and pole-vault record progression."],
        "Tara Davis-Woodhall": ["American long jumper who won Olympic gold at Paris 2024 and has spoken publicly about confidence and enjoying competition.", "Explore her route to Olympic gold and the mechanics of a legal long jump."],
        "Malaika Mihambo": ["German long jumper and Olympic champion at Tokyo 2020, with world titles and consistency in major competitions.", "Explore how jumpers build a series of strong attempts."],
        "Ivana Španović": ["Serbian long jumper and world indoor champion who has also competed under the surname Vuleta after marriage.", "Trace her championship progression and verify the competition-season name."],
        "Yulimar Rojas": ["Venezuelan triple jumper and world-record holder at 15.74m. She won Olympic gold at Tokyo 2020 and multiple world titles.", "Explore her record jump and the hop-step-jump technique."],
        "Thea LaFond": ["Dominica triple jumper who won Olympic gold at Paris 2024, earning the country's first Olympic medal.", "Explore the impact of a historic medal and her progression to the top."],
        "Leyanis Pérez": ["Cuban triple jumper and international championship medallist who has become one of the leading athletes in the event.", "Trace major championship progression and verify current bests before displaying them."],
        "Yaroslava Mahuchikh": ["Ukrainian high jumper and Olympic champion at Paris 2024. She set the women's high-jump world record at 2.10m in 2024.", "Explore the record clearance and Fosbury Flop technique."],
        "Nicola Olyslagers": ["Australian high jumper and Olympic medallist known for keeping written notes and reflecting on attempts during competition.", "Explore her publicly discussed note-taking routine using reliable interviews."],
        "Eleanor Patterson": ["Australian high jumper and 2022 world champion who has won major medals at world and Olympic-level competitions.", "Explore her progress across championship cycles and the challenge of maintaining form."],
        "Katie Moon": ["American pole vaulter and Olympic champion at Tokyo 2020 (then competing as Katie Nageotte), and silver medallist at Paris 2024. She has also won multiple world titles.", "Trace her progression from college athlete to Olympic champion."],
        "Nina Kennedy": ["Australian pole vaulter who shared the 2023 world title with Katie Moon after both athletes agreed not to continue the jump-off.", "Explore the decision to share a world title and respect between competitors."],
        "Sandi Morris": ["American pole vaulter and Olympic silver medallist at Rio 2016, with multiple world championship medals.", "Explore pole selection and run-up adjustments using verified interviews."],
        "Ryan Crouser": ["American shot putter and three-time consecutive Olympic champion (2016, 2020, 2024) who has repeatedly broken the world record.", "Explore rotational technique, release angle, and speed."],
        "Joe Kovacs": ["American shot putter and multiple-time world medallist who earned Olympic medals at Rio 2016, Tokyo 2020, and Paris 2024.", "Explore close margins and how one attempt can change a final."],
        "Leonardo Fabbri": ["Italian shot putter who won world championship bronze in 2023 and became European champion in 2024.", "Explore Italian shot put and consistency beyond 22 metres."],
        "Mykolas Alekna": ["Lithuanian discus thrower and son of two-time Olympic champion Virgilijus Alekna. He became a leading discus thrower and set a world record in 2024.", "Explore the family connection and how rotation generates release speed."],
        "Daniel Ståhl": ["Swedish discus thrower and Olympic champion at Tokyo 2020, with world titles and a distinctive competition presence.", "Explore the spin across the circle and balance at release."],
        "Kristjan Čeh": ["Slovenian discus thrower and 2022 world champion, among the leading athletes in the event.", "Explore how the discus technique builds momentum through a long rotational path."],
        "Ethan Katzberg": ["Canadian hammer thrower and Olympic champion at Paris 2024, as well as 2023 world champion.", "Explore the four-turn technique and timing the release."],
        "Wojciech Nowicki": ["Polish hammer thrower and Olympic champion at Tokyo 2020, with multiple major championship medals.", "Explore long-term consistency and timing in a technical event."],
        "Paweł Fajdek": ["Polish hammer thrower and five-time world champion, dominant in the event for more than a decade.", "Trace his world titles and the rotational technique of hammer throwing."],
        "Neeraj Chopra": ["Indian javelin thrower who won Olympic gold at Tokyo 2020 and silver at Paris 2024. His Tokyo victory was India's first Olympic athletics gold.", "Explore the impact of his win in India and the javelin throwing sequence."],
        "Arshad Nadeem": ["Pakistani javelin thrower who won Olympic gold at Paris 2024 and set an Olympic record, earning Pakistan's first individual Olympic gold.", "Explore his path to Olympic success and the national significance of the win."],
        "Anderson Peters": ["Grenadian javelin thrower and two-time world champion whose success extends Grenada's field-event presence beyond the 400m.", "Compare the javelin run-up, crossover steps, and release with other throws."],
        "Yemisi Ogunleye": ["German shot putter who won Olympic gold at Paris 2024.", "Explore her rise to Olympic champion and the coordination required in shot put."],
        "Chase Jackson": ["American shot putter and two-time world champion, a leading performer who has repeatedly thrown beyond 20 metres.", "Compare glide and rotational techniques and how athletes choose a method."],
        "Jessica Schilder": ["Dutch shot putter and European champion who has earned major international medals.", "Explore Dutch success in field events and shot-put circle technique."],
        "Valarie Allman": ["American discus thrower and Olympic champion at Tokyo 2020 and Paris 2024.", "Explore how discus throwers build speed through rotation and stay within the circle."],
        "Feng Bin": ["Chinese discus thrower who won world gold in 2022 and Olympic bronze at Paris 2024.", "Explore her championship breakthrough and consistency through a final."],
        "Sandra Elkasević": ["Croatian discus thrower, formerly known as Sandra Perković, who won Olympic gold in 2012 and 2016 and multiple world titles.", "Explore her long period of dominance and name history across competition records."],
        "Camryn Rogers": ["Canadian hammer thrower who won Olympic gold at Paris 2024 after winning world gold in 2023.", "Explore the four-turn throwing sequence and her rise in a technical event."],
        "Brooke Andersen": ["American hammer thrower and 2022 world champion. Verify her personal best because the supplied list contains an incomplete value.", "Explore her world-title season and how hammer throws are measured."],
        "DeAnna Price": ["American hammer thrower and 2019 world champion, the first U.S. woman to win a world title in the event.", "Explore the breakthrough for American women's hammer and the event's technical demands."],
        "Haruka Kitaguchi": ["Japanese javelin thrower who won world gold in 2023 and Olympic bronze at Paris 2024.", "Explore the precision of the run-up and release and her rise internationally."],
        "Adriana Vilagoš": ["Serbian javelin thrower who won medals at major junior championships and developed into a senior international contender.", "Explore the junior-to-senior transition and consistent technique."],
        "Jo-Ane van Dyk": ["South African javelin thrower who won Olympic silver at Paris 2024. Verify her latest official personal best.", "Explore her Olympic breakthrough and South Africa's place in international javelin."],
        "Kevin Mayer": ["French decathlete and world-record holder with 9,126 points. The decathlon combines ten events over two days, testing speed, jumps, throws, and endurance.", "Show how points across ten events reward balanced performance."],
        "Markus Rooth": ["Norwegian decathlete who won Olympic gold at Paris 2024 in a major breakthrough for an event rewarding all-around ability.", "Show his event-by-event score progression across two days."],
        "Damian Warner": ["Canadian decathlete and Olympic champion at Tokyo 2020, known for strong all-around performances, especially in sprints and hurdles.", "Compare event mix and score distribution in his Olympic-winning decathlon."],
        "Nafissatou Thiam": ["Belgian heptathlete and three-time Olympic champion (2016, 2020, 2024), particularly strong in high jump and javelin.", "Visualise how strengths in individual events shape a heptathlon result."],
        "Anna Hall": ["American heptathlete and world championship medallist, a leading U.S. multi-event athlete across the seven-event programme.", "Explore the challenge of sustaining performance across two days and seven disciplines."],
        "Katarina Johnson-Thompson": ["British heptathlete and world champion in 2019 and 2023 who returned to major championship success after injuries disrupted parts of her career.", "Build a sourced comeback timeline using dates and competition results."]
    };
    Object.entries(profileStories).forEach(([name, [bio, profileHook]]) => {
        const athlete = athletesByName.get(name);
        if (!athlete) return;
        athlete.bio = bio;
        athlete.profileHook = profileHook;
        athlete.profileStatus = athlete.profileStatus || "User-provided profile notes; facts and current status have not been independently verified.";
    });
    Object.entries(fourHundredMeterProfileDetails).forEach(([name, details]) => {
        const athlete = athletesByName.get(name);
        if (!athlete) return;
        athlete.bio = details.bio;
        athlete.achievements = details.achievements;
        athlete.profileHook = details.profileHook || athlete.profileHook;
        athlete.profileStatus = details.profileStatus;
        athlete.source = "https://worldathletics.org/athletes";
        if (details.primaryEvent) {
            athlete.primaryEvent = details.primaryEvent;
            athlete.profilePrimaryEvent = details.primaryEvent;
        }
        if (details.results) athlete.results = details.results;
    });

    const database = {
        schemaVersion: 1,
        updatedAt: "",
        dataMode: "unverified-seed-list",
        events: [
            "60m",             "100m", "200m", "400m", "800m", "1500m", "mile", "3000m", "5000m", "10000m", "overall-ranking",
            "60mh", "100mh", "110mh", "400mh", "high-jump", "pole-vault", "long-jump", "triple-jump",
            "shot-put", "discus", "hammer", "javelin", "decathlon", "heptathlon"
        ].map((id) => ({ id, name: id, indoorOutdoorRulesMayDiffer: true })),
        athletes: [...athletesByName.values()],
        performances: [
            {
                id: "noah-lyles-100m-2026-outdoor",
                athleteId: "noah-lyles",
                event: "100m",
                mark: "9.79 s",
                numericMark: 9.79,
                competition: "Icahn Stadium, New York, NY",
                competitionDate: "2026-07-24",
                seasonFormat: "outdoor",
                wind: "+0.8 m/s",
                sourceUrl: "https://worldathletics.org/records/toplists/sprints/100-metres/outdoor/men/senior/2026",
                verificationStatus: "verified",
                lastCheckedDate: "2026-10-28",
                listType: "season"
            }
        ],
        competitions: [],
        rankingSnapshots: [
            {
                id: "wa-2026-mens-100m-outdoor",
                storageKey: "current-season|100m|men|Senior|world|outdoor|2026|World Athletics 2026 Outdoor Top Lists|2026-10-28",
                rankingType: "current-season",
                event: "100m",
                gender: "men",
                ageGroup: "Senior",
                countryScope: "world",
                seasonFormat: "outdoor",
                season: "2026",
                organization: "World Athletics 2026 Outdoor Top Lists",
                sourceUrl: "https://worldathletics.org/records/toplists/sprints/100-metres/outdoor/men/senior/2026",
                asOfDate: "2026-10-28",
                verifiedAt: "2026-10-28",
                verificationStatus: "verified",
                completeness: "partial",
                entries: [{ athleteId: "noah-lyles", rank: 1, mark: "9.79 s", performanceId: "noah-lyles-100m-2026-outdoor" }]
            },
            {
                id: "wa-world-rankings-mens-200m-2026-10-28",
                storageKey: "official|200m|men|Senior|world|all|Current|World Athletics World Rankings|2026-10-28",
                rankingType: "official",
                event: "200m",
                gender: "men",
                ageGroup: "Senior",
                countryScope: "world",
                seasonFormat: "all",
                season: "Current",
                organization: "World Athletics World Rankings",
                sourceUrl: "https://worldathletics.org/athletes/united-states/noah-lyles-14536762",
                asOfDate: "2026-10-28",
                verifiedAt: "2026-10-28",
                verificationStatus: "verified",
                completeness: "partial",
                entries: [{ athleteId: "noah-lyles", rank: 8, mark: "", performanceId: "" }]
            },
            {
                id: "wa-world-rankings-mens-100m-2026-10-27",
                storageKey: "official|100m|men|Senior|world|all|Current|World Athletics World Rankings|2026-10-27",
                rankingType: "official",
                event: "100m",
                gender: "men",
                ageGroup: "Senior",
                countryScope: "world",
                seasonFormat: "all",
                season: "Current",
                organization: "World Athletics World Rankings",
                sourceUrl: "https://worldathletics.org/world-rankings/100m/men",
                asOfDate: "2026-10-27",
                verifiedAt: "2026-10-29",
                verificationStatus: "verified",
                completeness: "partial",
                entries: [
                    { athleteId: "oblique-seville", rank: 1, mark: "", performanceId: "" },
                    { athleteId: "kenny-bednarek", rank: 2, mark: "", performanceId: "" },
                    { athleteId: "kayinsola-ajayi", rank: 3, mark: "", performanceId: "" },
                    { athleteId: "noah-lyles", rank: 4, mark: "", performanceId: "" },
                    { athleteId: "kishane-thompson", rank: 7, mark: "", performanceId: "" },
                    { athleteId: "christian-coleman", rank: 8, mark: "", performanceId: "" },
                    { athleteId: "letsile-tebogo", rank: 12, mark: "", performanceId: "" }
                ]
            },
            {
                id: "wa-world-rankings-womens-200m-2026-10-27",
                storageKey: "official|200m|women|Senior|world|all|Current|World Athletics World Rankings|2026-10-27",
                rankingType: "official",
                event: "200m",
                gender: "women",
                ageGroup: "Senior",
                countryScope: "world",
                seasonFormat: "all",
                season: "Current",
                organization: "World Athletics World Rankings",
                sourceUrl: "https://worldathletics.org/world-rankings/200m/women",
                asOfDate: "2026-10-27",
                verifiedAt: "2026-10-29",
                verificationStatus: "verified",
                completeness: "partial",
                entries: [
                    { athleteId: "melissa-jefferson-wooden", rank: 1, mark: "", performanceId: "" },
                    { athleteId: "gabby-thomas", rank: 2, mark: "", performanceId: "" },
                    { athleteId: "julien-alfred", rank: 3, mark: "", performanceId: "" },
                    { athleteId: "shericka-jackson", rank: 6, mark: "", performanceId: "" }
                ]
            },
            {
                id: "wa-world-rankings-mens-overall-2026-10-27",
                storageKey: "official|overall-ranking|men|Senior|world|all|Current|World Athletics World Rankings|2026-10-27",
                rankingType: "official",
                event: "overall-ranking",
                gender: "men",
                ageGroup: "Senior",
                countryScope: "world",
                seasonFormat: "all",
                season: "Current",
                organization: "World Athletics World Rankings",
                sourceUrl: "https://worldathletics.org/world-rankings/overall-ranking/men",
                asOfDate: "2026-10-27",
                verifiedAt: "2026-10-29",
                verificationStatus: "verified",
                completeness: "partial",
                entries: [
                    { athleteId: "armand-duplantis", rank: 1, mark: "", performanceId: "" },
                    { athleteId: "alison-dos-santos", rank: 2, mark: "", performanceId: "" },
                    { athleteId: "kenny-bednarek", rank: 3, mark: "", performanceId: "" },
                    { athleteId: "noah-lyles", rank: 14, mark: "", performanceId: "" },
                    { athleteId: "cole-hocker", rank: 15, mark: "", performanceId: "" },
                    { athleteId: "letsile-tebogo", rank: 16, mark: "", performanceId: "" },
                    { athleteId: "marco-arop", rank: 17, mark: "", performanceId: "" },
                    { athleteId: "ethan-katzberg", rank: 19, mark: "", performanceId: "" },
                    { athleteId: "mykolas-alekna", rank: 22, mark: "", performanceId: "" },
                    { athleteId: "miltiadis-tentoglou", rank: 24, mark: "", performanceId: "" },
                    { athleteId: "leonardo-fabbri", rank: 25, mark: "", performanceId: "" },
                    { athleteId: "pedro-pichardo", rank: 30, mark: "", performanceId: "" },
                    { athleteId: "kristjan-ceh", rank: 32, mark: "", performanceId: "" },
                    { athleteId: "daniel-stahl", rank: 53, mark: "", performanceId: "" },
                    { athleteId: "josh-kerr", rank: 55, mark: "", performanceId: "" },
                    { athleteId: "sam-kendricks", rank: 56, mark: "", performanceId: "" },
                    { athleteId: "anderson-peters", rank: 63, mark: "", performanceId: "" },
                    { athleteId: "joe-kovacs", rank: 68, mark: "", performanceId: "" },
                    { athleteId: "jakob-ingebrigtsen", rank: 69, mark: "", performanceId: "" },
                    { athleteId: "grant-fisher", rank: 71, mark: "", performanceId: "" },
                    { athleteId: "kishane-thompson", rank: 92, mark: "", performanceId: "" }
                ]
            }
        ],
        seedGroups: seedGroups.map(([event, gender, names]) => ({ event, gender, athleteNames: names })),
        sourcePolicy: {
            rankingSourceRequired: true,
            rankingDateRequired: true,
            currentRankingsVerified: true,
            partialCoverage: true,
            note: "Seed names are not rankings. The newly added World Athletics snapshots contain only the supplied positions and are marked partial; their source pages were checked 2026-10-29."
        }
    };

    window.PACE_INDEX_DATABASE = database;
})();
