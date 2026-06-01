import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  Loader2,
  Snowflake,
  Sun,
} from "lucide-react";
import {
  DAY_WEATHER_LOCATIONS,
  LOCATION_NAMES,
} from "../../data/weatherLocations";
import { getWeatherConditionLabel } from "../../i18n/weatherLabels";
import { weatherCategory } from "../../utils/weather";

const ICONS = {
  clear: Sun,
  cloudy: CloudSun,
  fog: CloudFog,
  drizzle: CloudRain,
  rain: CloudRain,
  snow: Snowflake,
  showers: CloudRain,
  thunder: CloudLightning,
};

export default function DayWeather({ dayId, forecast, status, locale, t }) {
  const locationKey = dayId ? locationKeyForDay(dayId) : null;
  const placeName =
    locationKey && (LOCATION_NAMES[locale]?.[locationKey] ?? LOCATION_NAMES.en[locationKey]);

  if (status === "loading") {
    return (
      <div
        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white/90 border border-white/20"
        aria-label={t.weatherLoading}
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        <span>{t.weatherLoading}</span>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div
        className="inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm px-2.5 py-1 text-[11px] text-white/75 border border-white/15"
        title={t.weatherUnavailable}
      >
        <Cloud className="h-3.5 w-3.5" aria-hidden />
        <span>{t.weatherUnavailable}</span>
      </div>
    );
  }

  const category = weatherCategory(forecast.weatherCode);
  const Icon = ICONS[category] ?? CloudSun;
  const label = getWeatherConditionLabel(category, locale);
  const precip =
    forecast.precipChance != null ? `${Math.round(forecast.precipChance)}%` : null;

  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-white border border-white/20 max-w-[calc(100%-3rem)]"
      aria-label={t.weatherAria(label, forecast.tempMax, forecast.tempMin, precip)}
    >
      <span className="inline-flex items-center gap-1 shrink-0">
        <Icon className="h-3.5 w-3.5 text-gold-soft" strokeWidth={1.75} aria-hidden />
        <span className="tabular-nums">
          {forecast.tempMax}° / {forecast.tempMin}°
        </span>
      </span>
      <span className="text-white/85 hidden sm:inline">· {label}</span>
      {precip != null && (
        <span className="inline-flex items-center gap-0.5 text-white/80 shrink-0">
          <Droplets className="h-3 w-3" aria-hidden />
          {precip}
        </span>
      )}
      {placeName && (
        <span className="text-white/70 hidden md:inline">· {placeName}</span>
      )}
    </div>
  );
}

function locationKeyForDay(dayId) {
  return DAY_WEATHER_LOCATIONS[dayId]?.key;
}
