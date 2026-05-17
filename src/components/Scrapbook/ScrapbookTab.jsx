import { Camera, Plus, Star, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { uid } from "../../utils/format";

const SCRAPBOOK_KEY = "japan-trip-scrapbook";

const PLACEHOLDER_MEMORIES = [
  {
    id: "mem-1",
    placeName: "Nakasu Yatai",
    rating: 5,
    thoughts: "Cozy ramen by the river — our first night magic.",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    imageData: null,
  },
  {
    id: "mem-2",
    placeName: "Miyajima Island",
    rating: 5,
    thoughts: "Deer selfies and the floating torii at golden hour.",
    imageUrl:
      "https://images.unsplash.com/photo-1528164344727-475c46e1a597?w=600&q=80",
    imageData: null,
  },
  {
    id: "mem-3",
    placeName: "Yunotsubo Street, Yufuin",
    rating: 4,
    thoughts: "Totoro shop finds and matcha soft-serve heaven.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e712f627?w=600&q=80",
    imageData: null,
  },
];

const inputClass =
  "w-full rounded-xl border border-border bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-sakura/40 focus:border-sakura";

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
        imageUrl:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80",
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
      alert("Please choose an image under 2.5 MB so it saves reliably.");
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
    <section className="space-y-6" aria-labelledby="scrapbook-heading">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div>
        <h2
          id="scrapbook-heading"
          className="font-display text-2xl font-semibold text-ink"
        >
          Scrapbook & memory wall
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Pinterest-style cards for places, ratings, and your thoughts. Photos save
          locally on this device.
        </p>
      </div>

      <form
        onSubmit={addMemory}
        className="rounded-2xl border border-border bg-white/90 p-4 sm:p-5 shadow-card"
      >
        <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-sakura" strokeWidth={2} />
          Add a memory
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-ink-muted">
              Restaurant / place name
            </span>
            <input
              name="placeName"
              required
              placeholder="e.g. Dormy Inn Yonaki Soba"
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-ink-muted">Rating</span>
            <select name="rating" defaultValue={5} className={`${inputClass} mt-1`}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-ink-muted">
              Our thoughts & comments
            </span>
            <textarea
              name="thoughts"
              rows={3}
              placeholder="What made this moment special?"
              className={`${inputClass} mt-1`}
            />
          </label>
          <button
            type="submit"
            className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-ink text-cream py-2.5 text-sm font-semibold hover:bg-ink/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add to wall
          </button>
        </div>
      </form>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
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
        <p className="text-center text-ink-muted py-12">
          Your memory wall is empty — add your first place above.
        </p>
      )}
    </section>
  );
}

function MemoryCard({ memory, onUpdate, onRemove, onUpload }) {
  const src = memory.imageData || memory.imageUrl;

  return (
    <article className="break-inside-avoid rounded-2xl border border-border bg-white/95 shadow-card overflow-hidden mb-4">
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
            className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 bg-cream border-b border-border text-ink-muted hover:bg-sakura-soft/50 transition-colors"
          >
            <Camera className="h-8 w-8 text-sakura" strokeWidth={1.5} />
            <span className="text-xs font-medium">Tap to add photo</span>
          </button>
        )}
        <button
          type="button"
          onClick={onUpload}
          className="absolute bottom-2 right-2 rounded-full bg-white/90 p-2 shadow-card opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Change photo"
        >
          <Camera className="h-4 w-4 text-ink" strokeWidth={1.75} />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink leading-tight">
            {memory.placeName}
          </h3>
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 p-1 text-ink-muted hover:text-sakura"
            aria-label="Remove memory"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <StarRating
          value={memory.rating}
          onChange={(rating) => onUpdate({ rating })}
        />

        <label className="block">
          <span className="text-xs font-medium text-ink-muted">
            Our thoughts & comments
          </span>
          <textarea
            value={memory.thoughts}
            onChange={(e) => onUpdate({ thoughts: e.target.value })}
            rows={3}
            className={`${inputClass} mt-1 text-sm leading-relaxed`}
            placeholder="Write your memory…"
          />
        </label>
      </div>
    </article>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-0.5" role="group" aria-label={`Rating: ${value} stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
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
