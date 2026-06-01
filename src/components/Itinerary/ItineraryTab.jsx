import { useLanguage } from "../../context/LanguageContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { btnGhost } from "../../utils/ui";
import DayCard from "./DayCard";

const EXPANDED_KEY = "japan-trip-expanded-days";

export default function ItineraryTab() {
  const { itineraryDays, tripMeta, t } = useLanguage();

  const defaultExpanded = Object.fromEntries(
    itineraryDays.map((d) => [d.id, d.expanded ?? false]),
  );

  const [expandedMap, setExpandedMap] = useLocalStorage(
    EXPANDED_KEY,
    defaultExpanded,
  );

  const toggle = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedMap(Object.fromEntries(itineraryDays.map((d) => [d.id, true])));
  };

  const collapseAll = () => {
    setExpandedMap(Object.fromEntries(itineraryDays.map((d) => [d.id, false])));
  };

  return (
    <section className="space-y-8" aria-labelledby="itinerary-heading">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 id="itinerary-heading" className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            {t.itineraryHeading}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl leading-relaxed">
            {tripMeta.tagline} {t.itineraryLead}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={expandAll} className={btnGhost}>
            {t.expandAll}
          </button>
          <button type="button" onClick={collapseAll} className={btnGhost}>
            {t.collapseAll}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {itineraryDays.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            expanded={!!expandedMap[day.id]}
            onToggle={() => toggle(day.id)}
          />
        ))}
      </div>
    </section>
  );
}
