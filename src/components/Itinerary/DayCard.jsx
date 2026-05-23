import { ChevronDown, Hotel } from "lucide-react";
import { formatDateShort } from "../../utils/format";
import TimelineItem from "./TimelineItem";

export default function DayCard({ day, expanded, onToggle }) {
  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-expanded={expanded}
        aria-controls={`timeline-${day.id}`}
      >
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={day.image}
            alt={day.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-cream">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-1.5">
              Day {day.dayNumber} · {day.weekday} · {formatDateShort(day.date)}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight">
              {day.label}
            </h3>
            {day.badge && (
              <span className="inline-block mt-2.5 text-xs font-medium bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                {day.badge}
              </span>
            )}
          </div>
          <span
            className={[
              "absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-card transition-transform duration-200",
              expanded ? "rotate-180" : "",
            ].join(" ")}
            aria-hidden
          >
            <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </button>

      {day.hotelNote && (
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-matcha-soft/70 border-b border-border text-sm font-medium text-matcha">
          <Hotel className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          {day.hotelNote}
        </div>
      )}

      {expanded && (
        <ol
          id={`timeline-${day.id}`}
          className="px-4 sm:px-6 py-6 list-none m-0"
        >
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
