import { CATEGORY_STYLES } from "../../data/itinerary";

export default function CategoryBadge({ category }) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.sightseeing;
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        style.bg,
        style.text,
        style.border,
      ].join(" ")}
    >
      <span aria-hidden>{style.emoji}</span>
      {style.label}
    </span>
  );
}
