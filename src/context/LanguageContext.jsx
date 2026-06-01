import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getCategoryStyles, getItineraryDays, getTripMeta } from "../i18n/tripData";
import { UI } from "../i18n/ui";

const LOCALE_KEY = "japan-trip-locale";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useLocalStorage(LOCALE_KEY, "en");

  const setLocale = useCallback(
    (next) => {
      setLocaleState(next === "zh-TW" ? "zh-TW" : "en");
    },
    [setLocaleState],
  );

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "zh-TW" ? "en" : "zh-TW"));
  }, [setLocaleState]);

  const value = useMemo(() => {
    const strings = UI[locale] ?? UI.en;
    return {
      locale,
      setLocale,
      toggleLocale,
      t: strings,
      tripMeta: getTripMeta(locale),
      itineraryDays: getItineraryDays(locale),
      categoryStyles: getCategoryStyles(locale),
    };
  }, [locale, setLocale, toggleLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh-TW" ? "zh-Hant" : "en";
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
