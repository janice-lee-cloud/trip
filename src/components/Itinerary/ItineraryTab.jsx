import { ITINERARY_DAYS, TRIP_META } from "../../data/itinerary";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { btnGhost } from "../../utils/ui";
import DayCard from "./DayCard";

const EXPANDED_KEY = "japan-trip-expanded-days";

const DEFAULT_EXPANDED = Object.fromEntries(
  ITINERARY_DAYS.map((d) => [d.id, d.expanded ?? false]),
);

export default function ItineraryTab() {
  const [expandedMap, setExpandedMap] = useLocalStorage(
    EXPANDED_KEY,
    DEFAULT_EXPANDED,
  );

  const toggle = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedMap(Object.fromEntries(ITINERARY_DAYS.map((d) => [d.id, true])));
  };

  const collapseAll = () => {
    setExpandedMap(Object.fromEntries(ITINERARY_DAYS.map((d) => [d.id, false])));
  };

  return (
    <section className="space-y-8" aria-labelledby="itinerary-heading">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 id="itinerary-heading" className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            Day-by-day itinerary
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl leading-relaxed">
            {TRIP_META.tagline} Select a day to view scheduled activities and
            transit notes.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={expandAll} className={btnGhost}>
            Expand all
          </button>
          <button type="button" onClick={collapseAll} className={btnGhost}>
            Collapse all
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {ITINERARY_DAYS.map((day) => (
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
