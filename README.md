# Japan 2026 — Couple's Trip Planner

A single-page React app for your **6-day, 5-night Fukuoka trip** (June 4–9, 2026): expandable itinerary, budget tracker, and scrapbook wall. All data persists in **localStorage**.

## Design

- **Palette:** cream `#FDFBF7`, ink `#2C2C2C`, sakura `#E8A7A1`, matcha `#8AA38B`, gold `#D4AF37`
- **Fonts:** Plus Jakarta Sans + Playfair Display
- **Icons:** Lucide React

## Open in Chrome (or any browser)

**Easiest — double-click or run once in Terminal:**

```bash
cd /Users/leewaikiu/projects/trip
./start.sh
```

This installs dependencies if needed, starts the site, and opens **http://localhost:5173** in your default browser (Chrome, Safari, Edge, etc.).

**Manual:**

```bash
cd /Users/leewaikiu/projects/trip
./.tools/bin/npm install   # first time only
./.tools/bin/npm run dev
```

Then open **http://localhost:5173** in Google Chrome.

> **Note:** Do not open `index.html` directly from Finder — this app needs a local server. Use `start.sh` or `npm run dev` above.

## Build for production

```bash
npm run build
npm run preview
```

## Push to GitHub

```bash
git add .
git commit -m "Japan 2026 trip planner — React + Tailwind"
git push -u origin main
```

Use a [GitHub personal access token](https://github.com/settings/tokens) as the password if prompted.

## GitHub Pages

After pushing: repo **Settings → Pages →** deploy from branch `main`, folder `/ (root)` or `/dist` if you deploy the build output.

For `/dist`, use a GitHub Action or push `dist` to `gh-pages`. Simplest: use [Vite base](https://vite.dev/guide/static-deploy.html) `base: '/trip/'` and deploy `dist`.

## Project structure

```
src/
├── App.jsx                 # Tab shell
├── main.jsx
├── index.css               # Tailwind + design tokens
├── data/itinerary.js       # Full June 4–9 schedule
├── hooks/useLocalStorage.js
├── utils/format.js
└── components/
    ├── Layout/             # Header, TabNav
    ├── Itinerary/          # Timeline days
    ├── Finance/            # Budget + expenses
    └── Scrapbook/          # Memory cards
```

## Develop with Cursor

Open `/Users/leewaikiu/projects/trip` in Cursor and ask for features like dark mode, PDF export, or shared cloud sync.
