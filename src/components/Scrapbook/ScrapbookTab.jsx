import { Camera, Plus, Star, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { tripImage } from "../../utils/images";
import { uid } from "../../utils/format";
import { btnPrimary, inputClass, sectionHeading, sectionLead } from "../../utils/ui";

const SCRAPBOOK_KEY = "japan-trip-scrapbook";

const PLACEHOLDER_MEMORIES = [
  {
    id: "mem-1",
    placeName: "Nakasu Yatai",
    rating: 5,
    thoughts: "Classic Hakata tonkotsu ramen at the riverside stalls.",
    imageUrl: tripImage("scrap-yatai.jpg"),
    imageData: null,
  },
  {
    id: "mem-2",
    placeName: "Miyajima Island",
    rating: 5,
    thoughts: "The floating torii gate and shoreline walk at golden hour.",
    imageUrl: tripImage("day-2.jpg"),
    imageData: null,
  },
  {
    id: "mem-3",
    placeName: "Yunotsubo Street, Yufuin",
    rating: 4,
    thoughts: "Boutique shopping and matcha desserts along the main street.",
    imageUrl: tripImage("day-4.jpg"),
    imageData: null,
  },
];

export default function ScrapbookTab() {
  const [memories, setMemories] = useLocalStorage(
    SCRAPBOOK_KEY,
    PLACEHOLDER_MEMORIES,
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
      alert("Please select an image under 2.5 MB for reliable local storage.");
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
          Travel journal
        </h2>
        <p className={sectionLead}>
          Document places visited with ratings, notes, and photos. Entries are
          saved locally in your browser as a demonstration of client-side
          persistence.
        </p>
      </div>

      <form onSubmit={addMemory} className="card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-accent" strokeWidth={2} aria-hidden />
          New journal entry
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Place name
            </span>
            <input
              name="placeName"
              required
              placeholder="e.g. Canal City Ramen Stadium"
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Rating
            </span>
            <select name="rating" defaultValue={5} className={`${inputClass} mt-1.5`}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} out of 5
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              Notes
            </span>
            <textarea
              name="thoughts"
              rows={3}
              placeholder="Highlights, recommendations, or details to remember."
              className={`${inputClass} mt-1.5`}
            />
          </label>
          <button type="submit" className={`${btnPrimary} sm:col-span-2`}>
            <Plus className="h-4 w-4" aria-hidden />
            Save entry
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
        <p className="text-center text-ink-muted py-12 card">
          No journal entries yet. Create your first entry above.
        </p>
      )}
    </section>
  );
}

function MemoryCard({ memory, onUpdate, onRemove, onUpload }) {
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
            <span className="text-xs font-semibold">Add photo</span>
          </button>
        )}
        <button
          type="button"
          onClick={onUpload}
          className="absolute bottom-2 right-2 rounded-full bg-white/95 p-2 shadow-card opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Change photo for ${memory.placeName}`}
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
            aria-label={`Remove ${memory.placeName}`}
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
            Notes
          </span>
          <textarea
            value={memory.thoughts}
            onChange={(e) => onUpdate({ thoughts: e.target.value })}
            rows={3}
            className={`${inputClass} mt-1.5 text-sm leading-relaxed`}
            placeholder="Add notes about this place…"
          />
        </label>
      </div>
    </article>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-0.5" role="group" aria-label={`Rating: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Rate ${star} out of 5`}
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
