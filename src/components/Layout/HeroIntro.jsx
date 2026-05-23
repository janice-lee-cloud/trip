import { TRIP_META } from "../../data/itinerary";

const STACK = ["React 19", "Vite 6", "Tailwind CSS 4", "Local persistence"];

export default function HeroIntro() {
  return (
    <section
      className="border-b border-border bg-surface/60"
      aria-label="About this application"
    >
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6">
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
          {TRIP_META.heroLine}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-semibold text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
