import { useLanguage } from "../../context/LanguageContext";

export default function CategoryBadge({ category }) {
  const { categoryStyles } = useLanguage();
  const style = categoryStyles[category] ?? categoryStyles.sightseeing;

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
