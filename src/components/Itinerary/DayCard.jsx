import { ChevronDown, Hotel } from "lucide-react";
import { formatDateShort } from "../../utils/format";
import TimelineItem from "./TimelineItem";

export default function DayCard({ day, expanded, onToggle }) {
  return (
    <article className="rounded-3xl border border-border bg-white/90 shadow-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={expanded}
      >
        <div className="relative h-36 sm:h-44 overflow-hidden">
          <img
            src={day.image}
            alt={day.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-cream">
            <p className="text-xs font-semibold uppercase tracking-widest text-sakura-soft mb-1">
              Day {day.dayNumber} · {day.weekday} · {formatDateShort(day.date)}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight">
              {day.label}
            </h3>
            {day.badge && (
              <span className="inline-block mt-2 text-xs font-medium bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                {day.badge}
              </span>
            )}
          </div>
          <span
            className={[
              "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-transform",
              expanded ? "rotate-180" : "",
            ].join(" ")}
          >
            <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </button>

      {day.hotelNote && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-matcha-soft/60 border-b border-border text-sm text-matcha font-medium">
          <Hotel className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {day.hotelNote}
        </div>
      )}

      {expanded && (
        <ol className="px-4 sm:px-5 py-5 list-none m-0">
          {day.events.map((event, i) => (
            <TimelineItem
              key={`${day.id}-${event.time}-${event.title}`}
              event={event}
              isLast={i === day.events.length - 1}
            />
          ))}
        </ol>
      )}
    </article>
  );
}
