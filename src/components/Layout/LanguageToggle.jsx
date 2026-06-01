import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm font-semibold text-ink shadow-card transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={t.langToggleAria}
      lang={locale === "zh-TW" ? "en" : "zh-Hant"}
    >
      <Languages className="h-4 w-4 text-accent" strokeWidth={1.75} aria-hidden />
      {t.langToggle}
    </button>
  );
}
