import {
  CATEGORY_STYLES,
  ITINERARY_DAYS,
  TRIP_META,
} from "../data/itinerary";
import {
  CATEGORY_STYLES_ZH,
  ITINERARY_DAYS_ZH,
  TRIP_META_ZH,
} from "./itineraryZh";

export function getTripMeta(locale) {
  if (locale !== "zh-TW") return TRIP_META;
  return { ...TRIP_META, ...TRIP_META_ZH };
}

export function getItineraryDays(locale) {
  if (locale !== "zh-TW") return ITINERARY_DAYS;

  return ITINERARY_DAYS.map((day, dayIndex) => {
    const zh = ITINERARY_DAYS_ZH[dayIndex];
    if (!zh) return day;

    return {
      ...day,
      weekday: zh.weekday ?? day.weekday,
      label: zh.label ?? day.label,
      imageAlt: zh.imageAlt ?? day.imageAlt,
      hotelNote: zh.hotelNote ?? day.hotelNote,
      badge: zh.badge !== undefined ? zh.badge : day.badge,
      events: day.events.map((event, eventIndex) => {
        const zhEvent = zh.events?.[eventIndex];
        if (!zhEvent) return event;
        return {
          ...event,
          title: zhEvent.title ?? event.title,
          description: zhEvent.description ?? event.description,
        };
      }),
    };
  });
}

export function getCategoryStyles(locale) {
  if (locale !== "zh-TW") return CATEGORY_STYLES;

  return Object.fromEntries(
    Object.entries(CATEGORY_STYLES).map(([key, style]) => [
      key,
      {
        ...style,
        label: CATEGORY_STYLES_ZH[key]?.label ?? style.label,
      },
    ]),
  );
}
