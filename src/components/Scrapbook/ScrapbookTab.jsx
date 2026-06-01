import { Camera, Plus, Star, Trash2 } from "lucide-react";
import { useMemo, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { tripImage } from "../../utils/images";
import { uid } from "../../utils/format";
import { btnPrimary, inputClass, sectionHeading, sectionLead } from "../../utils/ui";

const SCRAPBOOK_KEY = "japan-trip-scrapbook";

const PLACEHOLDER_IMAGES = [
  "scrap-yatai.jpg",
  "day-2.jpg",
  "day-4.jpg",
];

function buildPlaceholderMemories(t) {
  return t.scrapbookDefaults.map((entry, index) => ({
    id: `mem-${index + 1}`,
    placeName: entry.placeName,
    rating: 5,
    thoughts: entry.thoughts,
    imageUrl: tripImage(PLACEHOLDER_IMAGES[index]),
    imageData: null,
  }));
}

export default function ScrapbookTab() {
  const { t } = useLanguage();
  const defaultMemories = useMemo(() => buildPlaceholderMemories(t), [t]);
  const [memories, setMemories] = useLocalStorage(
    SCRAPBOOK_KEY,
    defaultMemories,
  );
  const fileRef = useRef(null);
  const pendingIdRef = useRef(null);

  const addMemory = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const placeName = fd.get("placeName")?.toString().trim();
    const thoughts = fd.get("thoughts")?.toString().trim();
    const rating = Number(fd.get("rating")) || 5;

    if (!placeName) return;

    setMemories((prev) => [
      {
        id: uid(),
        placeName,
        rating,
        thoughts: thoughts || "",
        imageUrl: tripImage("day-6.jpg"),
        imageData: null,
      },
      ...prev,
    ]);
    e.target.reset();
  };

  const updateMemory = (id, patch) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  };

  const removeMemory = (id) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const triggerUpload = (id) => {
    pendingIdRef.current = id;
    fileRef.current?.click();
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    const id = pendingIdRef.current;
    if (!file || !id) return;

    if (file.size > 2_500_000) {
      alert(t.imageTooLarge);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateMemory(id, { imageData: reader.result, imageUrl: null });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
    pendingIdRef.current = null;
  };

  return (
    <section className="space-y-8" aria-labelledby="scrapbook-heading">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div>
        <h2 id="scrapbook-heading" className={sectionHeading}>
          {t.scrapbookHeading}
        </h2>
        <p className={sectionLead}>{t.scrapbookLead}</p>
      </div>

      <form onSubmit={addMemory} className="card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-accent" strokeWidth={2} aria-hidden />
          {t.newEntry}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.placeName}
            </span>
            <input
              name="placeName"
              required
              placeholder={t.placePlaceholder}
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.rating}
            </span>
            <select name="rating" defaultValue={5} className={`${inputClass} mt-1.5`}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {t.ratingOption(n)}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {t.notes}
            </span>
            <textarea
              name="thoughts"
              rows={3}
              placeholder={t.notesPlaceholder}
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <button type="submit" className={`${btnPrimary} sm:col-span-2`}>
            <Plus className="h-4 w-4" aria-hidden />
            {t.saveEntry}
          </button>
        </div>
      </form>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onUpdate={(patch) => updateMemory(memory.id, patch)}
            onRemove={() => removeMemory(memory.id)}
            onUpload={() => triggerUpload(memory.id)}
          />
        ))}
      </div>

      {memories.length === 0 && (
        <p className="text-center text-ink-muted py-12 card">{t.noMemories}</p>
      )}
    </section>
  );
}

function MemoryCard({ memory, onUpdate, onRemove, onUpload }) {
  const { t } = useLanguage();
  const src = memory.imageData || memory.imageUrl;

  return (
    <article className="break-inside-avoid card overflow-hidden mb-4">
      <div className="relative group">
        {src ? (
          <img
            src={src}
            alt={memory.placeName}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={onUpload}
            className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-cream border-b border-border text-ink-muted hover:bg-accent-soft/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <Camera className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden />
            <span className="text-xs font-semibold">{t.addPhoto}</span>
          </button>
        )}
        <button
          type="button"
          onClick={onUpload}
          className="absolute bottom-2 right-2 rounded-full bg-white/95 p-2 shadow-card opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={t.changePhotoAria(memory.placeName)}
        >
          <Camera className="h-4 w-4 text-ink" strokeWidth={1.75} />
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink leading-tight">
            {memory.placeName}
          </h3>
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 p-1.5 text-ink-muted hover:text-accent transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={t.removeMemoryAria(memory.placeName)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <StarRating
          value={memory.rating}
          onChange={(rating) => onUpdate({ rating })}
        />

        <label className="block">
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
            {t.notes}
          </span>
          <textarea
            value={memory.thoughts}
            onChange={(e) => onUpdate({ thoughts: e.target.value })}
            rows={3}
            className={`${inputClass} mt-1.5 text-sm leading-relaxed`}
            placeholder={t.memoryNotesPlaceholder}
          />
        </label>
      </div>
    </article>
  );
}

function StarRating({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="flex gap-0.5" role="group" aria-label={t.ratingAria(value)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={t.rateAria(star)}
        >
          <Star
            className={[
              "h-5 w-5 transition-colors",
              star <= value
                ? "fill-gold text-gold"
                : "fill-transparent text-border",
            ].join(" ")}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
