/** Keys used across itinerary, budget, and scrapbook tabs. */
export const TRIP_STORAGE_KEYS = {
  finance: "japan-trip-finance",
  scrapbook: "japan-trip-scrapbook",
  expanded: "japan-trip-expanded-days",
};

export function exportTripBundle() {
  const data = {};
  for (const key of Object.values(TRIP_STORAGE_KEYS)) {
    const raw = localStorage.getItem(key);
    if (raw != null) data[key] = JSON.parse(raw);
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function importTripBundle(bundle) {
  if (!bundle?.data || typeof bundle.data !== "object") {
    throw new Error("Invalid trip file");
  }
  for (const [key, value] of Object.entries(bundle.data)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function encodeBase64Utf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64Utf8(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

/** Build a URL others can open to load this trip's budget & scrapbook. */
export function createShareUrl() {
  const json = JSON.stringify(exportTripBundle());
  const encoded = encodeBase64Utf8(json);
  if (encoded.length > 14_000) {
    return {
      ok: false,
      reason:
        "Trip data is too large for a link (usually big photos). Use Export trip file instead.",
    };
  }
  const base = `${window.location.origin}${window.location.pathname}`;
  const sep = base.includes("?") ? "&" : "?";
  return { ok: true, url: `${base}${sep}share=${encodeURIComponent(encoded)}` };
}

/** Load shared trip from ?share= in the URL. Returns true if imported. */
export function loadShareFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const share = params.get("share");
  if (!share) return false;

  try {
    const bundle = JSON.parse(decodeBase64Utf8(decodeURIComponent(share)));
    importTripBundle(bundle);
    const clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", clean);
    return true;
  } catch {
    return false;
  }
}

export function downloadTripFile() {
  const bundle = exportTripBundle();
  const blob = new Blob([JSON.stringify(bundle, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `fukuoka-trip-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function readTripFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch {
        reject(new Error("Could not read trip file"));
      }
    };
    reader.onerror = () => reject(new Error("Could not read trip file"));
    reader.readAsText(file);
  });
}
