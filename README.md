# Japan 2026 — Couple's Trip Planner

A single-page React app for your **6-day, 5-night Fukuoka trip** (June 4–9, 2026): expandable itinerary, budget tracker, and scrapbook wall.

## Live website (anyone, any browser, any time)

After you push to GitHub and enable Pages (one-time setup below), the site is public at:

**https://janice-lee-cloud.github.io/trip/**

Share that link — friends and family can open it in Chrome, Safari, Edge, or on a phone. Each person’s budget and scrapbook notes save in **their own browser** (localStorage).

### One-time GitHub setup

1. **Push your code** (see [Push to GitHub](#push-to-github) below).
2. On GitHub: open **janice-lee-cloud/trip** → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from branch”).
4. Push to `main` again (or re-run the **Deploy to GitHub Pages** workflow under **Actions**).

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes automatically on every push to `main`.

---

## On your computer (development)

```bash
cd /Users/leewaikiu/projects/trip
./start.sh
```

Opens **http://localhost:5173** in your browser. Press `Ctrl+C` to stop.

> Do not open `index.html` from Finder — use `start.sh` or `npm run dev`.

---

## Push to GitHub

```bash
cd /Users/leewaikiu/projects/trip
git push -u origin main
```

- **Username:** `janice-lee-cloud`
- **Password:** [personal access token](https://github.com/settings/tokens) with `repo` scope

---

## Design

- **Palette:** cream `#FDFBF7`, ink `#2C2C2C`, sakura `#E8A7A1`, matcha `#8AA38B`, gold `#D4AF37`
- **Fonts:** Plus Jakarta Sans + Playfair Display
- **Icons:** Lucide React

## Project structure

```
src/
├── App.jsx
├── data/itinerary.js       # June 4–9 schedule
├── hooks/useLocalStorage.js
└── components/
    ├── Layout/
    ├── Itinerary/
    ├── Finance/
    └── Scrapbook/
```
