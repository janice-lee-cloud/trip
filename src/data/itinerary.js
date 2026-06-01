import { tripImage } from "../utils/images";

export const TRIP_META = {
  title: "Fukuoka & Beyond",
  subtitle: "Hakata · Itoshima · Kumamoto · Yufuin",
  dates: "June 4 – 9, 2026",
  nights: 5,
  days: 6,
  eyebrow: "CTT & Janice's trip",
  tagline:
    "Six days across northern Kyushu — beaches, castle town, and a weekday onsen escape.",
};

export const HOTELS = {
  tradHakata: {
    name: "Hotel Trad Hakata",
    address: "Sumiyoshi 3-12-1, Hakata-ku, Fukuoka",
    nights: [1, 2, 3, 4],
  },
  dormyInn: {
    name: "Dormy Inn Premium Hakata Canal City",
    address: "袖湊の湯 — Canal City area, Fukuoka",
    nights: [5],
  },
};

export const ITINERARY_DAYS = [
  {
    id: "day-1",
    dayNumber: 1,
    date: "2026-06-04",
    weekday: "Thu",
    label: "Arrival & Hakata Evening",
    image: tripImage("day-1.jpg"),
    imageAlt: "Fukuoka city lights at night",
    hotelNote: "Overnight · Hotel Trad Hakata",
    expanded: true,
    events: [
      {
        time: "17:00",
        title: "Fukuoka Airport",
        description:
          "Land at FUK (Domestic Terminal). Pick up a Suica/IC card at the station counter if needed.",
        category: "transit",
        icon: "plane",
        mapsQuery: "Fukuoka Airport FUK",
      },
      {
        time: "17:35",
        title: "Fukuoka City Subway to Hakata",
        description:
          "Kūkō Line to Hakata Station (~5 min). Exit toward Sumiyoshi for the hotel, or store bags in a coin locker at the station.",
        category: "transit",
        icon: "train",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "18:15",
        title: "Hotel Trad Hakata",
        description:
          "Check in at Sumiyoshi 3-12-1. Freshen up; confirm tomorrow’s Itoshima train times on your phone.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
        mapsQuery: "Hotel Trad Hakata Fukuoka",
      },
      {
        time: "19:00",
        title: "Snacks at Lawson Sumiyoshi",
        description:
          "Quick conbini stop for water, onigiri, or pudding if you want something light before the main dinner.",
        category: "food",
        icon: "store",
        mapsQuery: "Lawson Sumiyoshi Hakata Fukuoka",
      },
      {
        time: "20:00",
        title: "Nakasu Yatai",
        description:
          "Dinner at the riverside stalls — try Hakata tonkotsu ramen (e.g. Yamachan or a stall with a short queue). Stroll the Naka River after.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Nakasu Yatai Fukuoka",
      },
      {
        time: "21:30",
        title: "Kawabata Shopping Arcade",
        description:
          "Optional short walk through the covered arcade back toward the hotel if you still have energy.",
        category: "sightseeing",
        icon: "store",
        mapsQuery: "Kawabata Shopping Arcade Fukuoka",
      },
    ],
  },
  {
    id: "day-2",
    dayNumber: 2,
    date: "2026-06-05",
    weekday: "Fri",
    label: "Itoshima Beach Day",
    badge: "糸島 · West coast",
    image: tripImage("day-2.jpg"),
    imageAlt: "Itoshima coastline and beach",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "07:30",
        title: "Breakfast at Hotel Trad Hakata",
        description:
          "Hotel breakfast or grab pastries from a nearby bakery before heading west.",
        category: "food",
        icon: "coffee",
        mapsQuery: "Hotel Trad Hakata Fukuoka",
      },
      {
        time: "08:15",
        title: "JR Chikuhi Line to Chikuzen-Maebaru",
        description:
          "From Hakata → Chikuzen-Maebaru (~30–40 min). Itoshima is easiest with a rental car; otherwise use local buses/taxi between sights.",
        category: "transit",
        icon: "train",
        mapsQuery: "Chikuzen-Maebaru Station",
      },
      {
        time: "09:30",
        title: "Sakurai Futamigaura",
        description:
          "The “couple rocks” torii in the sea — iconic Itoshima photo spot. Morning light is best; walk the pebble beach.",
        category: "sightseeing",
        icon: "landmark",
        highlight: true,
        mapsQuery: "Sakurai Futamigaura Itoshima",
      },
      {
        time: "11:00",
        title: "Shiraito Falls",
        description:
          "Short forest walk to the wide white waterfall. Cool and shady — good break before lunch.",
        category: "sightseeing",
        icon: "landmark",
        mapsQuery: "Shiraito Falls Itoshima Fukuoka",
      },
      {
        time: "12:30",
        title: "Lunch — Itoshima seafood",
        description:
          "Try shirasu-don (whitebait bowl) or grilled oysters at a seaside restaurant near Keya or Fukae (seasonal). Book if weekend-adjacent.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Itoshima shirasu restaurant",
      },
      {
        time: "14:00",
        title: "Keya Beach & Genkai Sea views",
        description:
          "Relax on the sand, explore coastal roads, or visit a local café (e.g. milk pudding shops popular in Itoshima).",
        category: "sightseeing",
        icon: "deer",
        highlight: true,
        mapsQuery: "Keya Beach Itoshima",
      },
      {
        time: "16:00",
        title: "JR back to Hakata",
        description:
          "Return toward Fukuoka. Shower/change at the hotel before dinner.",
        category: "transit",
        icon: "train",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "18:30",
        title: "Dinner — Mentaiko & Hakata flavors",
        description:
          "Try mentaiko (spicy cod roe) dishes or izakaya near Hakata Station — classic Fukuoka specialty after a beach day.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Hakata mentaiko restaurant Fukuoka",
      },
    ],
  },
  {
    id: "day-3",
    dayNumber: 3,
    date: "2026-06-06",
    weekday: "Sat",
    label: "Kumamoto Day Trip",
    badge: "Shinkansen · 熊本",
    image: tripImage("day-3.jpg"),
    imageAlt: "Kumamoto Castle and city",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "07:00",
        title: "Breakfast near Hakata Station",
        description:
          "Early meal at the hotel or Hakata Station food hall (depachika) before the bullet train.",
        category: "food",
        icon: "coffee",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "07:45",
        title: "Shinkansen to Kumamoto",
        description:
          "Sakura or Mizuho from Hakata → Kumamoto (~40 min). Reserve seats if traveling on a busy Saturday.",
        category: "transit",
        icon: "train",
        mapsQuery: "Kumamoto Station",
      },
      {
        time: "09:00",
        title: "Kumamoto Castle",
        description:
          "Explore the castle grounds and museum area (reconstruction ongoing — still impressive from outside). Allow ~90 minutes.",
        category: "sightseeing",
        icon: "landmark",
        highlight: true,
        mapsQuery: "Kumamoto Castle",
      },
      {
        time: "11:00",
        title: "Sakurazaka & Kamitori shopping arcades",
        description:
          "Stroll covered arcades for snacks, Kumamoto souvenirs, and local crafts toward lunch.",
        category: "shopping",
        icon: "store",
        mapsQuery: "Shimotori Shopping Arcade Kumamoto",
      },
      {
        time: "12:30",
        title: "Lunch — Kumamoto ramen",
        description:
          "Try tonkotsu-style Kumamoto ramen (e.g. near Shimotori — several famous shops). Add garlic chips if offered.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Kumamoto ramen Shimotori",
      },
      {
        time: "14:00",
        title: "Suizenji Jojuen Garden",
        description:
          "Peaceful landscape garden with a miniature Mt. Fuji — tea house snacks optional (~1 hr).",
        category: "sightseeing",
        icon: "landmark",
        mapsQuery: "Suizenji Jojuen Garden Kumamoto",
      },
      {
        time: "15:30",
        title: "Kumamon Square",
        description:
          "Photo stop with Kumamon statues and character goods (check mascot appearance schedule online).",
        category: "sightseeing",
        icon: "sparkles",
        mapsQuery: "Kumamon Square Kumamoto",
      },
      {
        time: "17:00",
        title: "Shinkansen to Hakata",
        description:
          "Return to Fukuoka. Rest at the hotel before a lighter evening meal.",
        category: "transit",
        icon: "train",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "19:30",
        title: "Dinner — Ohori Park area",
        description:
          "Casual dinner near Ohori Park or back in Nakasu — keep it relaxed after a full travel day.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Ohori Park Fukuoka restaurants",
      },
    ],
  },
  {
    id: "day-4",
    dayNumber: 4,
    date: "2026-06-07",
    weekday: "Sun",
    label: "Fukuoka City Sunday",
    image: tripImage("day-4.jpg"),
    imageAlt: "Fukuoka shrine and park",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "08:30",
        title: "Breakfast — Bakeshop Raku",
        description:
          "Popular bakery near Ohori or hotel area for coffee and pastries (arrive early on Sunday).",
        category: "food",
        icon: "coffee",
        mapsQuery: "Bakeshop Raku Fukuoka",
      },
      {
        time: "09:30",
        title: "Kushida Shrine",
        description:
          "Hakata’s chief shrine — see the giant kazari-yama floats (display depends on season). Quick omamori stop.",
        category: "sightseeing",
        icon: "landmark",
        mapsQuery: "Kushida Shrine Fukuoka",
      },
      {
        time: "10:45",
        title: "Ohori Park",
        description:
          "Walk the lake loop (~2 km), cross the red bridge to Maizuru Park and Fukuoka Castle ruins.",
        category: "sightseeing",
        icon: "landmark",
        mapsQuery: "Ohori Park Fukuoka",
      },
      {
        time: "12:30",
        title: "Lunch — Tenjin",
        description:
          "Udon or ramen in Tenjin underground mall, or try mizutaki (chicken hotpot) — another Hakata classic.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Tenjin Underground Shopping Center Fukuoka",
      },
      {
        time: "14:30",
        title: "teamLab Forest Fukuoka",
        description:
          "Immersive digital art in Tenjin (timed entry — book tickets in advance). Allow ~2 hours.",
        category: "sightseeing",
        icon: "sparkles",
        mapsQuery: "teamLab Forest Fukuoka",
      },
      {
        time: "17:00",
        title: "Fukuoka Tower & Momochi Seaside",
        description:
          "Optional: sunset views from the tower or a stroll along Momochi beach before dinner.",
        category: "sightseeing",
        icon: "landmark",
        highlight: true,
        mapsQuery: "Fukuoka Tower",
      },
      {
        time: "19:00",
        title: "Dinner — Motsunabe",
        description:
          "Hakata motsunabe (beef offal hotpot) — hearty Sunday dinner. Many shops near Nakasu or Hakata.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Hakata Motsunabe Yamanaka Fukuoka",
      },
    ],
  },
  {
    id: "day-5",
    dayNumber: 5,
    date: "2026-06-08",
    weekday: "Mon",
    label: "Yufuin (Weekday) & Canal City",
    badge: "Weekday · less crowds",
    image: tripImage("day-5.jpg"),
    imageAlt: "Yufuin onsen town and countryside",
    hotelNote: "Overnight · Dormy Inn Premium Hakata Canal City",
    events: [
      {
        time: "07:00",
        title: "Early breakfast & checkout",
        description:
          "Check out of Hotel Trad Hakata; leave large bags at the front desk (pick up after Yufuin). Pack a day bag.",
        category: "hotel",
        icon: "hotel",
        mapsQuery: "Hotel Trad Hakata Fukuoka",
      },
      {
        time: "08:00",
        title: "Yufuin no Mori limited express",
        description:
          "Scenic train Hakata → Yufuin (~2 hr). Monday is quieter than weekend — reserve window seats ahead.",
        category: "transit",
        icon: "train",
        highlight: true,
        mapsQuery: "Yufuin Station",
      },
      {
        time: "10:30",
        title: "Yunotsubo Street",
        description:
          "Main shopping street — croquettes, cheese rolls, local crafts. Browse before the lunch rush.",
        category: "sightseeing",
        icon: "store",
        mapsQuery: "Yunotsubo Street Yufuin",
      },
      {
        time: "12:00",
        title: "Lunch — Yufuin",
        description:
          "Try local beef (Yufuin wagyu bowls), soba, or café lunch along Yunotsubo or side alleys.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Yunotsubo Street Yufuin restaurants",
      },
      {
        time: "13:30",
        title: "Lake Kinrin",
        description:
          "Walk the lake loop; morning mist is famous but afternoon is still scenic. Stop for matcha soft-serve.",
        category: "sightseeing",
        icon: "landmark",
        mapsQuery: "Lake Kinrin Yufuin",
      },
      {
        time: "15:00",
        title: "Foot bath & Bussanji Street",
        description:
          "Free public foot bath near the station, then quieter back-street galleries and sweets shops.",
        category: "sightseeing",
        icon: "coffee",
        mapsQuery: "Yufuin foot bath station",
      },
      {
        time: "16:30",
        title: "Train back to Hakata",
        description:
          "Return to Fukuoka. Collect luggage at Hotel Trad if stored there.",
        category: "transit",
        icon: "train",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "18:00",
        title: "Dormy Inn Premium Hakata Canal City",
        description:
          "Check in — onsen on-site (袖湊の湯). Drop bags and head to Canal City for dinner.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
        mapsQuery: "Dormy Inn Premium Hakata Canal City Mae",
      },
      {
        time: "19:00",
        title: "Canal City Hakata — Ramen Stadium",
        description:
          "Dinner at the ramen food court (try multiple half-size bowls). Fountain show in the evening if timing aligns.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Canal City Hakata Ramen Stadium",
      },
      {
        time: "21:30",
        title: "Hotel onsen & yonaki soba",
        description:
          "Relax in the Dormy Inn hot spring, then complimentary late-night ramen (夜鳴きそば) at the hotel.",
        category: "sightseeing",
        icon: "bath",
        highlight: true,
        mapsQuery: "Dormy Inn Premium Hakata Canal City Mae",
      },
    ],
  },
  {
    id: "day-6",
    dayNumber: 6,
    date: "2026-06-09",
    weekday: "Tue",
    label: "Departure Day",
    image: tripImage("day-6.jpg"),
    imageAlt: "Japanese street and travel mood",
    events: [
      {
        time: "08:00",
        title: "Breakfast at Dormy Inn",
        description:
          "Hotel breakfast buffet or quick bite before checkout. Final onsen optional if time allows.",
        category: "food",
        icon: "coffee",
        mapsQuery: "Dormy Inn Premium Hakata Canal City Mae",
      },
      {
        time: "09:30",
        title: "Checkout & Hakata Station",
        description:
          "Check out; walk or subway to Hakata Station with luggage.",
        category: "hotel",
        icon: "hotel",
        mapsQuery: "Hakata Station Fukuoka",
      },
      {
        time: "10:00",
        title: "Souvenir shopping — Hakata Station",
        description:
          "Depachika basement: mentaiko, Hakata Torimon manju, local snacks. Allow ~45 minutes.",
        category: "shopping",
        icon: "gift",
        highlight: true,
        mapsQuery: "Hakata Station Amu Plaza",
      },
      {
        time: "11:30",
        title: "Lunch — Station ramen",
        description:
          "Last bowl of Hakata ramen at the station (e.g. Hakata Ippudo Express or similar) before the airport.",
        category: "food",
        icon: "utensils",
        mapsQuery: "Hakata Station ramen",
      },
      {
        time: "13:00",
        title: "Fukuoka City Subway to Airport",
        description:
          "Kūkō Line Hakata → Fukuoka Airport (~5 min). Aim to arrive ~2 hours before international departure.",
        category: "transit",
        icon: "plane",
        mapsQuery: "Fukuoka Airport FUK",
      },
      {
        time: "13:30",
        title: "Fukuoka Airport check-in",
        description:
          "Check in, duty-free, and gate. Pick up any last-minute KitKat regional flavors.",
        category: "transit",
        icon: "plane",
        mapsQuery: "Fukuoka Airport International Terminal",
      },
      {
        time: "16:15",
        title: "Departure",
        description:
          "Flight home — end of the Kyushu trip. Sayonara until next time!",
        category: "transit",
        icon: "heart",
        mapsQuery: "Fukuoka Airport FUK",
      },
    ],
  },
];

export const CATEGORY_STYLES = {
  food: {
    label: "Food",
    emoji: "🍜",
    bg: "bg-accent-soft",
    text: "text-accent-muted",
    border: "border-accent/30",
  },
  sightseeing: {
    label: "Sightseeing",
    emoji: "⛩️",
    bg: "bg-matcha-soft",
    text: "text-matcha",
    border: "border-matcha/30",
  },
  transit: {
    label: "Transit",
    emoji: "🚄",
    bg: "bg-gold-soft",
    text: "text-gold",
    border: "border-gold/30",
  },
  hotel: {
    label: "Hotel",
    emoji: "🏨",
    bg: "bg-cream",
    text: "text-ink-muted",
    border: "border-border",
  },
  shopping: {
    label: "Shopping",
    emoji: "🛍️",
    bg: "bg-accent-soft",
    text: "text-accent-muted",
    border: "border-accent/30",
  },
};
