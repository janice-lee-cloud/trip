const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const CACHE_KEY = "japan-trip-weather-cache";
const CACHE_TTL_MS = 60 * 60 * 1000;

/** WMO weather code → category for labels and icons. */
export function weatherCategory(code) {
  if (code === 0) return "clear";
  if (code <= 3) return "cloudy";
  if (code <= 48) return "fog";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "showers";
  if (code <= 86) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), data }),
    );
  } catch {
    /* quota or private mode */
  }
}

async function fetchLocationForecast(lat, lon, startDate, endDate) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ].join(","),
    timezone: "Asia/Tokyo",
    start_date: startDate,
    end_date: endDate,
  });

  const res = await fetch(`${FORECAST_URL}?${params}`);
  if (!res.ok) throw new Error(`Weather API ${res.status}`);
  return res.json();
}

/**
 * @returns {Record<string, Record<string, import('./weather').DayForecast>>}
 *   locationKey → date (YYYY-MM-DD) → forecast
 */
export async function fetchTripForecasts(locations, startDate, endDate) {
  const cached = readCache();
  if (cached?.startDate === startDate && cached?.endDate === endDate) {
    return cached.byLocation;
  }

  const unique = new Map();
  for (const loc of locations) {
    if (!unique.has(loc.key)) unique.set(loc.key, loc);
  }

  const byLocation = {};

  await Promise.all(
    [...unique.values()].map(async ({ key, lat, lon }) => {
      const json = await fetchLocationForecast(lat, lon, startDate, endDate);
      const daily = json.daily;
      const byDate = {};
      daily.time.forEach((date, i) => {
        byDate[date] = {
          weatherCode: daily.weather_code[i],
          tempMax: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          precipChance: daily.precipitation_probability_max[i] ?? null,
        };
      });
      byLocation[key] = byDate;
    }),
  );

  writeCache({ startDate, endDate, byLocation });
  return byLocation;
}

/**
 * @param {Record<string, Record<string, DayForecast>>} byLocation
 * @param {string} locationKey
 * @param {string} date ISO date YYYY-MM-DD
 */
export function getForecastForDay(byLocation, locationKey, date) {
  return byLocation[locationKey]?.[date] ?? null;
}
