# Fukuoka Travel Guide

A shareable **6-day Kyushu trip planner** (June 4–9, 2026): itinerary, budget tracker, scrapbook, and tools to **plan together with friends**.

## Your links

| Purpose | Link |
|--------|------|
| **GitHub project** (code, collaborators) | https://github.com/janice-lee-cloud/trip |
| **Live website** (anyone can open) | https://janice-lee-cloud.github.io/trip/ |
| **On your Mac only** | http://localhost:5173 — run `./start.sh` |

---

## Collaborate with friends

There are two ways to work together:

### 1. Plan the trip together (budget, scrapbook, notes)

On the live site (or localhost), use the **Plan together** bar:

1. **Copy share link** — sends friends a URL that loads your current budget & scrapbook in their browser.
2. **Export file** / **Import file** — full backup (best when you have lots of photos). Send the `.json` file by message or email; they click **Import file**.

**Tip:** After someone edits expenses or memories, they **Export** or **Copy share link** again so everyone stays in sync.

### 2. Collaborate on the website code (GitHub)

1. Push the project to GitHub (see [Publish](#publish-on-github-once) below).
2. Open **https://github.com/janice-lee-cloud/trip** → **Settings** → **Collaborators** → **Add people**.
3. Enter your friend’s **GitHub username** — they can clone, edit, and push changes.
4. Optional: make the repo **Public** under Settings → General so anyone can view and fork.

Friends clone with:

```bash
git clone https://github.com/janice-lee-cloud/trip.git
cd trip
./start.sh
```

---

## Publish on GitHub (once)

The live site shows **404** until your code is on GitHub and Pages is enabled.

1. In Terminal, if `git push` is stuck, press **Ctrl+C**, then:

   ```bash
   cd /Users/leewaikiu/projects/trip
   ./publish.sh
   ```

   - **Username:** `janice-lee-cloud`
   - **Password:** [Personal Access Token](https://github.com/settings/tokens) with **repo** scope (not your GitHub password)

2. **Settings** → **Pages** → **Source: GitHub Actions**  
   https://github.com/janice-lee-cloud/trip/settings/pages

3. **Actions** → wait for **Deploy to GitHub Pages** (green ✓)

4. Share **https://janice-lee-cloud.github.io/trip/**

---

## Local development

```bash
cd /Users/leewaikiu/projects/trip
./start.sh
```

Opens http://localhost:5173. Press `Ctrl+C` to stop.

---

## Project structure

```
src/
├── App.jsx
├── data/itinerary.js
├── utils/tripStorage.js    # export / import / share link
├── hooks/useLocalStorage.js
└── components/
    ├── Layout/             # Header, CollaborateBar, TabNav
    ├── Itinerary/
    ├── Finance/
    └── Scrapbook/
public/images/              # day card photos (bundled)
```
