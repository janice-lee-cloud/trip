import { Calendar, MapPin } from "lucide-react";
import { TRIP_META } from "../../data/itinerary";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-muted mb-2">
              {TRIP_META.eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-ink tracking-tight leading-tight">
              {TRIP_META.title}
            </h1>
            <p className="mt-2 text-ink-muted text-sm sm:text-base">
              {TRIP_META.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm text-ink shadow-card">
              <Calendar className="h-4 w-4 text-accent" strokeWidth={1.75} aria-hidden />
              {TRIP_META.dates}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm text-ink shadow-card">
              <MapPin className="h-4 w-4 text-matcha" strokeWidth={1.75} aria-hidden />
              {TRIP_META.days} days · {TRIP_META.nights} nights
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
