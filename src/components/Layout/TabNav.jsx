import { BookOpen, CalendarDays, Wallet } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function TabNav({ active, onChange }) {
  const { t } = useLanguage();

  const tabs = [
    { id: "itinerary", label: t.tabItinerary, icon: CalendarDays },
    { id: "finance", label: t.tabFinance, icon: Wallet },
    { id: "scrapbook", label: t.tabScrapbook, icon: BookOpen },
  ];

  return (
    <nav
      className="mx-auto max-w-5xl px-4 sm:px-6 pt-4 sm:pt-5"
      aria-label={t.mainNavAria}
    >
      <div className="flex gap-1 p-1 rounded-2xl border border-border bg-surface/80 shadow-card">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={[
                "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold transition-all",
                isActive
                  ? "bg-ink text-cream shadow-soft"
                  : "text-ink-muted hover:text-ink hover:bg-cream",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.75} aria-hidden />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
