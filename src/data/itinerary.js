export const TRIP_META = {
  title: "Japan 2026",
  subtitle: "Fukuoka · Hiroshima · Miyajima · Yufuin",
  dates: "June 4 – 9, 2026",
  nights: 5,
  days: 6,
  tagline: "A cozy couple's adventure — no car, all public transit",
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
    label: "Arrival & Hakata Night Vibes",
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839d54b9?w=800&q=80",
    imageAlt: "Fukuoka city lights at night",
    hotelNote: "Check-in: Hotel Trad Hakata",
    expanded: true,
    events: [
      {
        time: "17:00",
        title: "Land at Fukuoka Airport",
        description:
          "Take the subway (only 2 stops) or a taxi straight to Hakata Station.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "18:30",
        title: "Check-in — Hotel Trad Hakata",
        description: "Sumiyoshi 3-12-1. Drop bags and freshen up.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "20:00",
        title: "Nakasu Yatai food stalls",
        description:
          "Walk over for cozy Hakata Tonkotsu Ramen next to the river.",
        category: "food",
        icon: "utensils",
      },
    ],
  },
  {
    id: "day-2",
    dayNumber: 2,
    date: "2026-06-05",
    weekday: "Fri",
    label: "Hiroshima & Miyajima Day Trip",
    badge: "🚄 Shinkansen Route",
    image:
      "https://images.unsplash.com/photo-1528164344727-475c46e1a597?w=800&q=80",
    imageAlt: "Miyajima torii gate",
    hotelNote: "Night 2 · Hotel Trad Hakata",
    events: [
      {
        time: "08:00",
        title: "Shinkansen to Hiroshima",
        description: "Bullet train from Hakata Station — direct and smooth.",
        category: "transit",
        icon: "train",
      },
      {
        time: "10:30",
        title: "Peace Memorial Park & Museum",
        description: "A moving, essential visit in Hiroshima.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Miyajima Island",
        description:
          "Local train + ferry. Floating Torii Gate and cute wild deer.",
        category: "sightseeing",
        icon: "deer",
      },
      {
        time: "18:30",
        title: "Hiroshima-style Okonomiyaki",
        description: "Dinner near Hiroshima Station before heading back.",
        category: "food",
        icon: "utensils",
      },
      {
        time: "20:30",
        title: "Shinkansen back to Fukuoka",
        description: "Return to Hotel Trad Hakata for the night.",
        category: "transit",
        icon: "train",
      },
    ],
  },
  {
    id: "day-3",
    dayNumber: 3,
    date: "2026-06-06",
    weekday: "Sat",
    label: "Fukuoka Culture & Cute Cafés",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    imageAlt: "Japanese café aesthetic",
    hotelNote: "Night 3 · Hotel Trad Hakata",
    events: [
      {
        time: "09:30",
        title: "Kushida Shrine & Ohori Park",
        description: "Morning stroll — shrines, pond, and calm greenery.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Tenjin Underground or teamLab Forest",
        description: "Lunch and shopping — pick your vibe for the afternoon.",
        category: "sightseeing",
        icon: "sparkles",
      },
      {
        time: "18:30",
        title: "Motsunabe or Mizutaki dinner",
        description: "Local Fukuoka hotpot — beef tripe or chicken.",
        category: "food",
        icon: "utensils",
      },
    ],
  },
  {
    id: "day-4",
    dayNumber: 4,
    date: "2026-06-07",
    weekday: "Sun",
    label: "Romantic Yufuin Day Trip",
    badge: "🚄 Yufuin no Mori",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e712f627?w=800&q=80",
    imageAlt: "Japanese countryside and onsen town",
    hotelNote: "Night 4 · Hotel Trad Hakata",
    events: [
      {
        time: "09:24",
        title: "Yufuin no Mori limited express",
        description:
          "Board the beautiful green train from Hakata Station.",
        category: "transit",
        icon: "train",
        highlight: true,
      },
      {
        time: "11:30",
        title: "Yunotsubo Street → Lake Kinrin",
        description:
          "Boutique shops, Totoro stores, snacks, and lakeside views.",
        category: "sightseeing",
        icon: "store",
      },
      {
        time: "15:00",
        title: "Foot bath & matcha desserts",
        description: "Relax at a public ashi-yu and sweet treats.",
        category: "sightseeing",
        icon: "coffee",
      },
      {
        time: "17:00",
        title: "Train back to Hakata",
        description: "Return to Hotel Trad Hakata.",
        category: "transit",
        icon: "train",
      },
    ],
  },
  {
    id: "day-5",
    dayNumber: 5,
    date: "2026-06-08",
    weekday: "Mon",
    label: "Shopping & Onsen Luxury",
    badge: "🏨 Hotel Switch",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    imageAlt: "Japanese onsen hot spring",
    hotelNote: "Dormy Inn Premium Hakata Canal City",
    events: [
      {
        time: "10:00",
        title: "Check out — Hotel Trad Hakata",
        description: "Pack up and head to your new home base.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "10:30",
        title: "Check in — Dormy Inn Premium",
        description:
          "袖湊の湯 Dormy Inn PREMIUM Hakata Canal City Mae. Drop luggage.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "11:00",
        title: "Canal City Hakata",
        description:
          "Shopping, fountain show, and Ramen Stadium for lunch.",
        category: "sightseeing",
        icon: "shopping",
      },
      {
        time: "18:00",
        title: "Onsen & Yonaki Soba",
        description:
          "Unwind in natural hot spring baths. Free late-night ramen in the evening!",
        category: "sightseeing",
        icon: "bath",
      },
    ],
  },
  {
    id: "day-6",
    dayNumber: 6,
    date: "2026-06-09",
    weekday: "Tue",
    label: "Souvenirs & Departure",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80",
    imageAlt: "Fukuoka street and travel mood",
    events: [
      {
        time: "09:30",
        title: "Slow morning & bakery breakfast",
        description: "Sleep in — hotel breakfast or a gourmet bakery.",
        category: "food",
        icon: "coffee",
      },
      {
        time: "11:00",
        title: "Check out & souvenir hunt",
        description:
          "Leave bags at front desk. Hakata Station for Torimon cakes & gifts.",
        category: "shopping",
        icon: "gift",
      },
      {
        time: "13:30",
        title: "Collect bags → Fukuoka Airport",
        description: "Subway to the airport with luggage.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "14:15",
        title: "Airport check-in",
        description: "Arrive ~2 hours before your flight.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "16:15",
        title: "Departure ✈️",
        description: "Flight home — until next time, Japan!",
        category: "transit",
        icon: "heart",
        highlight: true,
      },
    ],
  },
];

export const CATEGORY_STYLES = {
  food: {
    label: "Food",
    emoji: "🍜",
    bg: "bg-sakura-soft",
    text: "text-[#b0706a]",
    border: "border-sakura/40",
  },
  sightseeing: {
    label: "Sightseeing",
    emoji: "⛩️",
    bg: "bg-matcha-soft",
    text: "text-matcha",
    border: "border-matcha/40",
  },
  transit: {
    label: "Transit",
    emoji: "🚄",
    bg: "bg-gold-soft",
    text: "text-[#9a7b1a]",
    border: "border-gold/40",
  },
  hotel: {
    label: "Hotel",
    emoji: "🏨",
    bg: "bg-[#f0eeeb]",
    text: "text-ink-muted",
    border: "border-border",
  },
  shopping: {
    label: "Shopping",
    emoji: "🛍️",
    bg: "bg-sakura-soft",
    text: "text-[#b0706a]",
    border: "border-sakura/40",
  },
};
