import { ExternalLink, MapPin, Star } from "lucide-react";
import { getMealRestaurants, localizeRestaurant } from "../../data/mealRestaurants";
import { googleMapsUrl } from "../../utils/maps";

export default function RestaurantList({ dayId, eventTime, locale, t }) {
  const picks = getMealRestaurants(dayId, eventTime).map((r) =>
    localizeRestaurant(r, locale),
  );

  if (!picks.length) return null;

  return (
    <div className="mt-3 pt-3 border-t border-border/80">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted mb-2">
        {t.restaurantPicks}
      </p>
      <ul className="space-y-2.5">
        {picks.map((place) => {
          const mapsHref = googleMapsUrl(place.mapsQuery);
          return (
            <li
              key={place.tabelogUrl}
              className={[
                "rounded-xl border p-3 text-sm",
                place.recommended
                  ? "border-gold/50 bg-gold-soft/30"
                  : "border-border bg-cream/50",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink leading-snug flex items-center gap-1.5">
                    {place.recommended && (
                      <Star
                        className="h-3.5 w-3.5 text-gold fill-gold shrink-0"
                        aria-hidden
                      />
                    )}
                    {mapsHref ? (
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-accent/30 underline-offset-2 hover:text-accent"
                      >
                        {place.name}
                      </a>
                    ) : (
                      place.name
                    )}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    {place.note}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {mapsHref && (
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2 py-1 text-[11px] font-semibold text-ink-muted hover:text-ink hover:border-accent/40 transition-colors"
                      aria-label={`${t.openMap}: ${place.name}`}
                    >
                      <MapPin className="h-3 w-3" aria-hidden />
                      {t.openMap}
                    </a>
                  )}
                  <a
                    href={place.tabelogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-matcha/30 bg-matcha-soft px-2 py-1 text-[11px] font-semibold text-matcha hover:bg-matcha/15 transition-colors"
                    aria-label={`${t.viewOnTabelog}: ${place.name}`}
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden />
                    {t.viewOnTabelog}
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
