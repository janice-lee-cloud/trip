export const WEATHER_CONDITIONS = {
  en: {
    clear: "Clear",
    cloudy: "Partly cloudy",
    fog: "Fog",
    drizzle: "Drizzle",
    rain: "Rain",
    snow: "Snow",
    showers: "Showers",
    thunder: "Thunderstorms",
  },
  "zh-TW": {
    clear: "晴朗",
    cloudy: "多雲",
    fog: "有霧",
    drizzle: "毛毛雨",
    rain: "下雨",
    snow: "下雪",
    showers: "陣雨",
    thunder: "雷雨",
  },
};

export function getWeatherConditionLabel(category, locale) {
  const table = WEATHER_CONDITIONS[locale] ?? WEATHER_CONDITIONS.en;
  return table[category] ?? table.cloudy;
}
