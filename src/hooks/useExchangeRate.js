import { useEffect, useState } from "react";

const CACHE_KEY = "japan-trip-fx-cache";
const CACHE_TTL_MS = 60 * 60 * 1000;

/** Offline fallback if all APIs fail (JPY → currency). */
const FALLBACK_RATES = {
  HKD: 0.051,
  USD: 0.0067,
  EUR: 0.0062,
  GBP: 0.0053,
  AUD: 0.010,
  SGD: 0.0090,
};

function readCache(currencyCode) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.currencyCode !== currencyCode) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(currencyCode, rate, date, isFallback = false) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        currencyCode,
        rate,
        date,
        isFallback,
        savedAt: Date.now(),
      }),
    );
  } catch {
    /* ignore */
  }
}

async function fetchFromFrankfurter(currencyCode) {
  const res = await fetch(
    `https://api.frankfurter.dev/v1/latest?from=JPY&to=${encodeURIComponent(currencyCode)}`,
  );
  if (!res.ok) throw new Error(`Frankfurter ${res.status}`);
  const data = await res.json();
  const rate = data.rates?.[currencyCode];
  if (rate == null) throw new Error("Rate missing");
  return { rate, date: data.date ?? null };
}

async function fetchFromOpenErApi(currencyCode) {
  const res = await fetch("https://open.er-api.com/v6/latest/JPY");
  if (!res.ok) throw new Error(`open.er-api ${res.status}`);
  const data = await res.json();
  if (data.result !== "success") throw new Error("open.er-api failed");
  const rate = data.rates?.[currencyCode];
  if (rate == null) throw new Error("Rate missing");
  return {
    rate,
    date: data.time_last_update
      ? data.time_last_update.slice(0, 10)
      : null,
  };
}

async function fetchLiveRate(currencyCode) {
  try {
    return await fetchFromFrankfurter(currencyCode);
  } catch {
    return await fetchFromOpenErApi(currencyCode);
  }
}

export function useExchangeRate(currencyCode) {
  const [rate, setRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);
  const [status, setStatus] = useState("loading");
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    if (!currencyCode) return;

    const cached = readCache(currencyCode);
    if (cached) {
      setRate(cached.rate);
      setRateDate(cached.date);
      setIsFallback(!!cached.isFallback);
      setStatus("ready");
    }

    let cancelled = false;

    (async () => {
      if (!cached) setStatus("loading");

      try {
        const { rate: liveRate, date } = await fetchLiveRate(currencyCode);
        if (!cancelled) {
          setRate(liveRate);
          setRateDate(date);
          setIsFallback(false);
          setStatus("ready");
          writeCache(currencyCode, liveRate, date, false);
        }
      } catch {
        const fallback = FALLBACK_RATES[currencyCode];
        if (!cancelled) {
          if (fallback != null) {
            setRate(fallback);
            setRateDate(null);
            setIsFallback(true);
            setStatus("ready");
            writeCache(currencyCode, fallback, null, true);
          } else if (!cached) {
            setRate(null);
            setStatus("error");
          }
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currencyCode]);

  return { rate, rateDate, status, isFallback };
}

export function jpyToHome(jpy, rate) {
  if (!rate || rate <= 0) return 0;
  return jpy * rate;
}

export function homeToJpy(home, rate) {
  if (!rate || rate <= 0) return 0;
  return Math.round(home / rate);
}
