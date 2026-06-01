import { useEffect, useMemo, useState } from "react";
import { DAY_WEATHER_LOCATIONS } from "../data/weatherLocations";
import { fetchTripForecasts, getForecastForDay } from "../utils/weather";

/**
 * @param {{ id: string, date: string }[]} days
 */
export function useTripWeather(days) {
  const [byLocation, setByLocation] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const range = useMemo(() => {
    if (!days.length) return null;
    const dates = days.map((d) => d.date).sort();
    return { start: dates[0], end: dates[dates.length - 1] };
  }, [days]);

  useEffect(() => {
    if (!range) return;

    let cancelled = false;

    (async () => {
      setStatus("loading");
      setError(null);
      try {
        const locations = Object.values(DAY_WEATHER_LOCATIONS);
        const data = await fetchTripForecasts(
          locations,
          range.start,
          range.end,
        );
        if (!cancelled) {
          setByLocation(data);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load weather");
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [range?.start, range?.end]);

  const weatherByDayId = useMemo(() => {
    if (!byLocation) return {};
    const map = {};
    for (const day of days) {
      const loc = DAY_WEATHER_LOCATIONS[day.id];
      if (!loc) continue;
      map[day.id] = getForecastForDay(byLocation, loc.key, day.date);
    }
    return map;
  }, [byLocation, days]);

  return { weatherByDayId, status, error };
}
