# Kyushu Trip Planner

A installable web app for **CTT & Janice's** 6-day Kyushu trip (June 4–9, 2026): day-by-day itinerary, HKD budget tracker, and travel journal. Built with React, Vite, and Tailwind CSS.

## Live site

**https://janice-lee-cloud.github.io/trip/**

Share the link or **install it on your phone** like an app (see [Install as app](#install-as-app-pwa) below). Each visitor’s budget and journal entries are saved in **their own browser** (localStorage).

## Features

- **Itinerary** — Yufuin, Kumamoto, Itoshima, and Fukuoka days with detailed meals and activities
- **Google Maps links** — tap any event title to open directions
- **Restaurant picks** — famous local spots per meal with [Tabelog](https://tabelog.com) review links (Japan’s OpenRice-style guides)
- **Weather** — daily forecast per area (Open-Meteo)
- **English / 繁中** — language toggle in the header
- **Budget** — track spending in JPY with live **HKD** conversion, default HK$20,000 budget, CSV export
- **Journal** — places, ratings, notes, and photos (stored locally)

## Install as app (PWA)

The site can be added to your home screen and opens full-screen.

| Device | How to install |
|--------|----------------|
| **iPhone (Safari)** | Share → **Add to Home Screen** |
| **Android (Chrome)** | Menu → **Install app** / **Add to Home screen** |
| **Desktop (Chrome / Edge)** | Install icon in the address bar |

App icon: `public/images/app_icon.jpg`

## Development

```bash
git clone https://github.com/janice-lee-cloud/trip.git
cd trip
npm install
npm run dev
```

Open **http://localhost:5173**. Do not open `index.html` from Finder — use the dev server.

Alternatively:

```bash
./start.sh
```

### Build & preview

```bash
# Local / custom hosting (root path)
npm run build
npm run preview

# GitHub Pages (base path /trip/)
npm run build:pages
npm run preview:pages
```

## Deploy to GitHub Pages

1. Push to the `main` branch on **janice-lee-cloud/trip**.
2. On GitHub: **Settings** → **Pages** → set **Source** to **GitHub Actions**.
3. The workflow `.github/workflows/deploy-pages.yml` builds with `npm run build:pages` on every push to `main`.

## Tech stack

- React 19 · Vite 6 · Tailwind CSS 4
- [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) — installable app + offline caching
- Lucide React icons
- Fonts: Plus Jakarta Sans + Cormorant Garamond

## Project structure

```
public/
  images/              # trip photos + app_icon.jpg (PWA icon)
src/
  App.jsx
  data/
    itinerary.js       # June 4–9 schedule
    mealRestaurants.js # restaurant picks per meal
    weatherLocations.js
  context/
    LanguageContext.jsx
  hooks/
    useLocalStorage.js
    useExchangeRate.js
    useTripWeather.js
  i18n/                # English + Traditional Chinese
  components/
    Layout/
    Itinerary/
    Finance/
    Scrapbook/
  utils/
```

## Design

- **Palette:** cream, ink, sakura, matcha, gold accents
- **UI:** card-based layout, sticky header, tab navigation

## License

Private trip planner — © 2026 CTT & Janice.
