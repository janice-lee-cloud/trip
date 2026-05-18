import { tripImage } from "../utils/images";

export const TRIP_META = {
  title: "Fukuoka & Beyond",
  subtitle: "Hakata · Hiroshima · Miyajima · Yufuin",
  dates: "June 4 – 9, 2026",
  nights: 5,
  days: 6,
  tagline:
    "A 6-day, train-friendly Kyushu itinerary — ramen, shrines, day trips & photo spots",
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
    image: tripImage("day-1.jpg"),
    imageAlt: "Fukuoka city lights at night",
    hotelNote: "Check-in: Hotel Trad Hakata",
    expanded: true,
    events: [
      {
        time: "17:00",
        title: "Land at Fukuoka Airport",
        description:
          "Subway (2 stops) or taxi to Hakata Station — easy first landing in Kyushu.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "18:30",
        title: "Check-in — Hotel Trad Hakata",
        description: "Sumiyoshi 3-12-1. Drop bags, freshen up, snap a hotel mirror pic.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "20:00",
        title: "Nakasu Yatai food stalls",
        description:
          "Iconic riverside stalls — Hakata tonkotsu ramen under the lanterns. 📸",
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
    image: tripImage("day-2.jpg"),
    imageAlt: "Miyajima torii gate at the water",
    hotelNote: "Night 2 · Hotel Trad Hakata",
    events: [
      {
        time: "08:00",
        title: "Shinkansen to Hiroshima",
        description: "Bullet train from Hakata — book seats early for window views.",
        category: "transit",
        icon: "train",
      },
      {
        time: "10:30",
        title: "Peace Memorial Park & Museum",
        description: "A thoughtful, must-see stop in Hiroshima.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Miyajima Island",
        description:
          "Train + ferry. Floating torii, deer, and golden-hour photos by the shore.",
        category: "sightseeing",
        icon: "deer",
      },
      {
        time: "18:30",
        title: "Hiroshima-style Okonomiyaki",
        description: "Layered savory pancake near Hiroshima Station before the return train.",
        category: "food",
        icon: "utensils",
      },
      {
        time: "20:30",
        title: "Shinkansen back to Fukuoka",
        description: "Back to Hotel Trad Hakata for the night.",
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
    image: tripImage("day-3.jpg"),
    imageAlt: "Cozy Japanese café interior",
    hotelNote: "Night 3 · Hotel Trad Hakata",
    events: [
      {
        time: "09:30",
        title: "Kushida Shrine & Ohori Park",
        description: "Morning shrine visit, pond walk — calm, green, very photogenic.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Tenjin Underground or teamLab Forest",
        description: "Shopping, lunch, and aesthetic afternoon — pick your mood.",
        category: "sightseeing",
        icon: "sparkles",
      },
      {
        time: "18:30",
        title: "Motsunabe or Mizutaki dinner",
        description: "Fukuoka specialties — beef tripe hotpot or gentle chicken broth.",
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
    label: "Yufuin Day Trip ✨",
    badge: "🚄 Yufuin no Mori",
    image: tripImage("day-4.jpg"),
    imageAlt: "Japanese countryside and onsen town scenery",
    hotelNote: "Night 4 · Hotel Trad Hakata",
    events: [
      {
        time: "09:24",
        title: "Yufuin no Mori limited express",
        description:
          "Board the scenic green train from Hakata — worth the window seat.",
        category: "transit",
        icon: "train",
        highlight: true,
      },
      {
        time: "11:30",
        title: "Yunotsubo Street → Lake Kinrin",
        description:
          "Boutiques, Totoro shops, snacks, and misty lake views — main photo walk.",
        category: "sightseeing",
        icon: "store",
      },
      {
        time: "15:00",
        title: "Foot bath & matcha desserts",
        description: "Public ashi-yu and sweet treats — slow, dreamy afternoon.",
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
    image: tripImage("day-5.jpg"),
    imageAlt: "Japanese onsen hot spring",
    hotelNote: "Dormy Inn Premium Hakata Canal City",
    events: [
      {
        time: "10:00",
        title: "Check out — Hotel Trad Hakata",
        description: "Pack up and move to your Canal City base.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "10:30",
        title: "Check in — Dormy Inn Premium",
        description:
          "袖湊の湯 Dormy Inn PREMIUM Hakata Canal City Mae. Drop luggage first.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "11:00",
        title: "Canal City Hakata",
        description:
          "Shopping, fountain show, Ramen Stadium — easy content for stories.",
        category: "sightseeing",
        icon: "shopping",
      },
      {
        time: "18:00",
        title: "Onsen & Yonaki Soba",
        description:
          "Natural hot spring baths, then free late-night ramen at the hotel.",
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
    image: tripImage("day-6.jpg"),
    imageAlt: "Japanese street and travel mood",
    events: [
      {
        time: "09:30",
        title: "Slow morning & bakery breakfast",
        description: "Sleep in — hotel breakfast or a local bakery treat.",
        category: "food",
        icon: "coffee",
      },
      {
        time: "11:00",
        title: "Check out & souvenir hunt",
        description:
          "Leave bags at the desk. Hakata Station for Torimon, mentaiko & gifts.",
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
        description: "Sayōnara, Kyushu — until next time!",
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
    bg: "bg-blush-soft",
    text: "text-rose",
    border: "border-blush/50",
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
    bg: "bg-blush-soft",
    text: "text-rose",
    border: "border-blush/50",
  },
};
