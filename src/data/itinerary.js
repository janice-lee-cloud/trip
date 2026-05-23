import { tripImage } from "../utils/images";

export const TRIP_META = {
  title: "Fukuoka & Beyond",
  subtitle: "Hakata · Hiroshima · Miyajima · Yufuin",
  dates: "June 4 – 9, 2026",
  nights: 5,
  days: 6,
  eyebrow: "Couple's trip",
  heroLine:
    "A responsive travel app with a day-by-day itinerary, multi-currency budget tracking, and a visual journal across Kyushu.",
  tagline: "Six-day sample itinerary across western Japan.",
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
        title: "Arrive at Fukuoka Airport",
        description:
          "Take the subway (two stops) or a taxi to Hakata Station.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "18:30",
        title: "Check in — Hotel Trad Hakata",
        description: "Sumiyoshi 3-12-1. Drop luggage and settle in before dinner.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "20:00",
        title: "Nakasu Yatai food stalls",
        description:
          "Riverside open-air stalls serving Hakata-style tonkotsu ramen.",
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
    label: "Hiroshima & Miyajima",
    badge: "Shinkansen day trip",
    image: tripImage("day-2.jpg"),
    imageAlt: "Miyajima torii gate at the water",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "08:00",
        title: "Shinkansen to Hiroshima",
        description: "Direct bullet train from Hakata Station.",
        category: "transit",
        icon: "train",
      },
      {
        time: "10:30",
        title: "Peace Memorial Park & Museum",
        description: "A significant historical visit in central Hiroshima.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Miyajima Island",
        description:
          "Local train and ferry to the floating torii gate and shoreline walks.",
        category: "sightseeing",
        icon: "deer",
      },
      {
        time: "18:30",
        title: "Hiroshima-style okonomiyaki",
        description: "Dinner near Hiroshima Station before the return train.",
        category: "food",
        icon: "utensils",
      },
      {
        time: "20:30",
        title: "Return to Fukuoka",
        description: "Shinkansen back to Hotel Trad Hakata.",
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
    label: "Fukuoka Culture & Cafés",
    image: tripImage("day-3.jpg"),
    imageAlt: "Cozy Japanese café interior",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "09:30",
        title: "Kushida Shrine & Ohori Park",
        description: "Morning shrine visit followed by a walk around the pond.",
        category: "sightseeing",
        icon: "landmark",
      },
      {
        time: "13:00",
        title: "Tenjin Underground or teamLab Forest",
        description: "Choose shopping and lunch, or an immersive art experience.",
        category: "sightseeing",
        icon: "sparkles",
      },
      {
        time: "18:30",
        title: "Motsunabe or mizutaki dinner",
        description: "Regional specialties: beef offal hotpot or chicken broth.",
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
    label: "Yufuin Day Trip",
    badge: "Yufuin no Mori express",
    image: tripImage("day-4.jpg"),
    imageAlt: "Japanese countryside and onsen town scenery",
    hotelNote: "Overnight · Hotel Trad Hakata",
    events: [
      {
        time: "09:24",
        title: "Yufuin no Mori limited express",
        description:
          "Scenic train departure from Hakata—reserve a window seat when possible.",
        category: "transit",
        icon: "train",
        highlight: true,
      },
      {
        time: "11:30",
        title: "Yunotsubo Street to Lake Kinrin",
        description:
          "Boutiques, local snacks, and a lakeside walk through the onsen town.",
        category: "sightseeing",
        icon: "store",
      },
      {
        time: "15:00",
        title: "Foot bath and matcha desserts",
        description: "Public foot bath followed by traditional sweets.",
        category: "sightseeing",
        icon: "coffee",
      },
      {
        time: "17:00",
        title: "Return to Hakata",
        description: "Train back to Hotel Trad Hakata.",
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
    label: "Shopping & Onsen Stay",
    badge: "Hotel change",
    image: tripImage("day-5.jpg"),
    imageAlt: "Japanese onsen hot spring",
    hotelNote: "Overnight · Dormy Inn Premium Hakata Canal City",
    events: [
      {
        time: "10:00",
        title: "Check out — Hotel Trad Hakata",
        description: "Transfer to the Canal City area hotel.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "10:30",
        title: "Check in — Dormy Inn Premium",
        description:
          "Dormy Inn PREMIUM Hakata Canal City Mae. Store luggage before exploring.",
        category: "hotel",
        icon: "hotel",
        highlight: true,
      },
      {
        time: "11:00",
        title: "Canal City Hakata",
        description:
          "Retail complex with a fountain show and Ramen Stadium for lunch.",
        category: "sightseeing",
        icon: "shopping",
      },
      {
        time: "18:00",
        title: "Onsen and late-night ramen",
        description:
          "Hotel hot spring baths, with complimentary yonaki soba in the evening.",
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
    label: "Departure Day",
    image: tripImage("day-6.jpg"),
    imageAlt: "Japanese street and travel mood",
    events: [
      {
        time: "09:30",
        title: "Breakfast and checkout prep",
        description: "Hotel breakfast or a nearby bakery before packing.",
        category: "food",
        icon: "coffee",
      },
      {
        time: "11:00",
        title: "Souvenir shopping at Hakata Station",
        description:
          "Leave bags at the hotel desk, then pick up mentaiko, sweets, and gifts.",
        category: "shopping",
        icon: "gift",
      },
      {
        time: "13:30",
        title: "Collect luggage · Fukuoka Airport",
        description: "Subway to the airport with checked bags.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "14:15",
        title: "Airport check-in",
        description: "Arrive approximately two hours before departure.",
        category: "transit",
        icon: "plane",
      },
      {
        time: "16:15",
        title: "Departure",
        description: "End of the Kyushu itinerary.",
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
