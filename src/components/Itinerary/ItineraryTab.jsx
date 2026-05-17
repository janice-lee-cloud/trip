import { ITINERARY_DAYS, TRIP_META } from "../../data/itinerary";
import { useLocalStorage } from "../../hooks/useLocalStorage";
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
    <section className="space-y-6" aria-labelledby="itinerary-heading">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 id="itinerary-heading" className="font-display text-2xl font-semibold text-ink">
            Itinerary
          </h2>
          <p className="text-sm text-ink-muted mt-1 max-w-lg">
            {TRIP_META.tagline}. Tap a day to expand the timeline.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-white hover:border-matcha hover:text-matcha transition-colors"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-white hover:border-sakura hover:text-sakura transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="space-y-4">
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
