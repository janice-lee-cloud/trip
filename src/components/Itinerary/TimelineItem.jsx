import {
  Bath,
  Coffee,
  Gift,
  Heart,
  Hotel,
  Landmark,
  Plane,
  ShoppingBag,
  Sparkles,
  Store,
  Train,
  Utensils,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { googleMapsUrl } from "../../utils/maps";
import CategoryBadge from "./CategoryBadge";
import RestaurantList from "./RestaurantList";

const ICONS = {
  plane: Plane,
  hotel: Hotel,
  utensils: Utensils,
  train: Train,
  landmark: Landmark,
  deer: Landmark,
  sparkles: Sparkles,
  store: Store,
  coffee: Coffee,
  shopping: ShoppingBag,
  bath: Bath,
  gift: Gift,
  heart: Heart,
};

export default function TimelineItem({ dayId, event, isLast }) {
  const { locale, t } = useLanguage();
  const Icon = ICONS[event.icon] ?? Landmark;
  const mapsHref = googleMapsUrl(event.mapsQuery);
  const showRestaurants = event.category === "food";

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[15px] top-9 bottom-0 w-px bg-border"
          aria-hidden
        />
      )}
      <div className="flex flex-col items-center shrink-0 w-8">
        <span
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full border",
            event.highlight
              ? "border-gold bg-gold-soft text-gold"
              : "border-border bg-white text-ink-muted",
          ].join(" ")}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      </div>
      <article
        className={[
          "flex-1 min-w-0 rounded-2xl border p-4 transition-shadow",
          event.highlight
            ? "border-gold/50 bg-gold-soft/40 shadow-card"
            : "border-border bg-white/90 shadow-card hover:shadow-soft",
        ].join(" ")}
      >
        <div className="flex flex-wrap items-center gap-2 gap-y-1 mb-1.5">
          <time className="text-xs font-bold tabular-nums text-matcha">
            {event.time}
          </time>
          <CategoryBadge category={event.category} />
        </div>
        <h4 className="font-semibold text-ink text-[15px] leading-snug">
          {mapsHref ? (
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent/35 underline-offset-2 hover:text-accent hover:decoration-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </h4>
        <p className="mt-1 text-sm text-ink-muted leading-relaxed">
          {event.description}
        </p>
        {showRestaurants && (
          <RestaurantList
            dayId={dayId}
            eventTime={event.time}
            locale={locale}
            t={t}
          />
        )}
      </article>
    </li>
  );
}
