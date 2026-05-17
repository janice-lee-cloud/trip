const STORAGE_KEY = "trip-planner-v1";

const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto, Japan",
    tag: "Culture",
    blurb: "Temples, tea houses, and bamboo groves.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e712f627?w=600&q=80",
  },
  {
    id: "lisbon",
    name: "Lisbon, Portugal",
    tag: "Coastal",
    blurb: "Tile-lined streets and Atlantic sunsets.",
    image:
      "https://images.unsplash.com/photo-1555881400-632adc84cfbb?w=600&q=80",
  },
  {
    id: "patagonia",
    name: "Patagonia",
    tag: "Adventure",
    blurb: "Glaciers, peaks, and wide-open trails.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    tag: "Markets",
    blurb: "Souks, riads, and desert day trips.",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d66?w=600&q=80",
  },
  {
    id: "reykjavik",
    name: "Reykjavík",
    tag: "Nordic",
    blurb: "Hot springs, waterfalls, and northern lights.",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80",
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    tag: "Relax",
    blurb: "Rice terraces, surf, and quiet villas.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
];

const DEFAULT_STATE = {
  tripName: "Weekend in Kyoto",
  tripStart: "",
  tripEnd: "",
  stops: ["Fushimi Inari", "Nishiki Market", "Arashiyama bamboo grove"],
  packing: [
    { id: "p1", text: "Passport", done: true },
    { id: "p2", text: "Comfortable walking shoes", done: true },
    { id: "p3", text: "Light rain jacket", done: false },
  ],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, packing: [...DEFAULT_STATE.packing] };
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_STATE, packing: [...DEFAULT_STATE.packing] };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDateRange(start, end) {
  if (!start && !end) return "Dates TBD";
  const opts = { month: "short", day: "numeric" };
  const s = start ? new Date(start + "T12:00:00").toLocaleDateString("en-US", opts) : "…";
  const e = end ? new Date(end + "T12:00:00").toLocaleDateString("en-US", opts) : "…";
  return `${s} – ${e}`;
}

function dayCount(start, end) {
  if (!start || !end) return "—";
  const a = new Date(start);
  const b = new Date(end);
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? String(diff) : "—";
}

let state = loadState();
let toastEl;

function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function renderDestinations() {
  const grid = document.getElementById("destination-grid");
  grid.innerHTML = DESTINATIONS.map(
    (d) => `
    <button type="button" class="destination-card" data-id="${d.id}">
      <span class="tag">${d.tag}</span>
      <img src="${d.image}" alt="" loading="lazy" width="600" height="400" />
      <div class="destination-card-body">
        <h3>${d.name}</h3>
        <p>${d.blurb}</p>
      </div>
    </button>
  `,
  ).join("");

  grid.querySelectorAll(".destination-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dest = DESTINATIONS.find((x) => x.id === btn.dataset.id);
      if (!dest) return;
      state.stops.push(dest.name);
      persistAndRender();
      showToast(`Added ${dest.name} to your itinerary`);
    });
  });
}

function renderItinerary() {
  const list = document.getElementById("itinerary-list");
  list.innerHTML = state.stops
    .map(
      (stop, i) => `
    <li class="itinerary-item">
      <span class="itinerary-num">${i + 1}</span>
      <span>${escapeHtml(stop)}</span>
      <button type="button" data-index="${i}" aria-label="Remove stop">Remove</button>
    </li>
  `,
    )
    .join("");

  list.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      state.stops.splice(idx, 1);
      persistAndRender();
    });
  });
}

function renderPacking() {
  const list = document.getElementById("packing-list");
  list.innerHTML = state.packing
    .map(
      (item) => `
    <li class="packing-item ${item.done ? "done" : ""}">
      <input type="checkbox" id="${item.id}" ${item.done ? "checked" : ""} />
      <label for="${item.id}">${escapeHtml(item.text)}</label>
      <button type="button" data-id="${item.id}" aria-label="Remove item">Remove</button>
    </li>
  `,
    )
    .join("");

  list.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      const item = state.packing.find((p) => p.id === cb.id);
      if (item) item.done = cb.checked;
      persistAndRender();
    });
  });

  list.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.packing = state.packing.filter((p) => p.id !== btn.dataset.id);
      persistAndRender();
    });
  });

  const done = state.packing.filter((p) => p.done).length;
  const total = state.packing.length;
  const progress = document.getElementById("packing-progress");
  progress.textContent =
    total === 0 ? "" : `${done} of ${total} items packed (${Math.round((done / total) * 100)}%)`;
}

function renderHero() {
  document.getElementById("hero-trip-name").textContent = state.tripName || "Untitled trip";
  document.getElementById("hero-trip-dates").textContent = formatDateRange(
    state.tripStart,
    state.tripEnd,
  );
  document.getElementById("stat-days").textContent = dayCount(state.tripStart, state.tripEnd);
  document.getElementById("stat-stops").textContent = String(state.stops.length);
  document.getElementById("stat-packed").textContent = String(
    state.packing.filter((p) => p.done).length,
  );
}

function renderForm() {
  document.getElementById("trip-name").value = state.tripName;
  document.getElementById("trip-start").value = state.tripStart;
  document.getElementById("trip-end").value = state.tripEnd;
}

function escapeHtml(str) {
  const el = document.createElement("div");
  el.textContent = str;
  return el.innerHTML;
}

function persistAndRender() {
  saveState(state);
  renderHero();
  renderItinerary();
  renderPacking();
}

function bindEvents() {
  const form = document.getElementById("trip-form");
  form.addEventListener("input", (e) => {
    if (e.target.id === "trip-name") state.tripName = e.target.value;
    if (e.target.id === "trip-start") state.tripStart = e.target.value;
    if (e.target.id === "trip-end") state.tripEnd = e.target.value;
    persistAndRender();
  });

  document.getElementById("btn-add-stop").addEventListener("click", () => {
    const input = document.getElementById("stop-input");
    const value = input.value.trim();
    if (!value) return;
    state.stops.push(value);
    input.value = "";
    persistAndRender();
    showToast("Stop added");
  });

  document.getElementById("stop-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("btn-add-stop").click();
    }
  });

  document.getElementById("packing-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("packing-input");
    const value = input.value.trim();
    if (!value) return;
    state.packing.push({ id: uid(), text: value, done: false });
    input.value = "";
    persistAndRender();
  });

  const modal = document.getElementById("modal-new-trip");
  document.getElementById("btn-new-trip").addEventListener("click", () => modal.showModal());

  modal.querySelector("form").addEventListener("close", () => {
    if (modal.returnValue !== "confirm") return;
    state = {
      tripName: "",
      tripStart: "",
      tripEnd: "",
      stops: [],
      packing: [],
    };
    persistAndRender();
    renderForm();
    showToast("Started a new trip");
  });

  modal.querySelector('[value="cancel"]').addEventListener("click", () => modal.close());
}

function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderDestinations();
  renderForm();
  bindEvents();
  persistAndRender();

}

init();
