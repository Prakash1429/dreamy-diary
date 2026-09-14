export type ChennaiCategory =
  | 'Heritage & Historical'
  | 'Beaches & Coastal'
  | 'Hindu Temples'
  | 'Churches'
  | 'Mosques'
  | 'Museums & Art'
  | 'Parks & Nature'
  | 'Wildlife & Animals'
  | 'Science & Educational'
  | 'Arts & Culture'
  | 'Shopping & Exploration';

export interface ChennaiPlace {
  id: string;
  name: string;
  category: ChennaiCategory;
  entryType: 'free' | 'paid';
  priceInfo: string;
  area: string;
  description: string;
  famousFor: string[];
  coverImage?: string;
  bestTimeToVisit?: string;
  timings?: string;
  locationAddress?: string;
  lat: number;
  lng: number;
  icon: string;
}

export const CHENNAI_PLACES: ChennaiPlace[] = [
  {
    "id": "chennai_marina_beach",
    "name": "Marina Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Marina",
    "description": "World's 2nd longest urban beach stretching 13 km along Bay of Bengal.",
    "famousFor": [
      "World's 2nd longest urban beach",
      "Local street food: Sundal & fried fish",
      "Lighthouse & statues"
    ],
    "bestTimeToVisit": "5:30 AM - 8:00 AM & 4:30 PM - 8:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Kamaraajar Salai, Triplicane, Chennai 600005",
    "lat": 13.0499,
    "lng": 80.2824,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_elliots_beach",
    "name": "Elliot's Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Besant Nagar",
    "description": "Popularly known as Bessie, featuring Karl Schmidt Memorial and sea-facing cafes.",
    "famousFor": [
      "Karl Schmidt Memorial",
      "Beachside cafe culture",
      "Proximity to Velankanni Shrine"
    ],
    "bestTimeToVisit": "4:00 PM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Besant Nagar, Chennai 600090",
    "lat": 13.0007,
    "lng": 80.2673,
    "icon": "\ud83c\udfd6\ufe0f"
  },
  {
    "id": "chennai_thiruvanmiyur_beach",
    "name": "Thiruvanmiyur Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Thiruvanmiyur",
    "description": "Serene coastal stretch at start of ECR, popular for morning jogging and sunset walks.",
    "famousFor": [
      "Quiet uncrowded shoreline",
      "Morning jogging & yoga spot",
      "Fresh sea air"
    ],
    "bestTimeToVisit": "5:30 AM - 7:30 AM & 4:30 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Thiruvanmiyur Beach Promenade, Chennai 600041",
    "lat": 12.9822,
    "lng": 80.2652,
    "icon": "\ud83c\udf05"
  },
  {
    "id": "chennai_santhome_beach",
    "name": "Santhome Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Santhome",
    "description": "Sandy coastal stretch situated directly behind San Thome Cathedral Basilica.",
    "famousFor": [
      "Cathedral spire view over ocean",
      "Traditional fishing boats",
      "Quiet sea vista"
    ],
    "bestTimeToVisit": "5:30 AM - 7:30 AM & 4:30 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Santhome High Road, Santhome, Chennai 600004",
    "lat": 13.0337,
    "lng": 80.2785,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_foreshore_estate_beach",
    "name": "Foreshore Estate Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Foreshore Estate",
    "description": "Coastal stretch in Pattinapakkam known for open sands and fresh sea fish markets.",
    "famousFor": [
      "Morning fresh fish auctions",
      "Panoramic ocean views",
      "Coastal sea breeze"
    ],
    "bestTimeToVisit": "6:00 AM - 8:00 AM & 4:30 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Pattinapakkam, Foreshore Estate, Chennai 600028",
    "lat": 13.0275,
    "lng": 80.2764,
    "icon": "\ud83c\udfd6\ufe0f"
  },
  {
    "id": "chennai_neelankarai_beach",
    "name": "Neelankarai Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Neelankarai",
    "description": "Tranquil residential beach along ECR with clean golden sands and sea turtle nesting sites.",
    "famousFor": [
      "Serene residential shoreline",
      "Olive Ridley turtle nesting site",
      "Clear evening sky"
    ],
    "bestTimeToVisit": "5:00 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Neelankarai Beach, ECR, Chennai 600115",
    "lat": 12.9467,
    "lng": 80.2556,
    "icon": "\ud83c\udf05"
  },
  {
    "id": "chennai_palavakkam_beach",
    "name": "Palavakkam Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Palavakkam",
    "description": "Spacious coastal beach featuring paved walking tracks, play zones, and open sands.",
    "famousFor": [
      "Paved jogging track",
      "Wide sandy beach space",
      "Street snack stalls"
    ],
    "bestTimeToVisit": "4:30 PM - 7:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Palavakkam Beach Rd, ECR, Chennai 600041",
    "lat": 12.9619,
    "lng": 80.2581,
    "icon": "\ud83c\udfd6\ufe0f"
  },
  {
    "id": "chennai_kottivakkam_beach",
    "name": "Kottivakkam Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Kottivakkam",
    "description": "Peaceful coastal strip nestled between Thiruvanmiyur and Palavakkam along ECR.",
    "famousFor": [
      "Uncrowded beach shore",
      "Morning fitness spot",
      "Golden sand dunes"
    ],
    "bestTimeToVisit": "5:30 AM - 7:30 AM & 4:30 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Kottivakkam Beach Road, ECR, Chennai 600041",
    "lat": 12.9712,
    "lng": 80.2611,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_akkarai_beach",
    "name": "Akkarai Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Akkarai",
    "description": "Located adjacent to ISKCON Temple along ECR, known for pristine waters and dunes.",
    "famousFor": [
      "Proximity to ISKCON Temple",
      "Clean wide sandy dunes",
      "Weekend coastal getaway"
    ],
    "bestTimeToVisit": "4:30 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Akkarai Beach Road, Injambakkam, Chennai 600115",
    "lat": 12.9234,
    "lng": 80.2528,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_injambakkam_beach",
    "name": "Injambakkam Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Injambakkam",
    "description": "Scenic coastal strip in Injambakkam near VGP Marine Kingdom with palm groves.",
    "famousFor": [
      "Beach resort shorelines",
      "Proximity to VGP theme parks",
      "Sunset views"
    ],
    "bestTimeToVisit": "4:30 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Injambakkam Beach Road, ECR, Chennai 600115",
    "lat": 12.9122,
    "lng": 80.252,
    "icon": "\ud83c\udfd6\ufe0f"
  },
  {
    "id": "chennai_uthandi_beach",
    "name": "Uthandi Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Uthandi",
    "description": "Pristine secluded beach stretch along ECR known for high sand dunes and clean shores.",
    "famousFor": [
      "High golden sand dunes",
      "Secluded quiet relaxation",
      "Sunset horizons"
    ],
    "bestTimeToVisit": "4:30 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Uthandi Beach Road, ECR, Chennai 600119",
    "lat": 12.8753,
    "lng": 80.2489,
    "icon": "\ud83c\udf05"
  },
  {
    "id": "chennai_kovalam_beach",
    "name": "Kovalam Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Public Access",
    "area": "Kovalam",
    "description": "Famous fishing village turned premier ocean surfing destination along East Coast Road.",
    "famousFor": [
      "Premier surfing spot in South India",
      "Covelong Point Surf Festival",
      "Water sports & Kayaking"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 4:00 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Covelong Beach Road, Kovalam, Chennai 603112",
    "lat": 12.7892,
    "lng": 80.2514,
    "icon": "\ud83c\udfc4"
  },
  {
    "id": "chennai_muttukadu_beach",
    "name": "Muttukadu Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Muttukadu",
    "description": "Situated where Muttukadu backwater lagoon meets Bay of Bengal along ECR.",
    "famousFor": [
      "Backwater meets ocean estuary view",
      "TTDC boating nearby",
      "Scenic ECR drive"
    ],
    "bestTimeToVisit": "4:00 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "ECR Road, Muttukadu, Chennai 603112",
    "lat": 12.8122,
    "lng": 80.2408,
    "icon": "\ud83c\udf34"
  },
  {
    "id": "chennai_nettukuppam_beach",
    "name": "Nettukuppam Beach",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Ennore",
    "description": "Northernmost point of Chennai where Ennore Creek meets the Bay of Bengal, famous for broken pier.",
    "famousFor": [
      "Nettukuppam broken pier in sea waves",
      "Northern tip of Chennai sea view",
      "Wave photography"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:00 PM",
    "timings": "Open during daylight hours",
    "locationAddress": "Nettukuppam, Ennore, Chennai 600057",
    "lat": 13.2245,
    "lng": 80.3298,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_kasimedu_fishing_harbour",
    "name": "Kasimedu Fishing Harbour",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Kasimedu",
    "description": "Busiest deep-sea fishing harbour in Chennai with long concrete pier and live fish auctions.",
    "famousFor": [
      "1 km concrete pier walk into sea",
      "Live fish auction market",
      "Ocean fishing trawlers"
    ],
    "bestTimeToVisit": "5:30 AM - 8:00 AM (Sunrise & Auction)",
    "timings": "Open 24/7",
    "locationAddress": "Kasimedu Pier, Royapuram, Chennai 600013",
    "lat": 13.1189,
    "lng": 80.2986,
    "icon": "\ud83c\udfa3"
  },
  {
    "id": "chennai_marina_lighthouse",
    "name": "Marina Lighthouse",
    "category": "Beaches & Coastal",
    "entryType": "paid",
    "priceInfo": "\u20b920 - Adults, \u20b910 - Children",
    "area": "Marina",
    "description": "46-meter tall active lighthouse at Marina Beach with elevator to panoramic observation deck.",
    "famousFor": [
      "360-degree aerial view of Marina Beach",
      "Only lighthouse with elevator in India",
      "Maritime radar museum"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM & 3:00 PM - 6:00 PM",
    "timings": "10:00 AM - 1:00 PM & 3:00 PM - 6:00 PM (Closed Mondays)",
    "locationAddress": "Kamaraajar Salai, Marina Beach, Chennai 600004",
    "lat": 13.0398,
    "lng": 80.2798,
    "icon": "\ud83d\udea8"
  },
  {
    "id": "chennai_ecr_road_coast",
    "name": "ECR Road",
    "category": "Beaches & Coastal",
    "entryType": "free",
    "priceInfo": "Free Public Highway Drive",
    "area": "East Coast Road",
    "description": "Scenic 2-lane coastal highway connecting Chennai to Mahabalipuram along Bay of Bengal.",
    "famousFor": [
      "Picturesque oceanfront highway drive",
      "Beach resorts & seafood cafes",
      "Sunset coastal views"
    ],
    "bestTimeToVisit": "4:00 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "East Coast Road (SH-49), Chennai",
    "lat": 12.92,
    "lng": 80.25,
    "icon": "\ud83c\udfce\ufe0f"
  },
  {
    "id": "chennai_fort_st_george",
    "name": "Fort St. George",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Grounds Entry",
    "area": "George Town",
    "description": "First English fortress in India, built in 1644. Currently houses TN State Secretariat.",
    "famousFor": [
      "First British fort built in India (1644)",
      "TN Secretariat & Assembly seat",
      "Historic 150-ft flagstaff site"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM",
    "timings": "9:00 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Rajaji Salai, Fort St George, Chennai 600009",
    "lat": 13.0795,
    "lng": 80.2872,
    "icon": "\ud83c\udff0"
  },
  {
    "id": "chennai_fort_museum",
    "name": "Fort Museum",
    "category": "Heritage & Historical",
    "entryType": "paid",
    "priceInfo": "\u20b925 - Indian Citizens",
    "area": "Fort St. George",
    "description": "Located in 1790 Exchange Building, houses 3,600+ colonial antiquities & 1947 first flag.",
    "famousFor": [
      "First Indian Tricolor Flag (Aug 15, 1947)",
      "Colonial British weapons & coins",
      "Oil portraits of Royal family"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM",
    "timings": "9:00 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Fort St. George Complex, Rajaji Salai, Chennai 600009",
    "lat": 13.0799,
    "lng": 80.2878,
    "icon": "\ud83d\udee1\ufe0f"
  },
  {
    "id": "chennai_st_marys_church",
    "name": "St. Mary's Church",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Fort St. George",
    "description": "Consecrated in 1680, oldest Anglican church east of Suez and oldest surviving British building.",
    "famousFor": [
      "Oldest Anglican Church in India (1680)",
      "Marriage site of Elihu Yale & Robert Clive",
      "Bomb-proof curved roof"
    ],
    "bestTimeToVisit": "10:00 AM - 4:00 PM",
    "timings": "10:00 AM - 5:00 PM",
    "locationAddress": "Inside Fort St. George, Rajaji Salai, Chennai 600009",
    "lat": 13.0788,
    "lng": 80.2869,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_wellesley_house",
    "name": "Wellesley House",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Fort St. George",
    "description": "Historic 1798 building named after Governor-General Richard Wellesley, featuring 60-foot hall.",
    "famousFor": [
      "Named after Lord Wellesley",
      "Colonial banquet hall heritage",
      "Located inside Fort St. George"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "Daytime view",
    "locationAddress": "Fort St. George, Chennai 600009",
    "lat": 13.0792,
    "lng": 80.2875,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_flagstaff_fort_st_george",
    "name": "Flagstaff at Fort St. George",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Fort St. George",
    "description": "Historic 150-foot teakwood flagstaff site, where Indian Tricolor was hoisted on Aug 15, 1947.",
    "famousFor": [
      "Tallest teakwood flagstaff historically",
      "Hoisting site of 1947 Independence flag",
      "Overlooks Fort ramparts"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "9:00 AM - 5:00 PM",
    "locationAddress": "Fort St. George Ramparts, Chennai 600009",
    "lat": 13.079,
    "lng": 80.287,
    "icon": "\ud83d\udea9"
  },
  {
    "id": "chennai_madras_high_court",
    "name": "Madras High Court",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "George Town",
    "description": "Established in 1862, 2nd largest judicial court complex in world with Indo-Saracenic arches.",
    "famousFor": [
      "World's 2nd largest court complex",
      "Indo-Saracenic red brick arches & domes",
      "1844 lighthouse tower inside campus"
    ],
    "bestTimeToVisit": "9:00 AM - 11:00 AM & 4:00 PM - 6:00 PM",
    "timings": "10:00 AM - 5:00 PM",
    "locationAddress": "High Court Rd, George Town, Chennai 600104",
    "lat": 13.0878,
    "lng": 80.2858,
    "icon": "\u2696\ufe0f"
  },
  {
    "id": "chennai_armenian_church",
    "name": "Armenian Church",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Parrys",
    "description": "Built in 1712, famous for its distinct belfry housing 6 heavy brass bells and courtyard.",
    "famousFor": [
      "6 heavy brass bells belfry tower",
      "Lush courtyard & Armenian graveyard",
      "Testament to early international trade"
    ],
    "bestTimeToVisit": "9:30 AM - 1:00 PM",
    "timings": "9:00 AM - 2:00 PM",
    "locationAddress": "Armenian Street, George Town, Chennai 600001",
    "lat": 13.0883,
    "lng": 80.2838,
    "icon": "\ud83d\udd14"
  },
  {
    "id": "chennai_ripon_building",
    "name": "Ripon Building",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Park Town",
    "description": "Iconic snow-white Neo-Classical palace built in 1913, seat of Greater Chennai Corporation.",
    "famousFor": [
      "Neo-Classical white facade & 132-ft clock",
      "Seat of Greater Chennai Corporation",
      "Stunning night floodlighting"
    ],
    "bestTimeToVisit": "5:30 PM - 8:00 PM (Night Illumination)",
    "timings": "Exterior view 24/7",
    "locationAddress": "Sydenhams Rd, Park Town, Chennai 600003",
    "lat": 13.0819,
    "lng": 80.2727,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_victoria_public_hall",
    "name": "Victoria Public Hall",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Park Town",
    "description": "Built in 1888 for Queen Victoria's Golden Jubilee, hosted speeches by Swami Vivekananda.",
    "famousFor": [
      "Victorian-Romanesque red brick architecture",
      "Swami Vivekananda speech venue in 1897",
      "Birthplace of South Indian theatre"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "Daytime viewing",
    "locationAddress": "EVR Periyar Salai, Park Town, Chennai 600003",
    "lat": 13.0825,
    "lng": 80.2736,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_chennai_central_railway_station",
    "name": "Chennai Central Railway Station",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Public Access",
    "area": "Park Town",
    "description": "Opened in 1873, iconic Gothic-Romanesque red brick building with 136-year clock tower.",
    "famousFor": [
      "Gothic-Romanesque red facade & clock tower",
      "Most iconic Chennai landmark photo spot",
      "Busiest rail hub in South India"
    ],
    "bestTimeToVisit": "6:00 PM - 9:00 PM (Illumination)",
    "timings": "Open 24/7",
    "locationAddress": "EVR Periyar Salai, Park Town, Chennai 600003",
    "lat": 13.0827,
    "lng": 80.2757,
    "icon": "\ud83d\ude82"
  },
  {
    "id": "chennai_royapuram_railway_station",
    "name": "Royapuram Railway Station",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Public Access",
    "area": "Royapuram",
    "description": "Opened on 1 July 1856, oldest surviving railway station in Indian subcontinent.",
    "famousFor": [
      "Oldest functional railway station in India",
      "Colonial red arches & wooden trusses",
      "First railway line in South India"
    ],
    "bestTimeToVisit": "8:00 AM - 11:00 AM",
    "timings": "Open 24/7",
    "locationAddress": "Station Rd, Royapuram, Chennai 600013",
    "lat": 13.1027,
    "lng": 80.2942,
    "icon": "\ud83d\ude86"
  },
  {
    "id": "chennai_valluvar_kottam",
    "name": "Valluvar Kottam",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Nungambakkam",
    "description": "39-meter stone temple chariot monument honoring Tamil poet-philosopher Thiruvalluvar.",
    "famousFor": [
      "39-meter high stone chariot monument",
      "All 1,330 couplets of Thirukkural carved",
      "Asia's largest pillarless auditorium"
    ],
    "bestTimeToVisit": "9:00 AM - 11:00 AM & 4:00 PM - 6:00 PM",
    "timings": "8:00 AM - 6:00 PM",
    "locationAddress": "Valluvar Kottam High Rd, Nungambakkam, Chennai 600034",
    "lat": 13.0583,
    "lng": 80.2428,
    "icon": "\ud83d\udcdc"
  },
  {
    "id": "chennai_vivekananda_house",
    "name": "Vivekananda House",
    "category": "Heritage & Historical",
    "entryType": "paid",
    "priceInfo": "\u20b920 - Adults, \u20b910 - Children",
    "area": "Triplicane",
    "description": "Historic 1842 Ice House building where Swami Vivekananda stayed in 1897.",
    "famousFor": [
      "1842 Ice House architectural heritage",
      "Room where Swami Vivekananda stayed",
      "Interactive 3D & Holographic exhibits"
    ],
    "bestTimeToVisit": "10:00 AM - 12:30 PM & 4:00 PM - 7:00 PM",
    "timings": "10:00 AM - 12:30 PM & 3:00 PM - 7:15 PM (Closed Mondays)",
    "locationAddress": "Kamaraajar Salai, Triplicane, Chennai 600005",
    "lat": 13.0531,
    "lng": 80.2803,
    "icon": "\ud83d\udd49\ufe0f"
  },
  {
    "id": "chennai_senate_house",
    "name": "Senate House",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Chepauk",
    "description": "Designed by Robert Chisholm in 1879, Indo-Saracenic masterpiece with colorful domes.",
    "famousFor": [
      "Robert Chisholm architectural landmark",
      "Colorful onion domes & Moorish arches",
      "Overlooking Marina oceanfront"
    ],
    "bestTimeToVisit": "4:00 PM - 6:30 PM",
    "timings": "Daytime viewing",
    "locationAddress": "University of Madras Campus, Chepauk, Chennai 600005",
    "lat": 13.0664,
    "lng": 80.2818,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_chepauk_palace",
    "name": "Chepauk Palace",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Chepauk",
    "description": "Built in 1768, earliest building constructed in Indo-Saracenic style in India.",
    "famousFor": [
      "First Indo-Saracenic building in India",
      "Official residence of Nawabs of Arcot",
      "Kalsa Mahal & Humayun Mahal towers"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "Daytime viewing",
    "locationAddress": "Chepauk, Triplicane, Chennai 600005",
    "lat": 13.0628,
    "lng": 80.2801,
    "icon": "\ud83c\udff0"
  },
  {
    "id": "chennai_university_of_madras",
    "name": "University of Madras",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Exterior View",
    "area": "Chepauk",
    "description": "Established in 1857, one of the 3 oldest modern universities in India.",
    "famousFor": [
      "One of India's 3 oldest universities",
      "Alma mater of C.V. Raman & Chandrasekhar",
      "Seaside academic heritage campus"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "Daytime access",
    "locationAddress": "Chepauk, Triplicane, Chennai 600005",
    "lat": 13.0655,
    "lng": 80.281,
    "icon": "\ud83c\udfeb"
  },
  {
    "id": "chennai_victory_war_memorial",
    "name": "Victory War Memorial",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Circular marble monument at start of Marina Beach honoring soldiers of World Wars.",
    "famousFor": [
      "Honoring martyrs of World Wars & Indo-Pak wars",
      "Eternal flame & marble pillar",
      "Located at Island Grounds entry"
    ],
    "bestTimeToVisit": "8:00 AM - 11:00 AM & 4:00 PM - 6:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Flag Staff Road, Near RBI, Chennai 600009",
    "lat": 13.0769,
    "lng": 80.2861,
    "icon": "\ud83c\udf96\ufe0f"
  },
  {
    "id": "chennai_mgr_memorial",
    "name": "MGR Memorial",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Marina",
    "description": "8.25-acre beachfront memorial honoring former CM Dr. M.G. Ramachandran.",
    "famousFor": [
      "Iconic winged Pegasus entrance arch",
      "MGR museum displaying caps, cars & awards",
      "Adjacent Jayalalithaa Phoenix memorial"
    ],
    "bestTimeToVisit": "4:00 PM - 8:00 PM",
    "timings": "6:00 AM - 9:00 PM",
    "locationAddress": "Kamaraajar Salai, Marina Beach, Chennai 600005",
    "lat": 13.0642,
    "lng": 80.2831,
    "icon": "\ud83d\udd4a\ufe0f"
  },
  {
    "id": "chennai_anna_memorial",
    "name": "Anna Memorial",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Marina",
    "description": "Tranquil mausoleum and park honoring former Chief Minister C.N. Annadurai.",
    "famousFor": [
      "Elephant trunk entry gateway",
      "Manicured lawns & beachside promenade",
      "Museum honoring Anna's speeches"
    ],
    "bestTimeToVisit": "4:30 PM - 8:00 PM",
    "timings": "6:00 AM - 9:00 PM",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.0658,
    "lng": 80.2839,
    "icon": "\ud83c\udf3f"
  },
  {
    "id": "chennai_kamarajar_memorial",
    "name": "Kamarajar Memorial",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Guindy",
    "description": "Memorial dedicated to K. Kamaraj, former CM of TN and Kingmaker of Indian politics.",
    "famousFor": [
      "Photographic archive of Kamaraj's life",
      "Humble lifestyle display & personal items",
      "Located in Gandhi Mandapam complex"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "9:00 AM - 5:30 PM",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600025",
    "lat": 13.0075,
    "lng": 80.2365,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_rajaji_memorial",
    "name": "Rajaji Memorial",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Guindy",
    "description": "Memorial built in honor of C. Rajagopalachari (Rajaji), last Governor-General of India.",
    "famousFor": [
      "Honoring India's last Governor-General",
      "Historical photo gallery & Gandhi letters",
      "Quiet garden setting"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "9:00 AM - 5:30 PM",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600025",
    "lat": 13.0072,
    "lng": 80.2358,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_gandhi_mandapam",
    "name": "Gandhi Mandapam",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Guindy",
    "description": "Dravidian temple-style memorial built to house urn of Mahatma Gandhi's ashes.",
    "famousFor": [
      "Dravidian temple gopuram style structure",
      "Acoustic design with Oct 2 sunlight focus",
      "Lush park setting next to Guindy Zoo"
    ],
    "bestTimeToVisit": "8:00 AM - 11:00 AM & 4:00 PM - 6:00 PM",
    "timings": "6:00 AM - 7:00 PM",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600025",
    "lat": 13.0078,
    "lng": 80.2361,
    "icon": "\ud83d\udd4a\ufe0f"
  },
  {
    "id": "chennai_madras_war_cemetery",
    "name": "Madras War Cemetery",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Nandanam",
    "description": "Commonwealth War Graves Commission cemetery housing 855 WW2 soldiers' graves.",
    "famousFor": [
      "Commonwealth War Graves Commission site",
      "Immaculate manicured lawns & stone cross",
      "Serene atmosphere of remembrance"
    ],
    "bestTimeToVisit": "8:00 AM - 11:00 AM & 3:30 PM - 5:00 PM",
    "timings": "8:00 AM - 5:00 PM (Mon-Fri)",
    "locationAddress": "Mount Poonamallee Rd, Nandambakkam, Chennai 600089",
    "lat": 13.0189,
    "lng": 80.1836,
    "icon": "\ud83c\udf96\ufe0f"
  },
  {
    "id": "chennai_st_thomas_mount",
    "name": "St. Thomas Mount",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "St. Thomas Mount",
    "description": "Serene hill where Saint Thomas was martyred in 72 AD, offering 360 aerial views.",
    "famousFor": [
      "360-degree aerial views of Chennai city",
      "134 stone steps with Stations of Cross",
      "Airport runway viewing point"
    ],
    "bestTimeToVisit": "4:30 PM - 7:00 PM (Sunset)",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "St. Thomas Mount, Chennai 600016",
    "lat": 13.0039,
    "lng": 80.1925,
    "icon": "\u26f0\ufe0f"
  },
  {
    "id": "chennai_chintadripet_heritage_area",
    "name": "Chintadripet Heritage Area",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Street Walk",
    "area": "Chintadripet",
    "description": "Historic weaver village established in 1730s along Cooum River bank.",
    "famousFor": [
      "18th century handloom weaver village history",
      "Historic market lanes & temples",
      "Cooum river heritage stretch"
    ],
    "bestTimeToVisit": "9:00 AM - 6:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Chintadripet, Chennai 600002",
    "lat": 13.0722,
    "lng": 80.2711,
    "icon": "\ud83c\udfd8\ufe0f"
  },
  {
    "id": "chennai_marina_memorial_zone",
    "name": "Marina Memorial Zone",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Public Walk",
    "area": "Marina",
    "description": "Beachfront memorial plaza containing MGR, Anna, Jayalalithaa & Karunanidhi memorials.",
    "famousFor": [
      "Beachfront memorial park complex",
      "Aesthetic fountains & sea promenade",
      "Major political history of Tamil Nadu"
    ],
    "bestTimeToVisit": "4:30 PM - 8:30 PM",
    "timings": "6:00 AM - 9:00 PM",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.065,
    "lng": 80.2835,
    "icon": "\ud83d\udd4a\ufe0f"
  },
  {
    "id": "chennai_napier_bridge",
    "name": "Napier Bridge",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Built in 1869 over Cooum river mouth, illuminated chess-board painted iconic bridge.",
    "famousFor": [
      "Iconic chess-pattern painted structure",
      "Stunning LED night illumination",
      "Connects Fort St George to Marina"
    ],
    "bestTimeToVisit": "6:30 PM - 10:00 PM (LED Illumination)",
    "timings": "Open 24/7",
    "locationAddress": "Napier Bridge, Kamaraajar Salai, Chennai 600009",
    "lat": 13.0712,
    "lng": 80.2856,
    "icon": "\ud83c\udf09"
  },
  {
    "id": "chennai_gandhi_statue_marina",
    "name": "Gandhi Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Black bronze statue of Mahatma Gandhi during Salt March, sculpted by Debi Prasad Roy Chowdhury.",
    "famousFor": [
      "Famous Salt March bronze statue",
      "Sculpted by Debi Prasad Roy Chowdhury",
      "Iconic Republic Day parade location"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.0545,
    "lng": 80.2812,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_triumph_of_labour_statue",
    "name": "Triumph of Labour Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Historic bronze statue at Marina Beach depicting 4 workers moving a rock, installed May 1, 1959.",
    "famousFor": [
      "First May Day memorial statue in India",
      "Masterpiece by Debi Prasad Roy Chowdhury",
      "Located at northern tip of Marina"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.0695,
    "lng": 80.2852,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_kannagi_statue",
    "name": "Kannagi Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Bronze statue of Tamil epic heroine Kannagi holding her anklet (Silappatikaram).",
    "famousFor": [
      "Heroine of Tamil epic Silappatikaram",
      "Symbol of justice and Tamil culture",
      "Marina Beach promenade landmark"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.061,
    "lng": 80.2825,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_thiruvalluvar_statue_marina",
    "name": "Thiruvalluvar Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Statue of revered Tamil saint-poet Thiruvalluvar on Marina promenade.",
    "famousFor": [
      "Honoring author of Thirukkural",
      "Tamil literary heritage statue",
      "Marina beach promenade site"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.058,
    "lng": 80.282,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_bharathiyar_statue",
    "name": "Bharathiyar Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Statue of revolutionary Tamil poet and freedom fighter Mahakavi Subramania Bharathi.",
    "famousFor": [
      "Honoring Mahakavi Subramania Bharathi",
      "Patriotic Tamil poetry heritage",
      "Marina promenade landmark"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.056,
    "lng": 80.2815,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_avvaiyar_statue",
    "name": "Avvaiyar Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Statue honoring legendary ancient Tamil female poet Avvaiyar on Marina promenade.",
    "famousFor": [
      "Honoring ancient Tamil woman poet Avvaiyar",
      "Symbol of wisdom and Tamil literature",
      "Marina promenade site"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Marina Beach Promenade, Triplicane, Chennai 600005",
    "lat": 13.052,
    "lng": 80.2808,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_periyar_statue",
    "name": "Periyar Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Marina",
    "description": "Statue of social reformer Thanthai Periyar E.V. Ramasamy.",
    "famousFor": [
      "Honoring Thanthai Periyar",
      "Self-Respect Movement leader",
      "Prominent Chennai landmark"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Anna Salai / Marina junction, Chennai 600002",
    "lat": 13.068,
    "lng": 80.278,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_anna_statue",
    "name": "Anna Statue",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Anna Salai/Marina area",
    "description": "Statue of former CM C.N. Annadurai at major Anna Salai intersection.",
    "famousFor": [
      "Honoring C.N. Annadurai (Anna)",
      "Iconic Anna Salai landmark",
      "Symbol of Dravidian movement"
    ],
    "bestTimeToVisit": "5:00 AM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Anna Salai / Cathedral Rd Junction, Chennai 600006",
    "lat": 13.055,
    "lng": 80.254,
    "icon": "\ud83d\uddff"
  },
  {
    "id": "chennai_chennai_city_view_tour",
    "name": "Chennai City View",
    "category": "Heritage & Historical",
    "entryType": "free",
    "priceInfo": "Free Drive/Walk",
    "area": "Central Chennai",
    "description": "Panoramas of British colonial & modern architecture along Anna Salai & Kamarajar Salai.",
    "famousFor": [
      "Central heritage boulevard drive",
      "Indo-Saracenic & modern skyline",
      "Colonial clock towers & bridges"
    ],
    "bestTimeToVisit": "5:30 PM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Anna Salai & Kamarajar Salai, Central Chennai",
    "lat": 13.06,
    "lng": 80.27,
    "icon": "\ud83c\udfd9\ufe0f"
  },
  {
    "id": "chennai_kapaleeshwarar_temple",
    "name": "Kapaleeshwarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "7th-century Dravidian masterpiece dedicated to Lord Shiva & Goddess Karpagambal.",
    "famousFor": [
      "Dravidian Gopuram architectural grandeur",
      "Annual Panguni Peruvizha festival",
      "Sacred Temple Tank (Kulam)"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "5:30 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "12, Vinayakar St, Mylapore, Chennai 600004",
    "lat": 13.0334,
    "lng": 80.2697,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_parthasarathy_temple",
    "name": "Parthasarathy Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Triplicane",
    "description": "8th-century Pallava Vaishnavite temple dedicated to Lord Krishna with mustache deity.",
    "famousFor": [
      "Deity of Krishna with mustache & scars",
      "Glorified in Divya Prabandha",
      "Delicious Temple Prasad (Pongal)"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "5:30 AM - 12:30 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Car St, Triplicane, Chennai 600005",
    "lat": 13.0537,
    "lng": 80.2764,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_vadapalani_murugan_temple",
    "name": "Vadapalani Murugan Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Vadapalani",
    "description": "Built in late 19th century, famous shrine for Lord Murugan & traditional weddings.",
    "famousFor": [
      "Standing posture deity of Lord Murugan",
      "Spacious Rajagopuram",
      "Popular traditional wedding venue"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "5:00 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Palani Andavar Koil St, Vadapalani, Chennai 600026",
    "lat": 13.0519,
    "lng": 80.2131,
    "icon": "\ud83d\udd49\ufe0f"
  },
  {
    "id": "chennai_ashtalakshmi_temple",
    "name": "Ashtalakshmi Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Besant Nagar",
    "description": "Multi-tiered beachfront temple dedicated to the 8 forms of Goddess Lakshmi.",
    "famousFor": [
      "Multi-tiered layout with 8 shrines",
      "Oceanfront location on Elliot's Beach",
      "Sound of waves echoing inside"
    ],
    "bestTimeToVisit": "6:30 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "6:30 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Beach Road, Besant Nagar, Chennai 600090",
    "lat": 12.9977,
    "lng": 80.2694,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_marundeeswarar_temple",
    "name": "Marundeeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Thiruvanmiyur",
    "description": "Ancient Chola temple dedicated to Lord Shiva as the God of Healing (Medicine).",
    "famousFor": [
      "Associated with Sage Agastya & healing",
      "Chola granite pillars & inscriptions",
      "Serene temple complex"
    ],
    "bestTimeToVisit": "6:30 AM - 10:30 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:00 PM - 8:30 PM",
    "locationAddress": "Lalitha Nagar, Thiruvanmiyur, Chennai 600041",
    "lat": 12.9868,
    "lng": 80.2588,
    "icon": "\ud83c\udf3f"
  },
  {
    "id": "chennai_kalikambal_kamadeswarar_temple",
    "name": "Kalikambal Kamadeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "George Town",
    "description": "Historic temple visited incognito by Maratha ruler Chhatrapati Shivaji in 1677.",
    "famousFor": [
      "Visited by Chhatrapati Shivaji in 1677",
      "Located in historic Thambu Chetty Street",
      "Powerful merchant deity"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Thambu Chetty St, George Town, Chennai 600001",
    "lat": 13.0897,
    "lng": 80.2842,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_kandaswamy_temple",
    "name": "Kandaswamy Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "George Town",
    "description": "18th-century Lord Murugan temple located in Rasappa Chetty Street.",
    "famousFor": [
      "Historic George Town Murugan temple",
      "Intricate gopuram carvings",
      "Traditional flower market street"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Rasappa Chetty St, George Town, Chennai 600003",
    "lat": 13.0855,
    "lng": 80.2789,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_munda_kanni_amman_temple",
    "name": "Munda Kanni Amman Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Ancient Swayambhu Goddess temple dedicated to Mundagakanni Amman.",
    "famousFor": [
      "Self-manifested (Swayambhu) deity",
      "Bustling Tuesdays & Fridays worship",
      "Heritage Mylapore shrine"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Mundagakanni Amman Koil St, Mylapore, Chennai 600004",
    "lat": 13.0361,
    "lng": 80.2675,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_velleeswarar_temple",
    "name": "Velleeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Ancient Shiva temple associated with Sukracharya gaining sight in Mylapore.",
    "famousFor": [
      "Part of Mylapore Saptha Sthana temples",
      "Associated with Sukra (Venus) planet",
      "Quiet granite praharam"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "South Mada St, Mylapore, Chennai 600004",
    "lat": 13.0328,
    "lng": 80.2685,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_karaneeswarar_temple",
    "name": "Karaneeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Historic Shiva temple where Lord Shiva is worshipped as Karaneeswarar.",
    "famousFor": [
      "Saptha Sthana Shiva temple of Mylapore",
      "Peaceful inner courtyard",
      "Centuries old Chola inscriptions"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Bazaar Rd, Mylapore, Chennai 600004",
    "lat": 13.0315,
    "lng": 80.2645,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_virupakshiswarar_temple",
    "name": "Virupakshiswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Ancient Shiva temple built during Vijayanagara period in Mylapore.",
    "famousFor": [
      "Vijayanagara era architecture",
      "One of 7 sacred Mylapore Shiva temples",
      "Serene sacred tank"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Mundagakanni Amman Koil St, Mylapore, Chennai 600004",
    "lat": 13.0355,
    "lng": 80.2665,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_kapaleeshwarar_temple_tank",
    "name": "Kapaleeshwarar Temple Tank",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Mylapore",
    "description": "Majestic 16th-century stone temple tank (Kulam) surrounded by heritage streets.",
    "famousFor": [
      "Grand temple tank Float Festival (Theppotsavam)",
      "Colonnaded granite steps around tank",
      "Heart of Mylapore cultural hub"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 5:00 PM - 8:00 PM",
    "timings": "Open 24/7 exterior view",
    "locationAddress": "Kapaleeshwarar Tank, Mylapore, Chennai 600004",
    "lat": 13.033,
    "lng": 80.269,
    "icon": "\ud83c\udfde\ufe0f"
  },
  {
    "id": "chennai_thiruvetteeswarar_temple",
    "name": "Thiruvetteeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Triplicane",
    "description": "Ancient 1,000-year-old Shiva temple featuring a large temple tank in Triplicane.",
    "famousFor": [
      "1,000-year-old Chola-period shrine",
      "Grand temple tank in central Triplicane",
      "Glorified by Tamil saints"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Thiruvateeswaranpet, Triplicane, Chennai 600005",
    "lat": 13.0612,
    "lng": 80.2715,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_dhenupureeswarar_temple",
    "name": "Dhenupureeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Madambakkam",
    "description": "10th-century Chola granite temple built by King Parantaka Chola II.",
    "famousFor": [
      "10th-century Chola monolithic architecture",
      "Sculptures of Lord Shiva dancing Gajasamhara",
      "ASI protected national monument"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Madambakkam Main Rd, Madambakkam, Chennai 600126",
    "lat": 12.9056,
    "lng": 80.1625,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_thyagaraja_temple_tiruvottiyur",
    "name": "Thyagaraja Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Tiruvottiyur",
    "description": "2,000-year-old grand Paadal Petra Sthalam Shiva temple associate with Saint Sundarar.",
    "famousFor": [
      "Associated with Saint Sundarar & Pattinathar",
      "Rare Vadivudai Amman shrine",
      "Massive 2,000-year historical legacy"
    ],
    "bestTimeToVisit": "6:00 AM - 12:00 PM & 4:00 PM - 8:30 PM",
    "timings": "5:30 AM - 12:30 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Sannathi St, Tiruvottiyur, Chennai 600019",
    "lat": 13.1612,
    "lng": 80.3015,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_vadivudai_amman_temple",
    "name": "Vadivudai Amman Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Tiruvottiyur",
    "description": "Famed Goddess shrine inside Thyagaraja temple complex, known for Gnana (Wisdom).",
    "famousFor": [
      "Part of 3 famous Goddess shrines (Gnana)",
      "Powerful Friday prayers",
      "Ancient Chola bronze heritage"
    ],
    "bestTimeToVisit": "6:00 AM - 12:00 PM & 4:00 PM - 8:30 PM",
    "timings": "5:30 AM - 12:30 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Tiruvottiyur High Rd, Tiruvottiyur, Chennai 600019",
    "lat": 13.1615,
    "lng": 80.3018,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_ramanatheswarar_temple_porur",
    "name": "Ramanatheswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Porur",
    "description": "Ancient Shiva temple built by Lord Rama while traveling to Sri Lanka (Guru Sthalam).",
    "famousFor": [
      "Associated with Lord Rama's worship",
      "Navagraha Guru planet temple of Chennai",
      "Ancient Chola granite structure"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Eshwaran Koil St, Porur, Chennai 600116",
    "lat": 13.0358,
    "lng": 80.1585,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_nanganallur_anjaneya_temple",
    "name": "Anjaneya Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Nanganallur",
    "description": "Famous for its 32-foot single-granite monolithic idol of Lord Hanuman.",
    "famousFor": [
      "32-foot single-stone Hanuman monolithic idol",
      "Vennai (butter) & Vada garland pujas",
      "Vibrant Saturday devotion"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "5:00 AM - 12:00 PM & 4:30 PM - 9:00 PM",
    "locationAddress": "1st Main Rd, Nanganallur, Chennai 600061",
    "lat": 12.9808,
    "lng": 80.1914,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_dandeeswarar_temple",
    "name": "Dandeeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Velachery",
    "description": "1,000-year-old Chola Shiva temple where Lord Yama worshipped Shiva to regain his staff.",
    "famousFor": [
      "Associated with Lord Yama legend",
      "Chola stone inscriptions & large tank",
      "Historic heart of Velachery"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Dandeeswarar Koil St, Velachery, Chennai 600042",
    "lat": 12.9775,
    "lng": 80.2225,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_ayyappan_temple_anna_nagar",
    "name": "Ayyappan Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Anna Nagar",
    "description": "Famous Kerala-style Ayyappan temple constructed with teakwood and brass lamp posts.",
    "famousFor": [
      "Kerala traditional temple architecture",
      "Spacious brass Deepastambham pillar",
      "Mandala season pujas"
    ],
    "bestTimeToVisit": "5:30 AM - 10:30 AM & 5:00 PM - 8:30 PM",
    "timings": "5:00 AM - 11:00 AM & 4:30 PM - 8:30 PM",
    "locationAddress": "6th Avenue, Anna Nagar, Chennai 600040",
    "lat": 13.0885,
    "lng": 80.2185,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_mahalingapuram_ayyappan_temple",
    "name": "Mahalingapuram Ayyappan Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Nungambakkam",
    "description": "The first Lord Ayyappan temple built in Chennai, designed in authentic Kerala style.",
    "famousFor": [
      "First Ayyappan temple in Chennai (1974)",
      "Authentic Kerala wooden architecture",
      "Serene meditation hall"
    ],
    "bestTimeToVisit": "5:30 AM - 10:30 AM & 5:00 PM - 8:30 PM",
    "timings": "5:00 AM - 11:00 AM & 4:30 PM - 8:30 PM",
    "locationAddress": "18, Madhavan Nair Rd, Mahalingapuram, Chennai 600034",
    "lat": 13.0575,
    "lng": 80.2325,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_iskcon_temple_akkarai",
    "name": "ISKCON Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Akkarai",
    "description": "Largest Radha Krishna temple in Tamil Nadu spanning 1.5 acres on East Coast Road.",
    "famousFor": [
      "Largest ISKCON temple in TN",
      "White marble architecture & teakwood altars",
      "Govinda's vegetarian restaurant"
    ],
    "bestTimeToVisit": "7:30 AM - 12:30 PM & 4:30 PM - 8:30 PM",
    "timings": "7:30 AM - 1:00 PM & 4:00 PM - 8:30 PM",
    "locationAddress": "Injambakkam, ECR, Chennai 600115",
    "lat": 12.9248,
    "lng": 80.2503,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_jagannath_temple_kanathur",
    "name": "Jagannath Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Kanathur",
    "description": "Pristine white stone temple modeled after Puri Jagannath Temple, overlooking ECR sea.",
    "famousFor": [
      "Replica of Puri Jagannath Temple",
      "Carved black granite & white marble",
      "Ratha Yatra festival procession"
    ],
    "bestTimeToVisit": "6:30 AM - 11:30 AM & 4:30 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 3:30 PM - 8:30 PM",
    "locationAddress": "Kanathur, ECR, Chennai 603112",
    "lat": 12.8522,
    "lng": 80.2465,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_shirdi_sai_baba_temple_mylapore",
    "name": "Shirdi Sai Baba Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Built in 1952, headquarters of All India Sai Samaj, housing flame lit from Shirdi.",
    "famousFor": [
      "Headquarters of All India Sai Samaj",
      "Eternal Dhuni flame brought from Shirdi",
      "Thursday devotional crowding"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "5:30 AM - 1:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "VC Garden St, Mylapore, Chennai 600004",
    "lat": 13.0322,
    "lng": 80.2655,
    "icon": "\ud83d\udd49\ufe0f"
  },
  {
    "id": "chennai_chennakesava_perumal_temple",
    "name": "Chennakesava Perumal Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "George Town",
    "description": "Twin temple complex built in 1700s dedicated to Chennakesava & Chennamalleeswarar.",
    "famousFor": [
      "Town Temple of original Madras settlement",
      "Twin Vishnu & Shiva shrines",
      "George Town heritage market hub"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Devaraja Mudali St, Sowcarpet, Chennai 600003",
    "lat": 13.0872,
    "lng": 80.2778,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_kesava_perumal_temple_mylapore",
    "name": "Kesava Perumal Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Ancient Vishnu temple in Mylapore dedicated to Lord Kesava Perumal & Mayuravalli Thayar.",
    "famousFor": [
      "Ancient Vaishnavite temple of Mylapore",
      "Birthplace of Peyalvar saint",
      "Serene inner praharam"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Kesava Perumal Sannathi St, Mylapore, Chennai 600004",
    "lat": 13.0348,
    "lng": 80.2658,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_adikesava_perumal_temple_mylapore",
    "name": "Adikesava Perumal Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Centuries old temple dedicated to Adikesava Perumal & Bhootathalvar birthplace shrine.",
    "famousFor": [
      "Birthplace of Bhootathalvar",
      "Intricate granite mandapams",
      "Mylapore heritage procession site"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Ashtabujam St, Mylapore, Chennai 600004",
    "lat": 13.0358,
    "lng": 80.2688,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_araikasu_amman_temple",
    "name": "Araikasu Amman Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Chennai",
    "description": "Unique Goddess temple where devotees offer half-coin (Araikasu) prayers for lost items.",
    "famousFor": [
      "Unique half-coin offering tradition",
      "Worshipped for finding lost articles",
      "Popular local devotion"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Ratna Nagar, Teynampet, Chennai 600018",
    "lat": 13.0425,
    "lng": 80.2458,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_devi_karumariamman_thiruverkadu",
    "name": "Devi Karumariamman Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Thiruverkadu",
    "description": "Major Goddess pilgrimage temple in TN featuring 108-foot Rajagopuram & silver chariot.",
    "famousFor": [
      "108-foot towering Rajagopuram",
      "Silver Chariot procession",
      "Holy anthill Valmiki shrine"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 4:00 PM - 8:30 PM",
    "timings": "5:00 AM - 9:00 PM",
    "locationAddress": "Sannathi St, Thiruverkadu, Chennai 600077",
    "lat": 13.0719,
    "lng": 80.1245,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_pachai_amman_temple_mangadu",
    "name": "Pachai Amman Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mangadu",
    "description": "Ancient Goddess temple dedicated to Pachai Amman (Goddess of Greenery & Nature).",
    "famousFor": [
      "Goddess of nature & green energy",
      "Seven Munis terracotta statues",
      "Serene peaceful grove"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 4:30 PM - 8:00 PM",
    "timings": "6:00 AM - 1:00 PM & 3:30 PM - 9:00 PM",
    "locationAddress": "Mangadu, Chennai 600122",
    "lat": 13.041,
    "lng": 80.1158,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_prathyangira_devi_sholinganallur",
    "name": "Prathyangira Devi Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Sholinganallur",
    "description": "Famous temple dedicated to Goddess Prathyangira featuring lion-headed deity & chili homam.",
    "famousFor": [
      "Lion-headed Prathyangira Devi deity",
      "Midnight Nikumbala Yagna (Chili Homam)",
      "Protection & power prayers"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 4:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:00 PM - 8:30 PM",
    "locationAddress": "Prathyangira St, Sholinganallur, Chennai 600119",
    "lat": 12.9015,
    "lng": 80.2285,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_ttd_temple_tnagar",
    "name": "Tirumala Tirupati Devasthanam Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Official TTD Chennai shrine of Lord Venkateswara (Tirupati Balaji) in Venkatanarayana Road.",
    "famousFor": [
      "Official TTD Balaji shrine in Chennai",
      "Tirupati Laddu prasad counter",
      "Vibrant daily Suprabhatam & Pujas"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 4:00 PM - 8:30 PM",
    "timings": "5:30 AM - 12:00 PM & 4:00 PM - 9:00 PM",
    "locationAddress": "Venkatanarayana Rd, T. Nagar, Chennai 600017",
    "lat": 13.0385,
    "lng": 80.2355,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_varasiddhi_vinayaka_besant_nagar",
    "name": "Varasiddhi Vinayaka Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Besant Nagar",
    "description": "Vibrant Lord Ganesha temple located in the heart of Besant Nagar neighborhood.",
    "famousFor": [
      "Lord Ganesha shrine with silver armor",
      "Ganesh Chaturthi grand festival",
      "Besant Nagar community hub"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:30 PM",
    "timings": "5:30 AM - 11:30 AM & 4:30 PM - 8:30 PM",
    "locationAddress": "Customs Colony, Besant Nagar, Chennai 600090",
    "lat": 12.9988,
    "lng": 80.2648,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_sri_venkateswara_swamy_tnagar",
    "name": "Sri Venkateswara Swamy Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Prominent Lord Balaji temple located on North Boag Road in T. Nagar.",
    "famousFor": [
      "Serene Lord Venkateswara idol",
      "Popular devotional stop for shoppers",
      "Pure ghee prasadam"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "North Boag Rd, T. Nagar, Chennai 600017",
    "lat": 13.0452,
    "lng": 80.2388,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_gangadeeswarar_temple_purasawalkam",
    "name": "Gangadeeswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Purasawalkam",
    "description": "Ancient Shiva temple featuring a sacred perennial water spring well (Ganga Kulam).",
    "famousFor": [
      "Sacred perennial spring well",
      "Associated with Bhagiratha legend",
      "Purasawalkam cultural landmark"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Gangadeeswarar Koil St, Purasawalkam, Chennai 600084",
    "lat": 13.0888,
    "lng": 80.2588,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_tiruvalithayam_tiruvalleswarar_padi",
    "name": "Tiruvalithayam Tiruvalleswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Padi",
    "description": "Ancient Paadal Petra Sthalam Shiva temple where Lord Guru (Jupiter) worshipped Shiva.",
    "famousFor": [
      "Navagraha Guru Sthalam of Chennai",
      "Paadal Petra Sthalam Chola temple",
      "Gajapristha shaped vimanam"
    ],
    "bestTimeToVisit": "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Padi, Chennai 600050",
    "lat": 13.0988,
    "lng": 80.1855,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_ekambareswarar_temple_mint_st",
    "name": "Ekambareswarar Temple",
    "category": "Hindu Temples",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Kanchipuram Road area",
    "description": "1680s heritage Shiva temple built by Alangatha Pillai in Sowcarpet / Mint Street.",
    "famousFor": [
      "1680s East India Company era temple",
      "Grand 9-tier Rajagopuram",
      "Mint Street heritage hub"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:30 PM",
    "timings": "6:00 AM - 12:00 PM & 4:30 PM - 8:30 PM",
    "locationAddress": "Mint Street, Sowcarpet, Chennai 600079",
    "lat": 13.0912,
    "lng": 80.2785,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_st_thomas_mount_church",
    "name": "St. Thomas Mount Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "St. Thomas Mount",
    "description": "Hilltop shrine built in 1523 over site of St. Thomas martyrdom with Bleeding Cross.",
    "famousFor": [
      "Bleeding Cross carved by Saint Thomas",
      "360-degree panoramic view of Chennai",
      "Painting of Mary by Saint Luke"
    ],
    "bestTimeToVisit": "4:30 PM - 7:00 PM",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "St. Thomas Mount, Chennai 600016",
    "lat": 13.0039,
    "lng": 80.1925,
    "icon": "\u26f0\ufe0f"
  },
  {
    "id": "chennai_san_thome_basilica",
    "name": "San Thome Cathedral Basilica",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Santhome",
    "description": "Neo-Gothic Basilica built over the tomb of St. Thomas the Apostle, who arrived in 52 AD.",
    "famousFor": [
      "Tomb of Saint Thomas the Apostle inside crypt",
      "155-foot soaring Neo-Gothic spire",
      "Stained glass windows & museum"
    ],
    "bestTimeToVisit": "7:00 AM - 12:00 PM & 4:00 PM - 7:00 PM",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "38, San Thome High Rd, Mylapore, Chennai 600004",
    "lat": 13.0337,
    "lng": 80.2778,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_luz_church",
    "name": "Luz Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Built in 1516 by Portuguese mariners, one of oldest European structures in mainland India.",
    "famousFor": [
      "Built in 1516 by Portuguese sailors",
      "Baroque interior with gilt altars",
      "Legendary guiding light story"
    ],
    "bestTimeToVisit": "7:00 AM - 11:00 AM & 4:00 PM - 7:00 PM",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "Luz Church Rd, Mylapore, Chennai 600004",
    "lat": 13.0369,
    "lng": 80.2642,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_our_lady_of_light_church",
    "name": "Our Lady of Light Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Also known as Luz Church, celebrated for its 500+ years of active Catholic heritage.",
    "famousFor": [
      "500+ years of active worship",
      "Portuguese colonial architectural facade",
      "Quiet spiritual ambiance"
    ],
    "bestTimeToVisit": "7:00 AM - 11:00 AM & 4:00 PM - 7:00 PM",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "Luz Church Rd, Mylapore, Chennai 600004",
    "lat": 13.037,
    "lng": 80.2645,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_st_andrews_church_kirk",
    "name": "St. Andrew's Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Egmore",
    "description": "Opened in 1821 for Scottish community, finest Georgian Neo-Classical church in Asia.",
    "famousFor": [
      "Pure circular dome on 16 Ionic columns",
      "1883 imported Yorkshire pipe organ",
      "167-foot soaring steeple"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM",
    "timings": "9:00 AM - 5:00 PM",
    "locationAddress": "Poonamallee High Rd, Egmore, Chennai 600008",
    "lat": 13.0781,
    "lng": 80.2625,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_st_georges_cathedral",
    "name": "St. George's Cathedral",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Cathedral Road",
    "description": "Opened in 1815, 139-foot spire white cathedral, mother church of Church of South India.",
    "famousFor": [
      "Mother church of Church of South India",
      "Pristine white Georgian architecture",
      "Spacious leafy courtyard gardens"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM & 4:00 PM - 6:00 PM",
    "timings": "7:00 AM - 6:30 PM",
    "locationAddress": "224, Cathedral Rd, Gopalapuram, Chennai 600086",
    "lat": 13.0514,
    "lng": 80.2522,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_annai_velankanni_shrine",
    "name": "Annai Velankanni Shrine",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Besant Nagar",
    "description": "Beachfront Catholic pilgrimage shrine dedicated to Our Lady of Good Health.",
    "famousFor": [
      "Seaside pilgrimage shrine on Elliot's Beach",
      "Annual September feast procession",
      "Candle lighting chapels"
    ],
    "bestTimeToVisit": "7:00 AM - 12:00 PM & 4:30 PM - 8:00 PM",
    "timings": "6:00 AM - 8:30 PM",
    "locationAddress": "Besant Nagar Beachfront, Chennai 600090",
    "lat": 13.0019,
    "lng": 80.2689,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_st_matthias_church_vepery",
    "name": "St. Matthias Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Vepery",
    "description": "Consecrated in 1823, one of Chennai's oldest Protestant churches built in Gothic style.",
    "famousFor": [
      "1823 colonial Gothic architecture",
      "Stained glass alter windows",
      "Historic Vepery parish heritage"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM",
    "timings": "8:00 AM - 6:00 PM",
    "locationAddress": "Vepery High Rd, Vepery, Chennai 600007",
    "lat": 13.0898,
    "lng": 80.2655,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_thousand_lights_church",
    "name": "Thousand Lights Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Thousand Lights",
    "description": "Historic St. George's parish chapel located in Thousand Lights area.",
    "famousFor": [
      "Quiet urban parish sanctuary",
      "Colonial wooden pews & stained glass",
      "Located near Anna Salai"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM",
    "timings": "8:00 AM - 6:00 PM",
    "locationAddress": "Thousand Lights, Chennai 600006",
    "lat": 13.056,
    "lng": 80.252,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_st_patricks_church_mount",
    "name": "St. Patrick's Anglo-Indian Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "St. Thomas Mount",
    "description": "150-year-old historic church established for British military garrison and local parish.",
    "famousFor": [
      "Colonial military garrison parish",
      "High wooden arches & belfry",
      "St. Thomas Mount foot shrine"
    ],
    "bestTimeToVisit": "8:00 AM - 12:00 PM",
    "timings": "7:00 AM - 7:00 PM",
    "locationAddress": "St. Thomas Mount, Chennai 600016",
    "lat": 13.0025,
    "lng": 80.1945,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_sacred_heart_shrine_perambur",
    "name": "Sacred Heart Shrine",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Perambur",
    "description": "Spacious Catholic shrine built in 1954 featuring high arched dome and quiet prayer hall.",
    "famousFor": [
      "Striking circular dome design",
      "Perambur Catholic community hub",
      "Lush peaceful courtyard"
    ],
    "bestTimeToVisit": "8:00 AM - 12:00 PM & 4:30 PM - 7:30 PM",
    "timings": "6:00 AM - 8:00 PM",
    "locationAddress": "Sembium, Perambur, Chennai 600011",
    "lat": 13.1085,
    "lng": 80.2355,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_csi_wesley_church_egmore",
    "name": "CSI Wesley Church",
    "category": "Churches",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Egmore",
    "description": "Built in 1853 by Wesleyan missionaries, features classic red brick Gothic architecture.",
    "famousFor": [
      "1853 red brick Gothic facade",
      "Historic Wesleyan mission center",
      "Quiet leafy courtyard"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM",
    "timings": "8:00 AM - 6:00 PM",
    "locationAddress": "Poonamallee High Rd, Egmore, Chennai 600008",
    "lat": 13.0768,
    "lng": 80.2598,
    "icon": "\u26ea"
  },
  {
    "id": "chennai_thousand_lights_mosque",
    "name": "Thousand Lights Mosque",
    "category": "Mosques",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Thousand Lights",
    "description": "Multi-domed Shia mosque built in 1810 with twin 64-foot minarets and 1,000 oil lamps history.",
    "famousFor": [
      "Classic medieval Islamic architecture",
      "Twin 64-foot minarets & central assembly",
      "Historically illuminated by 1,000 lamps"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM & 4:00 PM - 6:30 PM",
    "timings": "5:30 AM - 8:30 PM",
    "locationAddress": "Anna Salai, Thousand Lights, Chennai 600006",
    "lat": 13.0567,
    "lng": 80.2525,
    "icon": "\ud83d\udd4c"
  },
  {
    "id": "chennai_mount_road_dargah",
    "name": "Mount Road Dargah",
    "category": "Mosques",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Anna Salai",
    "description": "Historic Sufi shrine of Syed Moosa Shah Qadri Baghdadi on Anna Salai.",
    "famousFor": [
      "Revered 150-year Sufi Dargah",
      "Spiritual harmony hub visited by all faiths",
      "Located on busy Anna Salai boulevard"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM & 4:00 PM - 8:00 PM",
    "timings": "5:00 AM - 9:30 PM",
    "locationAddress": "Anna Salai, Near EA Mall, Chennai 600002",
    "lat": 13.0612,
    "lng": 80.2628,
    "icon": "\ud83d\udd4c"
  },
  {
    "id": "chennai_periamet_mosque",
    "name": "Periamet Mosque",
    "category": "Mosques",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Periamet",
    "description": "18th-century Arcot Nawab era mosque featuring majestic minarets in leather market hub.",
    "famousFor": [
      "Arcot Nawab period Islamic architecture",
      "Twin soaring minarets & marble courtyard",
      "Periamet market landmark"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM & 4:00 PM - 6:00 PM",
    "timings": "5:00 AM - 9:00 PM",
    "locationAddress": "Periamet, Park Town, Chennai 600003",
    "lat": 13.0845,
    "lng": 80.2715,
    "icon": "\ud83d\udd4c"
  },
  {
    "id": "chennai_gujarati_shwetambar_jain_mandir",
    "name": "Gujarati Shwetambar Jain Mandir",
    "category": "Mosques",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Sowcarpet",
    "description": "First Jain temple in South India built in 1980s with pure white Jaipur marble.",
    "famousFor": [
      "Pure white Jaipur marble architecture",
      "First Jain Mandir built in South India",
      "Intricate marble dome carvings"
    ],
    "bestTimeToVisit": "6:00 AM - 11:30 AM & 5:00 PM - 8:00 PM",
    "timings": "6:00 AM - 12:00 PM & 5:00 PM - 8:30 PM",
    "locationAddress": "Mint Street, Sowcarpet, Chennai 600079",
    "lat": 13.0925,
    "lng": 80.2782,
    "icon": "\ud83d\uded5"
  },
  {
    "id": "chennai_government_museum",
    "name": "Government Museum",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b915 - Indian Adults",
    "area": "Egmore",
    "description": "Established in 1851, 2nd oldest museum in India spanning 6 buildings.",
    "famousFor": [
      "World's richest Chola Bronzes collection",
      "Amaravati Buddhist Sculptures",
      "Massive Blue Whale skeleton gallery"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "9:30 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Pantheon Road, Egmore, Chennai 600008",
    "lat": 13.0694,
    "lng": 80.2568,
    "icon": "\ud83c\udfdb\ufe0f"
  },
  {
    "id": "chennai_national_art_gallery",
    "name": "National Art Gallery",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b915 - Included in Museum",
    "area": "Egmore",
    "description": "Built in 1906 in red sandstone Indo-Saracenic style, houses Raja Ravi Varma paintings.",
    "famousFor": [
      "Indo-Saracenic red sandstone architectural marvel",
      "Raja Ravi Varma oil paintings",
      "Tanjore glass paintings & Mughal miniatures"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "9:30 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.0698,
    "lng": 80.257,
    "icon": "\ud83c\udfa8"
  },
  {
    "id": "chennai_contemporary_art_gallery",
    "name": "Contemporary Art Gallery",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b915 - Included in Museum",
    "area": "Egmore",
    "description": "Dedicated gallery within Egmore Museum complex exhibiting modern South Indian art.",
    "famousFor": [
      "Modern & contemporary South Indian art",
      "Bronze & terracotta modern sculptures",
      "British colonial portrait gallery"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "9:30 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.069,
    "lng": 80.2565,
    "icon": "\ud83c\udfa8"
  },
  {
    "id": "chennai_bronze_gallery",
    "name": "Bronze Gallery",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b915 - Included in Museum",
    "area": "Egmore",
    "description": "World-renowned gallery housing over 1,500 Chola, Pallava, and Vijayanagara bronzes.",
    "famousFor": [
      "Iconic 10th-century Nataraja Chola Bronze",
      "World's largest South Indian bronze collection",
      "Ancient deity idols"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "9:30 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.0692,
    "lng": 80.2566,
    "icon": "\ud83d\udd31"
  },
  {
    "id": "chennai_childrens_museum",
    "name": "Children's Museum",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b915 - Included in Museum",
    "area": "Egmore",
    "description": "Interactive children's learning section inside Egmore Museum with transport models.",
    "famousFor": [
      "Life-size animal dioramas",
      "Interactive science & transport models",
      "International costume dolls gallery"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "9:30 AM - 5:00 PM (Closed Fridays)",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.0688,
    "lng": 80.2562,
    "icon": "\ud83e\uddf8"
  },
  {
    "id": "chennai_museum_theatre",
    "name": "Museum Theatre",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "Event based entry",
    "area": "Egmore",
    "description": "Victorian Italianate-style circular theatre built in 1890s inside Museum campus.",
    "famousFor": [
      "Victorian Italianate circular theatre design",
      "Acoustically rich heritage auditorium",
      "Venue for classical plays & concerts"
    ],
    "bestTimeToVisit": "Event based",
    "timings": "9:30 AM - 5:00 PM",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.0685,
    "lng": 80.2575,
    "icon": "\ud83c\udfad"
  },
  {
    "id": "chennai_connemara_public_library",
    "name": "Connemara Public Library",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free General Entry",
    "area": "Egmore",
    "description": "Established in 1896, one of 4 National Depository Libraries in India.",
    "famousFor": [
      "National Depository Library receiving all Indian books",
      "Victorian-Gothic teakwood reading hall",
      "600,000+ rare manuscripts & books"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM",
    "timings": "9:00 AM - 7:30 PM (Mon-Sat)",
    "locationAddress": "Museum Campus, Egmore, Chennai 600008",
    "lat": 13.0688,
    "lng": 80.2572,
    "icon": "\ud83d\udcda"
  },
  {
    "id": "chennai_chennai_rail_museum",
    "name": "Chennai Rail Museum",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b950 - Adults, \u20b925 - Children",
    "area": "Villivakkam",
    "description": "Spanning 6.25 acres, displays vintage steam locos, royal coaches, and toy train ride.",
    "famousFor": [
      "Vintage outdoor steam locomotives",
      "Joyful Toy Train ride for kids",
      "Model rail layouts & coach cafe"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM & 3:00 PM - 5:00 PM",
    "timings": "10:00 AM - 5:00 PM (Closed Mondays)",
    "locationAddress": "ICF Factory Rd, Villivakkam / Perambur, Chennai 600038",
    "lat": 13.0978,
    "lng": 80.2189,
    "icon": "\ud83d\ude82"
  },
  {
    "id": "chennai_regional_rail_museum",
    "name": "Regional Rail Museum",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b950 - Adults",
    "area": "Villivakkam",
    "description": "Indoor heritage galleries showcasing Indian Railways 170-year history.",
    "famousFor": [
      "170-year Indian Railways history exhibits",
      "Historic 19th-century Fowler road roller",
      "Miniature rail models"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM",
    "timings": "10:00 AM - 5:00 PM (Closed Mondays)",
    "locationAddress": "ICF Campus, Villivakkam, Chennai 600038",
    "lat": 13.098,
    "lng": 80.2192,
    "icon": "\ud83d\ude82"
  },
  {
    "id": "chennai_birla_planetarium",
    "name": "B.M. Birla Planetarium",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b960 - Adults, \u20b930 - Children",
    "area": "Kotturpuram",
    "description": "Full-dome digital planetarium with 360 cosmic sky shows & outdoor science park.",
    "famousFor": [
      "360 Full-Dome Cosmic Sky Theatre shows",
      "Interactive Science Park & Echo Mirrors",
      "Astronomy & Robotics galleries"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM",
    "timings": "10:00 AM - 5:45 PM Daily",
    "locationAddress": "Gandhi Mandapam Rd, Kotturpuram, Chennai 600025",
    "lat": 13.0108,
    "lng": 80.2404,
    "icon": "\ud83e\ude90"
  },
  {
    "id": "chennai_periyar_science_technology_centre",
    "name": "Periyar Science & Technology Centre",
    "category": "Museums & Art",
    "entryType": "paid",
    "priceInfo": "\u20b930 - Entry",
    "area": "Kotturpuram",
    "description": "Interactive science center with 8 galleries covering Energy, Life Science & Physical Science.",
    "famousFor": [
      "8 interactive science galleries",
      "3D Science Show theatre",
      "Energy park outdoor models"
    ],
    "bestTimeToVisit": "10:00 AM - 2:00 PM",
    "timings": "10:00 AM - 5:45 PM",
    "locationAddress": "Gandhi Mandapam Rd, Kotturpuram, Chennai 600025",
    "lat": 13.0112,
    "lng": 80.2408,
    "icon": "\ud83d\udd2c"
  },
  {
    "id": "chennai_dr_mgr_memorial_house",
    "name": "Dr. MGR Memorial House",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Official residence of Dr. M.G. Ramachandran in Arcot Street, now a memorial museum.",
    "famousFor": [
      "MGR's official residence preserved as museum",
      "Personal dark glasses, cap, shield & car",
      "Quiet green courtyard in T. Nagar"
    ],
    "bestTimeToVisit": "9:00 AM - 4:00 PM",
    "timings": "9:00 AM - 5:00 PM (Closed Tuesdays)",
    "locationAddress": "27, Arcot St, T. Nagar, Chennai 600017",
    "lat": 13.0418,
    "lng": 80.2285,
    "icon": "\ud83c\udfe1"
  },
  {
    "id": "chennai_gandhi_mandapam_museum",
    "name": "Gandhi Mandapam Museum",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Guindy",
    "description": "Photographic museum detailing Mahatma Gandhi's visits to Tamil Nadu and freedom struggle.",
    "famousFor": [
      "Photographs of Gandhi's TN visits",
      "Freedom struggle historical documents",
      "Peaceful mandapam hall"
    ],
    "bestTimeToVisit": "9:00 AM - 5:00 PM",
    "timings": "6:00 AM - 7:00 PM",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600025",
    "lat": 13.008,
    "lng": 80.2362,
    "icon": "\ud83d\udd4a\ufe0f"
  },
  {
    "id": "chennai_anna_memorial_museum",
    "name": "Anna Memorial Museum",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Marina",
    "description": "Museum located inside Anna Square displaying C.N. Annadurai's speeches & writings.",
    "famousFor": [
      "Displays C.N. Annadurai's rare photos & pens",
      "Literary works & historic Tamil speeches",
      "Marina beach memorial park"
    ],
    "bestTimeToVisit": "4:00 PM - 7:30 PM",
    "timings": "6:00 AM - 9:00 PM",
    "locationAddress": "Anna Square, Marina Beach, Chennai 600005",
    "lat": 13.066,
    "lng": 80.284,
    "icon": "\ud83d\udcdc"
  },
  {
    "id": "chennai_mgr_memorial_museum",
    "name": "MGR Memorial Museum",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Marina",
    "description": "Modern museum inside MGR memorial complex showcasing cinematic & political achievements.",
    "famousFor": [
      "Cinematic awards & costume exhibits",
      "Life-size MGR statues & video gallery",
      "Beachfront location"
    ],
    "bestTimeToVisit": "4:00 PM - 8:00 PM",
    "timings": "6:00 AM - 9:00 PM",
    "locationAddress": "MGR Memorial Complex, Marina Beach, Chennai 600005",
    "lat": 13.0645,
    "lng": 80.2832,
    "icon": "\ud83c\udfac"
  },
  {
    "id": "chennai_thol_isai_kalanjiyam",
    "name": "Thol Isai Kalanjiyam",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Chennai",
    "description": "Ancient Tamil musical instruments museum showcasing ancient drums, flutes & lutes.",
    "famousFor": [
      "Ancient Tamil folk musical instruments",
      "Rare Yazh & Muzhavu replicas",
      "Rich Carnatic & Tamil music heritage"
    ],
    "bestTimeToVisit": "10:00 AM - 4:00 PM",
    "timings": "10:00 AM - 5:00 PM",
    "locationAddress": "Govt Music College Campus, RA Puram, Chennai 600028",
    "lat": 13.0212,
    "lng": 80.2588,
    "icon": "\ud83e\ude95"
  },
  {
    "id": "chennai_higginbothams",
    "name": "Higginbothams",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mount Road",
    "description": "India's oldest functional bookstore established in 1844 on Anna Salai.",
    "famousFor": [
      "India's oldest bookstore (Est. 1844)",
      "Victorian heritage building facade",
      "Vast collection of books & vintage prints"
    ],
    "bestTimeToVisit": "10:00 AM - 7:00 PM",
    "timings": "9:30 AM - 8:00 PM",
    "locationAddress": "814, Anna Salai, Chennai 600002",
    "lat": 13.0638,
    "lng": 80.2685,
    "icon": "\ud83d\udcd6"
  },
  {
    "id": "chennai_madras_literary_society",
    "name": "Madras Literary Society",
    "category": "Museums & Art",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Egmore",
    "description": "Established in 1812, one of India's oldest research libraries housing 50,000+ rare books.",
    "famousFor": [
      "One of India's oldest libraries (1812)",
      "50,000+ rare 18th-century books & maps",
      "High teakwood bookshelves with rolling ladders"
    ],
    "bestTimeToVisit": "10:00 AM - 4:00 PM",
    "timings": "10:00 AM - 5:00 PM (Mon-Sat)",
    "locationAddress": "DPI Campus, College Rd, Egmore, Chennai 600006",
    "lat": 13.0615,
    "lng": 80.2488,
    "icon": "\ud83d\udcda"
  },
  {
    "id": "chennai_adyar_eco_park",
    "name": "Adyar Eco Park",
    "category": "Parks & Nature",
    "entryType": "paid",
    "priceInfo": "\u20b920 Entry (Guided Walk)",
    "area": "Adyar",
    "description": "358-acre restored coastal wetland eco-park in Adyar estuary with 200+ bird species.",
    "famousFor": [
      "Restored mangrove wetland ecosystem",
      "200+ species of migratory birds",
      "Guided eco walks along wooden boardwalks"
    ],
    "bestTimeToVisit": "6:30 AM - 9:00 AM & 4:00 PM - 6:00 PM",
    "timings": "6:30 AM - 6:00 PM (Slots)",
    "locationAddress": "Karpagam Avenue, RA Puram, Chennai 600028",
    "lat": 13.0182,
    "lng": 80.2612,
    "icon": "\ud83c\udf3f"
  },
  {
    "id": "chennai_semmozhi_poonga",
    "name": "Semmozhi Poonga",
    "category": "Parks & Nature",
    "entryType": "paid",
    "priceInfo": "\u20b925 - Adults, \u20b910 - Children",
    "area": "Teynampet",
    "description": "Pristine 20-acre botanical garden in heart of city with 500+ plant species & Orchid house.",
    "famousFor": [
      "Exotic Orchid House & Bonsai collection",
      "Illuminated water lily fountains",
      "Medicinal plants garden"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 4:00 PM - 7:00 PM",
    "timings": "10:00 AM - 7:30 PM (Closed Tuesdays)",
    "locationAddress": "Cathedral Rd, Teynampet, Chennai 600086",
    "lat": 13.0483,
    "lng": 80.2528,
    "icon": "\ud83c\udf3a"
  },
  {
    "id": "chennai_chetpet_eco_park",
    "name": "Chetpet Eco Park",
    "category": "Parks & Nature",
    "entryType": "paid",
    "priceInfo": "\u20b925 - Entry, \u20b950 - Boating",
    "area": "Chetpet",
    "description": "16-acre urban lake park featuring pedal boating, angling pier, and 1.5 km walking track.",
    "famousFor": [
      "Urban lake pedal boating",
      "Catch-and-release angling pier",
      "1.5 km lakefront walking track"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 4:30 PM - 7:00 PM",
    "timings": "6:00 AM - 7:00 PM Daily",
    "locationAddress": "EVR Periyar Salai, Chetpet, Chennai 600031",
    "lat": 13.0745,
    "lng": 80.2435,
    "icon": "\ud83d\udef6"
  },
  {
    "id": "chennai_anna_nagar_tower_park",
    "name": "Anna Nagar Tower Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Anna Nagar",
    "description": "15-acre urban park featuring iconic 135-foot spiral observation tower and pond.",
    "famousFor": [
      "135-foot spiral tower structure",
      "Lush tree canopy walking trails",
      "Skating rink & lake view"
    ],
    "bestTimeToVisit": "5:30 AM - 9:00 AM & 4:30 PM - 7:30 PM",
    "timings": "5:00 AM - 10:00 AM & 4:00 PM - 8:00 PM",
    "locationAddress": "3rd Main Rd, Anna Nagar, Chennai 600040",
    "lat": 13.0862,
    "lng": 80.2125,
    "icon": "\ud83d\uddfc"
  },
  {
    "id": "chennai_nageswara_rao_park",
    "name": "Nageswara Rao Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Lush 4-acre urban park in Mylapore featuring dense banyan trees & Sunday unplugged concerts.",
    "famousFor": [
      "Dense banyan tree shade trails",
      "Unplugged Sunday Carnatic music",
      "Peaceful lotus pond"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 5:00 PM - 7:30 PM",
    "timings": "5:00 AM - 11:00 AM & 3:00 PM - 8:00 PM",
    "locationAddress": "Luz Church Rd, Mylapore, Chennai 600004",
    "lat": 13.0345,
    "lng": 80.2618,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_panagal_park",
    "name": "Panagal Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Historic 8-acre park in T. Nagar named after Rajah of Panagal, surrounded by markets.",
    "famousFor": [
      "Historic park in central T. Nagar",
      "Shaded benches & flower gardens",
      "Popular meeting point for shoppers"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 4:30 PM - 7:30 PM",
    "timings": "5:00 AM - 8:00 PM",
    "locationAddress": "Prakasam Rd, T. Nagar, Chennai 600017",
    "lat": 13.0412,
    "lng": 80.2332,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_jeeva_park",
    "name": "Jeeva Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Tranquil neighborhood park in T. Nagar with walking paths and children's play area.",
    "famousFor": [
      "Quiet green retreat in T. Nagar",
      "Well-maintained walking track",
      "Children's play area"
    ],
    "bestTimeToVisit": "5:30 AM - 9:00 AM & 4:30 PM - 7:00 PM",
    "timings": "5:00 AM - 8:00 PM",
    "locationAddress": "GN Chetty Rd, T. Nagar, Chennai 600017",
    "lat": 13.0445,
    "lng": 80.2415,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_thiru_vi_ka_park_shenoy_nagar",
    "name": "Thiru-Vi-Ka Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Shenoy Nagar",
    "description": "Spacious 9-acre renovated park with musical fountain, skating rink & outdoor gym.",
    "famousFor": [
      "Renovated 9-acre urban park",
      "Musical fountain & open skating rink",
      "Located near Shenoy Nagar Metro"
    ],
    "bestTimeToVisit": "5:30 AM - 9:00 AM & 4:30 PM - 7:30 PM",
    "timings": "5:00 AM - 9:00 PM",
    "locationAddress": "Shenoy Nagar, Chennai 600030",
    "lat": 13.0785,
    "lng": 80.2255,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_sivan_park_kk_nagar",
    "name": "Sivan Park",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "K.K. Nagar",
    "description": "Lush neighborhood park featuring Lord Shiva statue, walking tracks & herbal garden.",
    "famousFor": [
      "Lord Shiva statue centerpiece",
      "Herbal garden & paved jogging track",
      "KK Nagar green sanctuary"
    ],
    "bestTimeToVisit": "5:30 AM - 9:00 AM & 4:30 PM - 7:30 PM",
    "timings": "5:00 AM - 8:30 PM",
    "locationAddress": "P.T. Rajan Salai, K.K. Nagar, Chennai 600078",
    "lat": 13.0388,
    "lng": 80.1988,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_pallikaranai_marshland",
    "name": "Pallikaranai Marshland",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Pallikaranai",
    "description": "One of South India's last natural freshwater wetlands, home to 100+ bird species.",
    "famousFor": [
      "Ramsar wetland site in Chennai",
      "Spotting Pink Flamingos & Egrets",
      "Freshwater eco-system viewpoint"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:00 PM",
    "timings": "Open 24/7 view from Velachery main road",
    "locationAddress": "Velachery-Tambaram Main Rd, Pallikaranai, Chennai 600100",
    "lat": 12.9355,
    "lng": 80.2155,
    "icon": "\ud83e\udda9"
  },
  {
    "id": "chennai_adyar_estuary_view",
    "name": "Adyar Estuary",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Adyar",
    "description": "Ecological junction where Adyar River flows into the Bay of Bengal.",
    "famousFor": [
      "Scenic river meets ocean estuary view",
      "Migratory bird sanctuary spot",
      "Adyar Eco Park boardwalk view"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Adyar River Mouth, Chennai 600028",
    "lat": 13.0125,
    "lng": 80.2712,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_porur_lake",
    "name": "Porur Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Porur",
    "description": "Primary drinking water reservoir lake covering 800 acres in western Chennai.",
    "famousFor": [
      "Expansive 800-acre lake mirror horizon",
      "Popular sunset viewing spot",
      "Main water reservoir of Chennai"
    ],
    "bestTimeToVisit": "5:30 AM - 8:00 AM & 4:30 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Mount-Poonamallee Rd, Porur, Chennai 600116",
    "lat": 13.0345,
    "lng": 80.1488,
    "icon": "\ud83c\udf05"
  },
  {
    "id": "chennai_chetpet_lake",
    "name": "Chetpet Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Chetpet",
    "description": "Central urban lake covering 16 acres featuring eco-park boardwalks.",
    "famousFor": [
      "Scenic central lake vista",
      "Lakefront walking promenade",
      "Boating & angling hub"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM & 4:30 PM - 7:00 PM",
    "timings": "6:00 AM - 7:00 PM",
    "locationAddress": "Chetpet Lake, EVR Periyar Salai, Chennai 600031",
    "lat": 13.0745,
    "lng": 80.2435,
    "icon": "\ud83d\udca7"
  },
  {
    "id": "chennai_madhavaram_lake",
    "name": "Madhavaram Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Madhavaram",
    "description": "Spacious natural lake located in northern Chennai near Madhavaram Milk Colony.",
    "famousFor": [
      "Tranquil water vista in North Chennai",
      "Seasonal waterbird spotting",
      "Peaceful lake bank drive"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Madhavaram Lake Bank, Chennai 600060",
    "lat": 13.1485,
    "lng": 80.2288,
    "icon": "\ud83d\udca7"
  },
  {
    "id": "chennai_retteri_lake",
    "name": "Retteri Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Kolathur",
    "description": "Expansive 700-acre lake located along 100 Feet Road in Kolathur / Perambur area.",
    "famousFor": [
      "700-acre water horizon",
      "Restored lakefront bund walking path",
      "Sunset views"
    ],
    "bestTimeToVisit": "5:30 AM - 8:00 AM & 4:30 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "100 Feet Road, Kolathur, Chennai 600099",
    "lat": 13.1315,
    "lng": 80.2085,
    "icon": "\ud83d\udca7"
  },
  {
    "id": "chennai_chembarambakkam_lake",
    "name": "Chembarambakkam Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Chennai outskirts",
    "description": "Massive natural lake 25 km from city, origin of Adyar River and main reservoir.",
    "famousFor": [
      "Origin point of Adyar River",
      "Pristine water mirror horizon",
      "Popular sunset photography spot"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:30 PM",
    "timings": "Open during daylight hours",
    "locationAddress": "Chembarambakkam Lake Bank, Chennai Outer 600123",
    "lat": 13.0125,
    "lng": 80.0152,
    "icon": "\ud83c\udfde\ufe0f"
  },
  {
    "id": "chennai_pulicat_lake",
    "name": "Pulicat Lake",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "North Chennai region",
    "description": "Second largest brackish water lagoon in India, famous for thousands of Flamingos.",
    "famousFor": [
      "2nd largest brackish lagoon in India",
      "Thousands of seasonal Greater Flamingos",
      "Boat rides & birdwatching"
    ],
    "bestTimeToVisit": "6:00 AM - 10:00 AM (Birdwatching)",
    "timings": "Daylight hours",
    "locationAddress": "Pulicat Lagoon, North Chennai Region 601205",
    "lat": 13.4185,
    "lng": 80.3188,
    "icon": "\ud83e\udda9"
  },
  {
    "id": "chennai_theosophical_society",
    "name": "Theosophical Society",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Adyar",
    "description": "260-acre peaceful eco-sanctuary on Adyar river bank, home to 450-year-old Great Banyan Tree.",
    "famousFor": [
      "450-year-old Adyar Great Banyan Tree",
      "260 acres of untouched forest canopy",
      "Peaceful meditation & birdwatching"
    ],
    "bestTimeToVisit": "8:30 AM - 10:00 AM & 3:00 PM - 4:00 PM",
    "timings": "8:30 AM - 10:00 AM & 3:00 PM - 4:00 PM (Closed Sundays)",
    "locationAddress": "Adyar River Bank, Besant Avenue, Adyar, Chennai 600020",
    "lat": 13.0105,
    "lng": 80.2588,
    "icon": "\ud83c\udf33"
  },
  {
    "id": "chennai_broken_bridge",
    "name": "Broken Bridge",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Adyar",
    "description": "Partially collapsed 1967 bridge across Adyar river mouth meeting Bay of Bengal.",
    "famousFor": [
      "Scenic view over river estuary meeting sea",
      "Cult photography spot for sunrise/sunset",
      "Featured in Tamil films"
    ],
    "bestTimeToVisit": "6:00 AM - 7:30 AM & 5:00 PM - 6:30 PM",
    "timings": "Daylight hours",
    "locationAddress": "Besant Nagar, Adyar Estuary, Chennai 600090",
    "lat": 13.0118,
    "lng": 80.2736,
    "icon": "\ud83c\udf09"
  },
  {
    "id": "chennai_pulicat_birding_area",
    "name": "Pulicat Birding Area",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Pulicat",
    "description": "Premier birding sanctuary in South India attracting flamingos, pelicans & storks.",
    "famousFor": [
      "Greater Flamingos & Grey Pelicans",
      "Lagoon boat rides with local fishermen",
      "Bird sanctuary photography"
    ],
    "bestTimeToVisit": "6:00 AM - 9:30 AM (October to March)",
    "timings": "Daylight hours",
    "locationAddress": "Pulicat Bird Sanctuary, Chennai Region 601205",
    "lat": 13.421,
    "lng": 80.32,
    "icon": "\ud83e\udd85"
  },
  {
    "id": "chennai_pallikaranai_birding_area",
    "name": "Pallikaranai Birding Area",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Pallikaranai",
    "description": "Urban wetland birding spot along Radial Road featuring egrets, ducks & purple moorhens.",
    "famousFor": [
      "Spotting Purple Moorhens & Egrets",
      "Radial road bird photography spot",
      "Ramsar protected wetland"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM",
    "timings": "Open 24/7 view",
    "locationAddress": "200 Feet Radial Rd, Pallikaranai, Chennai 600100",
    "lat": 12.9388,
    "lng": 80.2188,
    "icon": "\ud83e\udd86"
  },
  {
    "id": "chennai_ennore_creek",
    "name": "Ennore Creek",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Ennore",
    "description": "Coastal backwater creek where Kosasthalaiyar River discharges into Bay of Bengal.",
    "famousFor": [
      "Kosasthalaiyar river mouth vista",
      "Industrial port silhouette views",
      "Raw coastal creek scenery"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM & 4:30 PM - 6:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Ennore Creek, North Chennai 600057",
    "lat": 13.2144,
    "lng": 80.3242,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_adyar_river_stretch",
    "name": "Adyar River",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Adyar",
    "description": "Historic river originating from Chembarambakkam lake flowing through central Chennai.",
    "famousFor": [
      "Adyar river bridges scenic drive",
      "Adyar eco park mangrove banks",
      "Estuary sunset view"
    ],
    "bestTimeToVisit": "5:00 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Adyar River Bank, Chennai",
    "lat": 13.015,
    "lng": 80.25,
    "icon": "\ud83c\udfde\ufe0f"
  },
  {
    "id": "chennai_cooum_river_heritage_stretch",
    "name": "Cooum River heritage stretch",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Central Chennai",
    "description": "Historic river winding through heart of Chennai past Napier Bridge & Fort St. George.",
    "famousFor": [
      "Flows past Napier Bridge & Fort St George",
      "Central Chennai heritage waterway",
      "Illuminated bridge crossings"
    ],
    "bestTimeToVisit": "6:00 PM - 9:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Central Chennai River Banks, Chennai",
    "lat": 13.072,
    "lng": 80.28,
    "icon": "\ud83c\udf09"
  },
  {
    "id": "chennai_madras_naturalists_society_locations",
    "name": "Madras Naturalists' Society locations",
    "category": "Parks & Nature",
    "entryType": "free",
    "priceInfo": "Free Walk",
    "area": "Chennai",
    "description": "Curated nature trails organized across Guindy forest, IIT campus & beaches.",
    "famousFor": [
      "Guided nature & birdwatching walks",
      "Flora & fauna identification trails",
      "Conservation awareness walks"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM",
    "timings": "Scheduled weekend walks",
    "locationAddress": "Guindy & ECR Nature Trails, Chennai",
    "lat": 13.005,
    "lng": 80.235,
    "icon": "\ud83c\udf40"
  },
  {
    "id": "chennai_arignar_anna_zoological_park",
    "name": "Arignar Anna Zoological Park",
    "category": "Wildlife & Animals",
    "entryType": "paid",
    "priceInfo": "\u20b9200 - Adults, \u20b950 - Children",
    "area": "Vandalur",
    "description": "India's largest zoo spanning 1,500 acres with 2,600+ wild animals & Lion Safari.",
    "famousFor": [
      "India's largest zoo (1,500+ acres)",
      "Lion & Deer Safari in forest habitat",
      "Rare White Tigers & 3D Butterfly House"
    ],
    "bestTimeToVisit": "9:00 AM - 2:00 PM",
    "timings": "9:00 AM - 5:00 PM (Closed Tuesdays)",
    "locationAddress": "GST Road, Vandalur, Chennai 600048",
    "lat": 12.8797,
    "lng": 80.0817,
    "icon": "\ud83e\udd81"
  },
  {
    "id": "chennai_guindy_national_park",
    "name": "Guindy National Park",
    "category": "Wildlife & Animals",
    "entryType": "paid",
    "priceInfo": "\u20b920 - Entry",
    "area": "Guindy",
    "description": "8th smallest national park in India, unique tropical dry evergreen forest in metropolis.",
    "famousFor": [
      "Free-roaming Spotted Deer & Blackbucks",
      "Tropical forest canopy in city heart",
      "Adjacent to Children's & Snake Park"
    ],
    "bestTimeToVisit": "9:00 AM - 11:30 AM & 3:30 PM - 5:30 PM",
    "timings": "9:00 AM - 5:30 PM (Closed Tuesdays)",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600022",
    "lat": 13.0065,
    "lng": 80.237,
    "icon": "\ud83e\udd8c"
  },
  {
    "id": "chennai_guindy_childrens_park",
    "name": "Guindy Children's Park",
    "category": "Wildlife & Animals",
    "entryType": "paid",
    "priceInfo": "\u20b920 - Adults, \u20b95 - Children",
    "area": "Guindy",
    "description": "Metropolitan wildlife park with free-roaming deer, walk-in bird aviary & play zones.",
    "famousFor": [
      "Free-roaming Spotted Deer & Blackbucks",
      "Tropical walk-in bird aviary",
      "Shaded play areas under forest trees"
    ],
    "bestTimeToVisit": "9:00 AM - 11:30 AM & 3:30 PM - 5:30 PM",
    "timings": "9:00 AM - 5:30 PM (Closed Tuesdays)",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600022",
    "lat": 13.0067,
    "lng": 80.2372,
    "icon": "\ud83e\udd8c"
  },
  {
    "id": "chennai_chennai_snake_park",
    "name": "Chennai Snake Park",
    "category": "Wildlife & Animals",
    "entryType": "paid",
    "priceInfo": "\u20b920 - Adults",
    "area": "Guindy",
    "description": "Founded by Romulus Whitaker in 1972, houses King Cobras, Pythons & Crocodiles.",
    "famousFor": [
      "King Cobras, Pythons & Vipers enclosures",
      "Venomous snake identification demos",
      "Adjacent to Guindy Children's Park"
    ],
    "bestTimeToVisit": "9:00 AM - 11:30 AM & 3:30 PM - 5:30 PM",
    "timings": "9:00 AM - 5:30 PM (Closed Tuesdays)",
    "locationAddress": "Sardar Patel Rd, Guindy, Chennai 600022",
    "lat": 13.006,
    "lng": 80.2365,
    "icon": "\ud83d\udc0d"
  },
  {
    "id": "chennai_madras_crocodile_bank",
    "name": "Madras Crocodile Bank",
    "category": "Wildlife & Animals",
    "entryType": "paid",
    "priceInfo": "\u20b9100 - Adults, \u20b950 - Children",
    "area": "ECR",
    "description": "World-renowned reptile zoo housing 2,400+ crocodilians across 14 species & Night Safari.",
    "famousFor": [
      "Over 2,400 crocodilians in natural enclosures",
      "Massive 17-foot Jaws Saltwater Crocodile",
      "Thrilling Night Safari tour"
    ],
    "bestTimeToVisit": "9:00 AM - 12:00 PM & 7:00 PM - 8:30 PM (Night Safari)",
    "timings": "9:00 AM - 5:30 PM (Closed Mondays)",
    "locationAddress": "Mahabalipuram Rd, Vadanemmeli, ECR 603104",
    "lat": 12.7411,
    "lng": 80.2319,
    "icon": "\ud83d\udc0a"
  },
  {
    "id": "chennai_anna_centenary_library",
    "name": "Anna Centenary Library",
    "category": "Science & Educational",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Kotturpuram",
    "description": "Spanning 9 floors over 8 acres, one of largest public libraries in Asia with 1.2M+ books.",
    "famousFor": [
      "One of Asia's largest libraries (9 Floors)",
      "Dedicated Children's reading section",
      "State-of-the-art braille section"
    ],
    "bestTimeToVisit": "9:00 AM - 2:00 PM",
    "timings": "8:00 AM - 8:00 PM Daily",
    "locationAddress": "Gandhi Mandapam Rd, Kotturpuram, Chennai 600025",
    "lat": 13.0128,
    "lng": 80.2372,
    "icon": "\ud83d\udcda"
  },
  {
    "id": "chennai_birla_planetarium_sky_theatre",
    "name": "Birla Planetarium Sky Theatre",
    "category": "Science & Educational",
    "entryType": "paid",
    "priceInfo": "\u20b960 - Show",
    "area": "Kotturpuram",
    "description": "Full-dome digital sky theatre projecting cosmic shows in English & Tamil.",
    "famousFor": [
      "360-degree digital cosmic sky shows",
      "Solar system & deep space projections",
      "Air-conditioned dome theatre"
    ],
    "bestTimeToVisit": "10:30 AM, 1:15 PM & 3:45 PM (Show slots)",
    "timings": "10:00 AM - 5:45 PM",
    "locationAddress": "Gandhi Mandapam Rd, Kotturpuram, Chennai 600025",
    "lat": 13.0108,
    "lng": 80.2404,
    "icon": "\ud83c\udf0c"
  },
  {
    "id": "chennai_national_institute_of_siddha",
    "name": "National Institute of Siddha",
    "category": "Science & Educational",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Tambaram",
    "description": "Premier national research institute for traditional Tamil Siddha medicine system.",
    "famousFor": [
      "Premier Siddha medical research institute",
      "Herbal garden with rare medicinal plants",
      "Siddha healthcare museum"
    ],
    "bestTimeToVisit": "9:00 AM - 1:00 PM",
    "timings": "8:00 AM - 4:00 PM",
    "locationAddress": "GST Road, Tambaram Sanatorium, Chennai 600047",
    "lat": 12.9285,
    "lng": 80.1215,
    "icon": "\ud83c\udf3f"
  },
  {
    "id": "chennai_chennai_metro_experience",
    "name": "Chennai Metro Rail Experience",
    "category": "Science & Educational",
    "entryType": "paid",
    "priceInfo": "\u20b910 to \u20b950 - Fare",
    "area": "Chennai",
    "description": "Modern elevated & underground metro network offering futuristic city transit views.",
    "famousFor": [
      "Modern elevated & underground transit",
      "Air-conditioned city sky views",
      "Clean futuristic stations"
    ],
    "bestTimeToVisit": "10:00 AM - 4:00 PM",
    "timings": "5:00 AM - 11:00 PM",
    "locationAddress": "Chennai Metro Network, Chennai",
    "lat": 13.07,
    "lng": 80.22,
    "icon": "\ud83d\ude87"
  },
  {
    "id": "chennai_dakshinachitra_heritage_museum",
    "name": "DakshinaChitra Heritage Museum",
    "category": "Arts & Culture",
    "entryType": "paid",
    "priceInfo": "\u20b9175 - Adults, \u20b9100 - Children",
    "area": "Muttukadu",
    "description": "Living history museum with 18 reconstructed heritage homes of South India.",
    "famousFor": [
      "18 authentic reconstructed heritage homes",
      "Live artisan craft workshops (Pottery, Weaving)",
      "Traditional South Indian folk dance shows"
    ],
    "bestTimeToVisit": "10:00 AM - 3:00 PM",
    "timings": "10:00 AM - 6:00 PM (Closed Tuesdays)",
    "locationAddress": "SH 49, Muttukadu, Chengalpattu 603112",
    "lat": 12.8252,
    "lng": 80.2415,
    "icon": "\ud83c\udfe1"
  },
  {
    "id": "chennai_cholamandal_artists_village",
    "name": "Cholamandal Artists' Village",
    "category": "Arts & Culture",
    "entryType": "paid",
    "priceInfo": "\u20b950 - Adults",
    "area": "Injambakkam",
    "description": "India's largest artists' commune founded in 1966 with sculpture gardens & galleries.",
    "famousFor": [
      "India's premier self-supporting artists' commune",
      "Modern art galleries & outdoor sculpture park",
      "Artist studios"
    ],
    "bestTimeToVisit": "10:00 AM - 4:30 PM",
    "timings": "9:30 AM - 6:30 PM Daily",
    "locationAddress": "East Coast Road, Injambakkam, Chennai 600115",
    "lat": 12.9152,
    "lng": 80.2519,
    "icon": "\ud83c\udfa8"
  },
  {
    "id": "chennai_kalakshetra_foundation",
    "name": "Kalakshetra Foundation",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free Campus Access",
    "area": "Thiruvanmiyur",
    "description": "World-renowned academy founded in 1936 by Rukmini Devi Arundale for Bharatanatyam.",
    "famousFor": [
      "World-famous center for Bharatanatyam dance",
      "Lush green campus under banyan trees",
      "Handloom silk weaving unit"
    ],
    "bestTimeToVisit": "8:30 AM - 11:30 AM",
    "timings": "8:30 AM - 5:00 PM (Mon-Fri)",
    "locationAddress": "Kalakshetra Road, Thiruvanmiyur, Chennai 600041",
    "lat": 12.9861,
    "lng": 80.2541,
    "icon": "\ud83d\udc83"
  },
  {
    "id": "chennai_music_academy",
    "name": "Music Academy",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed Concerts",
    "area": "Teynampet",
    "description": "Epicenter of Carnatic music and December Music Season festival in South India.",
    "famousFor": [
      "Epicenter of Chennai December Music Season",
      "Sangeetha Kalanidhi award venue",
      "Acoustic auditorium"
    ],
    "bestTimeToVisit": "Concert hours 5:00 PM - 9:00 PM",
    "timings": "Concert schedule based",
    "locationAddress": "168, TTK Road, Royapettah / Teynampet, Chennai 600014",
    "lat": 13.0458,
    "lng": 80.2558,
    "icon": "\ud83c\udfb5"
  },
  {
    "id": "chennai_narada_gana_sabha",
    "name": "Narada Gana Sabha",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed Concerts",
    "area": "Alwarpet",
    "description": "Prominent sabha hosting Carnatic music, classical dance & Tamil drama plays.",
    "famousFor": [
      "Premier sabha for Carnatic concerts & dance",
      "Annual December music festival venue",
      "Alwarpet cultural hub"
    ],
    "bestTimeToVisit": "Concert hours 5:00 PM - 9:00 PM",
    "timings": "Event based",
    "locationAddress": "TTK Road, Alwarpet, Chennai 600018",
    "lat": 13.0388,
    "lng": 80.2515,
    "icon": "\ud83c\udfbc"
  },
  {
    "id": "chennai_krishna_gana_sabha",
    "name": "Krishna Gana Sabha",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed",
    "area": "T. Nagar",
    "description": "Prestigious sabha in T. Nagar hosting classical dance, music & Gokulashtami festival.",
    "famousFor": [
      "Gokulashtami music festival hub",
      "Bharatanatyam & Kuchipudi dance recitals",
      "T. Nagar cultural venue"
    ],
    "bestTimeToVisit": "Concert hours 5:00 PM - 9:00 PM",
    "timings": "Event based",
    "locationAddress": "Griffith Rd, T. Nagar, Chennai 600017",
    "lat": 13.0415,
    "lng": 80.2312,
    "icon": "\ud83c\udfad"
  },
  {
    "id": "chennai_vani_mahal",
    "name": "Vani Mahal",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed",
    "area": "T. Nagar",
    "description": "Established in 1944 (Sri Thyaga Brahma Gana Sabha), major cultural auditorium in T. Nagar.",
    "famousFor": [
      "Established in 1944 for Carnatic music",
      "Air-conditioned 1,000 seat auditorium",
      "Tamil theatre drama venue"
    ],
    "bestTimeToVisit": "Concert hours 5:00 PM - 9:00 PM",
    "timings": "Event based",
    "locationAddress": "GN Chetty Rd, T. Nagar, Chennai 600017",
    "lat": 13.0465,
    "lng": 80.2418,
    "icon": "\ud83c\udfb5"
  },
  {
    "id": "chennai_mylapore_fine_arts_club",
    "name": "Mylapore Fine Arts Club",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed",
    "area": "Mylapore",
    "description": "Historic cultural sabha in Mylapore hosting daily Carnatic concerts & dance dramas.",
    "famousFor": [
      "Historic Mylapore cultural sabha",
      "Daily Carnatic vocal & instrumental concerts",
      "December season venue"
    ],
    "bestTimeToVisit": "Concert hours 4:30 PM - 8:30 PM",
    "timings": "Event based",
    "locationAddress": "Musiri Subramaniam Salai, Mylapore, Chennai 600004",
    "lat": 13.0335,
    "lng": 80.2625,
    "icon": "\ud83e\ude95"
  },
  {
    "id": "chennai_bharatiya_vidya_bhavan",
    "name": "Bharatiya Vidya Bhavan",
    "category": "Arts & Culture",
    "entryType": "free",
    "priceInfo": "Free / Ticketed",
    "area": "Mylapore",
    "description": "Vibrant cultural center hosting free classical music concerts, plays & art exhibitions.",
    "famousFor": [
      "Free admission classical music concerts",
      "Art exhibitions & book sales",
      "Heart of Mylapore cultural hub"
    ],
    "bestTimeToVisit": "5:00 PM - 8:30 PM",
    "timings": "9:00 AM - 9:00 PM",
    "locationAddress": "East Mada St, Mylapore, Chennai 600004",
    "lat": 13.0338,
    "lng": 80.2705,
    "icon": "\ud83c\udfad"
  },
  {
    "id": "chennai_george_town_heritage_streets",
    "name": "George Town Heritage Streets",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "George Town",
    "description": "Historic 17th-century grid layout market streets filled with wholesale textile & spice shops.",
    "famousFor": [
      "17th-century East India Company town layout",
      "Wholesale saree, textile & spice markets",
      "Rich heritage street architecture"
    ],
    "bestTimeToVisit": "10:30 AM - 8:30 PM",
    "timings": "Shops open 10:00 AM - 9:00 PM (Closed Sundays)",
    "locationAddress": "George Town, Chennai 600001",
    "lat": 13.0885,
    "lng": 80.2835,
    "icon": "\ud83d\udecd\ufe0f"
  },
  {
    "id": "chennai_parrys_corner",
    "name": "Parrys Corner",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "George Town",
    "description": "Major commercial hub in George Town named after Thomas Parry (Dare House landmark).",
    "famousFor": [
      "Historic Dare House landmark building",
      "Wholesale stationery, hardware & paper market",
      "Bustling Central rail hub neighborhood"
    ],
    "bestTimeToVisit": "10:30 AM - 8:30 PM",
    "timings": "Shops open 10:00 AM - 9:00 PM",
    "locationAddress": "Parry's Corner, George Town, Chennai 600001",
    "lat": 13.088,
    "lng": 80.284,
    "icon": "\ud83c\udfd9\ufe0f"
  },
  {
    "id": "chennai_burma_bazaar",
    "name": "Burma Bazaar",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Parrys",
    "description": "Bustling market set up by Burmese Tamil refugees in 1969, famous for electronics & imported goods.",
    "famousFor": [
      "Founded by Burmese Tamil refugees in 1969",
      "Imported electronics, perfumes & chocolates",
      "Located outside Chennai Beach station"
    ],
    "bestTimeToVisit": "11:00 AM - 9:00 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "North Beach Rd, Parrys, Chennai 600001",
    "lat": 13.0888,
    "lng": 80.2855,
    "icon": "\ud83d\udecd\ufe0f"
  },
  {
    "id": "chennai_sowcarpet",
    "name": "Sowcarpet",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Sowcarpet",
    "description": "North Indian cultural pocket in Chennai famous for Mint Street street food & wholesale bridal wear.",
    "famousFor": [
      "Famous Mint Street food trail (Murukku Sandwich)",
      "Wholesale lehengas, sarees & oxidised jewellery",
      "Marwari sweet shops"
    ],
    "bestTimeToVisit": "4:00 PM - 9:00 PM (Street Food)",
    "timings": "10:30 AM - 9:00 PM",
    "locationAddress": "Mint Street, Sowcarpet, Chennai 600079",
    "lat": 13.0945,
    "lng": 80.2789,
    "icon": "\ud83c\udf62"
  },
  {
    "id": "chennai_tnagar_shopping_district",
    "name": "T. Nagar Shopping District",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "India's largest retail shopping district by revenue, famous for silk saree & gold showrooms.",
    "famousFor": [
      "Nalli, Pothys, Saravana Stores silk showrooms",
      "India's highest revenue retail shopping hub",
      "Gold & diamond jewellery mega stores"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM",
    "timings": "9:30 AM - 9:30 PM",
    "locationAddress": "T. Nagar, Chennai 600017",
    "lat": 13.0402,
    "lng": 80.2305,
    "icon": "\ud83d\udecd\ufe0f"
  },
  {
    "id": "chennai_pondy_bazaar",
    "name": "Pondy Bazaar",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Vibrant shopping boulevard with paved Pedestrian Plaza, street stalls & apparel stores.",
    "famousFor": [
      "Paved Pedestrian Plaza with seating",
      "Budget fashion, footwear & accessory stalls",
      "Multi-brand retail stores"
    ],
    "bestTimeToVisit": "4:30 PM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "Sir Thyagaraya Rd, T. Nagar, Chennai 600017",
    "lat": 13.0428,
    "lng": 80.2356,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_ranganathan_street",
    "name": "Ranganathan Street",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "One of the most densely crowded shopping streets in Asia, connecting Mambalam station.",
    "famousFor": [
      "High density street market experience",
      "Budget apparel, kitchenware & electronics",
      "Connects Mambalam railway station"
    ],
    "bestTimeToVisit": "10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM",
    "timings": "9:00 AM - 9:30 PM",
    "locationAddress": "Ranganathan St, T. Nagar, Chennai 600017",
    "lat": 13.04,
    "lng": 80.23,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_usman_road",
    "name": "Usman Road",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "T. Nagar",
    "description": "Major commercial artery in T. Nagar housing multistory silk & jewellery showrooms.",
    "famousFor": [
      "GRT, Prince & Kalyan Jewellers mega stores",
      "Textile & fashion retail complexes",
      "Usman Road flyover vista"
    ],
    "bestTimeToVisit": "10:00 AM - 9:00 PM",
    "timings": "9:30 AM - 9:30 PM",
    "locationAddress": "Usman Road, T. Nagar, Chennai 600017",
    "lat": 13.042,
    "lng": 80.232,
    "icon": "\ud83d\udc8e"
  },
  {
    "id": "chennai_mylapore_mada_streets",
    "name": "Mylapore Mada Streets",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Mylapore",
    "description": "Four streets surrounding Kapaleeshwarar Temple filled with brassware & jasmine flower stalls.",
    "famousFor": [
      "Jasmine flower & brassware shops",
      "Filter Coffee at Rayar's Mess & Mami Tiffin",
      "Margazhi festival street atmosphere"
    ],
    "bestTimeToVisit": "6:30 AM - 9:00 AM & 4:30 PM - 8:30 PM",
    "timings": "Shops open 8:30 AM - 9:00 PM",
    "locationAddress": "Mada Streets, Mylapore, Chennai 600004",
    "lat": 13.0338,
    "lng": 80.2689,
    "icon": "\u2615"
  },
  {
    "id": "chennai_phoenix_marketcity",
    "name": "Phoenix Marketcity",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Velachery",
    "description": "Largest shopping mall in Chennai spanning 2.4 million sq ft with IMAX theatre & Palladium.",
    "famousFor": [
      "Largest mall in Chennai (2.4M sq ft)",
      "IMAX Theatre & Luxe Cinemas",
      "Palladium luxury shopping wing"
    ],
    "bestTimeToVisit": "12:00 PM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "142, Velachery Rd, Velachery, Chennai 600042",
    "lat": 12.9918,
    "lng": 80.2172,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_express_avenue",
    "name": "Express Avenue",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Royapettah",
    "description": "Premier mall in central Chennai spanning 1.7 million sq ft with 8-screen PVR multiplex.",
    "famousFor": [
      "Central Chennai premium mall",
      "PVR multiplex & Fun City arcade",
      "Massive central food court"
    ],
    "bestTimeToVisit": "11:00 AM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "Club House Rd, Royapettah, Chennai 600002",
    "lat": 13.0589,
    "lng": 80.2642,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_vr_chennai",
    "name": "VR Chennai",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Anna Nagar",
    "description": "Temple gopuram inspired architectural mall with Kolam patterns & PVR ICON cinema.",
    "famousFor": [
      "Dravidian gopuram inspired architecture",
      "PVR ICON multi-screen cinema",
      "Open courtyard pop-up markets"
    ],
    "bestTimeToVisit": "12:00 PM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "100 Feet Rd, Anna Nagar, Chennai 600040",
    "lat": 13.0845,
    "lng": 80.1965,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_forum_vijaya_mall",
    "name": "Forum Vijaya Mall",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Vadapalani",
    "description": "Spacious 650,000 sq ft mall in Vadapalani with 9-screen SPI Palazzo multiplex.",
    "famousFor": [
      "SPI Palazzo grand multiplex",
      "Fun City & VR games zone",
      "Vadapalani metro station connectivity"
    ],
    "bestTimeToVisit": "11:00 AM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "183, Arcot Rd, Vadapalani, Chennai 600026",
    "lat": 13.0512,
    "lng": 80.2085,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_ampa_skywalk",
    "name": "Ampa Skywalk",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Aminjikarai",
    "description": "One of Chennai's earliest modern shopping malls featuring PVR cinemas & food court.",
    "famousFor": [
      "One of Chennai's first modern malls",
      "PVR Cinemas & Gaming Zone",
      "Located on Poonamallee High Road"
    ],
    "bestTimeToVisit": "11:00 AM - 9:30 PM",
    "timings": "10:00 AM - 10:00 PM",
    "locationAddress": "Poonamallee High Rd, Aminjikarai, Chennai 600029",
    "lat": 13.0728,
    "lng": 80.2185,
    "icon": "\ud83c\udfec"
  },
  {
    "id": "chennai_vgp_universal_kingdom",
    "name": "VGP Universal Kingdom",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9750 - Entry & Rides",
    "area": "ECR",
    "description": "Iconic beachside amusement theme park featuring roller coasters, wave pool & Ferris wheel.",
    "famousFor": [
      "High thrill roller coasters & rides",
      "Wave pool water park complex",
      "Beachfront lawn resort atmosphere"
    ],
    "bestTimeToVisit": "10:00 AM - 4:00 PM",
    "timings": "10:00 AM - 7:30 PM Daily",
    "locationAddress": "East Coast Road, Injambakkam, Chennai 600115",
    "lat": 12.91,
    "lng": 80.252,
    "icon": "\ud83c\udfa2"
  },
  {
    "id": "chennai_vgp_marine_kingdom",
    "name": "VGP Marine Kingdom",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9695 - Adults",
    "area": "ECR",
    "description": "India's 1st walk-through underwater aquarium with 70-meter tunnel & sharks.",
    "famousFor": [
      "70-meter walk-through underwater tunnel",
      "Live Scuba Diver Feeding shows",
      "200+ marine species including sharks"
    ],
    "bestTimeToVisit": "10:00 AM - 3:00 PM",
    "timings": "10:00 AM - 7:30 PM Daily",
    "locationAddress": "East Coast Road, Injambakkam, Chennai 600115",
    "lat": 12.9103,
    "lng": 80.2524,
    "icon": "\ud83e\udd88"
  },
  {
    "id": "chennai_mgm_dizzee_world",
    "name": "MGM Dizzee World",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9899 - Unlimited Rides",
    "area": "ECR",
    "description": "High-thrill amusement park featuring Revolution roller coaster, wave pool & Dizzee Express.",
    "famousFor": [
      "High thrill roller coasters (Revolution)",
      "Massive Water World wave pool",
      "Beachside ECR theme park"
    ],
    "bestTimeToVisit": "10:30 AM - 5:00 PM",
    "timings": "10:30 AM - 6:30 PM",
    "locationAddress": "East Coast Road, Muttukadu, Chennai 603112",
    "lat": 12.8239,
    "lng": 80.2431,
    "icon": "\ud83c\udfa2"
  },
  {
    "id": "chennai_snow_kingdom",
    "name": "Snow Kingdom",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9650 - Ticket",
    "area": "ECR",
    "description": "Indoor sub-zero snow theme park with real snow slides, snowmen & toboggans.",
    "famousFor": [
      "Sub-zero (-5\u00b0C) real snow environment",
      "Snow mountain slides & toboggans",
      "Adjacent to VGP Universal Kingdom"
    ],
    "bestTimeToVisit": "10:00 AM - 6:00 PM",
    "timings": "10:00 AM - 8:00 PM",
    "locationAddress": "East Coast Road, Injambakkam, Chennai 600115",
    "lat": 12.9105,
    "lng": 80.2522,
    "icon": "\u2744\ufe0f"
  },
  {
    "id": "chennai_queensland",
    "name": "Queensland",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9750 - Adults",
    "area": "Poonamallee",
    "description": "70-acre theme park on Chennai-Bengaluru highway featuring 51 rides & 150-ft Free Fall.",
    "famousFor": [
      "51 thrill land & water rides included",
      "150-foot Free Fall Drop Tower",
      "Himalayan Coaster & Cable Car"
    ],
    "bestTimeToVisit": "10:00 AM - 4:30 PM",
    "timings": "10:00 AM - 6:00 PM (Closed Mondays)",
    "locationAddress": "Chennai-Bengaluru Highway, Palanjur, Chennai 600123",
    "lat": 13.0306,
    "lng": 80.0264,
    "icon": "\ud83c\udfa1"
  },
  {
    "id": "chennai_kishkinta",
    "name": "Kishkinta",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9800 - Adults",
    "area": "Tambaram",
    "description": "110-acre water and amusement theme park near Tambaram with wave pools & water slides.",
    "famousFor": [
      "110-acre sprawling water theme park",
      "Massive Wave Pool & Water Volcano",
      "3D theater & roller coasters"
    ],
    "bestTimeToVisit": "10:30 AM - 5:00 PM",
    "timings": "10:30 AM - 6:30 PM (Closed Wednesdays)",
    "locationAddress": "Darkas Ward No 2, Tambaram, Chennai 600045",
    "lat": 12.9125,
    "lng": 80.0755,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_muttukadu_boat_house",
    "name": "Muttukadu Boat House",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b9250 - Pedal Boat, \u20b9800 - Speedboat",
    "area": "Muttukadu",
    "description": "TTDC backwater boating center offering speedboats, jet skis, motorboats & pedal boats.",
    "famousFor": [
      "High-speed motorboat & jet ski rides",
      "Relaxing backwater pedal boating",
      "Seaside TTDC restaurant with lake view"
    ],
    "bestTimeToVisit": "9:30 AM - 11:30 AM & 3:30 PM - 5:30 PM",
    "timings": "9:00 AM - 6:00 PM Daily",
    "locationAddress": "East Coast Road, Muttukadu, Chennai 603112",
    "lat": 12.8156,
    "lng": 80.2419,
    "icon": "\ud83d\udea4"
  },
  {
    "id": "chennai_ma_chidambaram_stadium",
    "name": "M.A. Chidambaram Stadium",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "Match ticket based",
    "area": "Chepauk",
    "description": "Established in 1916 (Chepauk Stadium), home ground of Chennai Super Kings (CSK).",
    "famousFor": [
      "Home ground of Chennai Super Kings (CSK)",
      "2nd oldest active cricket stadium in India",
      "Historic Chepauk cricket crowd atmosphere"
    ],
    "bestTimeToVisit": "Match days",
    "timings": "Match days / Exterior view",
    "locationAddress": "Victoria Hostel Rd, Chepauk, Chennai 600005",
    "lat": 13.0628,
    "lng": 80.2792,
    "icon": "\ud83c\udfcf"
  },
  {
    "id": "chennai_kathipara_urban_square",
    "name": "Kathipara Urban Square",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Entry",
    "area": "Guindy",
    "description": "Urban park & food plaza built under cloverleaf Kathipara Flyover with play areas.",
    "famousFor": [
      "Built under cloverleaf flyover",
      "Food truck plaza & outdoor dining",
      "Children's play park & walking track"
    ],
    "bestTimeToVisit": "5:00 PM - 10:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Kathipara Junction, Guindy, Chennai 600016",
    "lat": 13.0072,
    "lng": 80.2052,
    "icon": "\ud83c\udf40"
  },
  {
    "id": "chennai_kovalam_surfing_area",
    "name": "Kovalam Surfing Area",
    "category": "Shopping & Exploration",
    "entryType": "paid",
    "priceInfo": "\u20b91200 - Lesson",
    "area": "Kovalam",
    "description": "Premier ocean surf school spot along Kovalam beach dunes.",
    "famousFor": [
      "Covelong Point Surf School lessons",
      "Ocean wave surfing morning swells",
      "Beachfront seafood cafes"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM",
    "timings": "6:00 AM - 6:00 PM",
    "locationAddress": "Kovalam Beach, ECR, Chennai 603112",
    "lat": 12.7895,
    "lng": 80.2515,
    "icon": "\ud83c\udfc4"
  },
  {
    "id": "chennai_muttukadu_backwaters",
    "name": "Muttukadu Backwaters",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "Muttukadu",
    "description": "Scenic coastal backwater lagoon surrounded by coconut groves.",
    "famousFor": [
      "Picturesque backwater lagoon view",
      "Spotting egrets & kingfishers",
      "Boating & jet skiing hub"
    ],
    "bestTimeToVisit": "4:00 PM - 6:30 PM",
    "timings": "Open 24/7",
    "locationAddress": "Muttukadu Lagoon, ECR, Chennai 603112",
    "lat": 12.813,
    "lng": 80.241,
    "icon": "\ud83c\udf34"
  },
  {
    "id": "chennai_covelong_fishing_village",
    "name": "Covelong Fishing Village",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Walk",
    "area": "Kovalam",
    "description": "Historic 18th-century Dutch & French trading port fishing village in Kovalam.",
    "famousFor": [
      "18th-century Dutch fort ruins nearby",
      "Authentic sea-to-table catamarans",
      "Coastal village culture"
    ],
    "bestTimeToVisit": "6:00 AM - 9:00 AM",
    "timings": "Open 24/7",
    "locationAddress": "Kovalam Village, ECR, Chennai 603112",
    "lat": 12.788,
    "lng": 80.2505,
    "icon": "\u26f5"
  },
  {
    "id": "chennai_kasimedu_fishing_village",
    "name": "Kasimedu Fishing Village",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Walk",
    "area": "Kasimedu",
    "description": "Coastal fishing community hub next to Kasimedu harbour with boat making yards.",
    "famousFor": [
      "Traditional boat building & net weaving",
      "Fresh seafood markets",
      "Coastal fishing culture"
    ],
    "bestTimeToVisit": "5:30 AM - 8:30 AM",
    "timings": "Open 24/7",
    "locationAddress": "Kasimedu, Royapuram, Chennai 600013",
    "lat": 13.1175,
    "lng": 80.2975,
    "icon": "\ud83c\udfa3"
  },
  {
    "id": "chennai_royapuram_fishing_harbour",
    "name": "Royapuram Fishing Harbour",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Walk",
    "area": "Royapuram",
    "description": "Historic harbour zone featuring catamarans and fresh seafood auction halls.",
    "famousFor": [
      "Historic 19th-century fishing harbour",
      "Catamaran launch site",
      "Fresh sea fish auctions"
    ],
    "bestTimeToVisit": "5:30 AM - 8:00 AM",
    "timings": "Open 24/7",
    "locationAddress": "Royapuram Harbour, Chennai 600013",
    "lat": 13.105,
    "lng": 80.295,
    "icon": "\u26f5"
  },
  {
    "id": "chennai_nettukuppam_fishing_village",
    "name": "Nettukuppam Fishing Village",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free Walk",
    "area": "Ennore",
    "description": "Northernmost fishing village in Chennai where river meets Bay of Bengal.",
    "famousFor": [
      "Northern tip of Chennai coastline",
      "Traditional fishing community",
      "Sea pier view"
    ],
    "bestTimeToVisit": "6:00 AM - 8:30 AM",
    "timings": "Open daylight hours",
    "locationAddress": "Nettukuppam, Ennore, Chennai 600057",
    "lat": 13.224,
    "lng": 80.329,
    "icon": "\ud83c\udf0a"
  },
  {
    "id": "chennai_chennai_port_view_area",
    "name": "Chennai Port View Area",
    "category": "Shopping & Exploration",
    "entryType": "free",
    "priceInfo": "Free View",
    "area": "North Chennai",
    "description": "Panoramic view of Chennai Port container ships & gantry cranes along Beach Road.",
    "famousFor": [
      "View of cargo ships & container gantry cranes",
      "India's 3rd oldest major port (Est. 1881)",
      "Coastal harbor skyline"
    ],
    "bestTimeToVisit": "5:00 PM - 7:00 PM",
    "timings": "Open 24/7",
    "locationAddress": "Rajaji Salai / Port Outer Rd, Chennai 600001",
    "lat": 13.09,
    "lng": 80.29,
    "icon": "\ud83d\udea2"
  }
];
