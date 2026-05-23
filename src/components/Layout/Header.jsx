import { CalendarHeart, MapPin } from "lucide-react";
import { TRIP_META } from "../../data/itinerary";

export default function Header() {
  return (
    <header className="border-b border-border bg-cream/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sakura mb-1">
              Couple&apos;s trip · No car
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
              {TRIP_META.title}
            </h1>
            <p className="mt-1 text-ink-muted text-sm sm:text-base">
              {TRIP_META.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1.5 shadow-card">
              <CalendarHeart className="h-4 w-4 text-sakura" strokeWidth={1.75} />
              {TRIP_META.dates}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1.5 shadow-card">
              <MapPin className="h-4 w-4 text-matcha" strokeWidth={1.75} />
              {TRIP_META.days} days · {TRIP_META.nights} nights
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
