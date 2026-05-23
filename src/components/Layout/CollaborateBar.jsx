import { Download, Link2, Upload, Users } from "lucide-react";
import { useRef, useState } from "react";
import {
  createShareUrl,
  downloadTripFile,
  importTripBundle,
  readTripFile,
} from "../../utils/tripStorage";

export default function CollaborateBar() {
  const fileRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const flash = (message, isError = false) => {
    setStatus({ message, isError });
    window.setTimeout(() => setStatus(null), 5000);
  };

  const handleShareLink = async () => {
    setBusy(true);
    const result = createShareUrl();
    setBusy(false);
    if (!result.ok) {
      flash(result.reason, true);
      return;
    }
    try {
      await navigator.clipboard.writeText(result.url);
      flash("Share link copied! Send it so friends load your budget & scrapbook.");
    } catch {
      flash(`Copy this link: ${result.url}`);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const bundle = await readTripFile(file);
      importTripBundle(bundle);
      flash("Trip imported — reloading…");
      window.setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      flash(err.message || "Import failed", true);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <section
      className="border-b border-border bg-sakura-soft/40"
      aria-label="Collaborate on your trip"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted flex items-start gap-2">
            <Users className="h-4 w-4 text-rose shrink-0 mt-0.5" strokeWidth={1.75} />
            <span>
              <strong className="text-ink font-semibold">Plan together:</strong> share a
              link or file so everyone sees the same budget & scrapbook.
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImport}
            />
            <button
              type="button"
              disabled={busy}
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-3.5 py-2 text-xs font-semibold hover:bg-ink/90 transition-colors disabled:opacity-60"
            >
              <Link2 className="h-3.5 w-3.5" strokeWidth={2} />
              Copy share link
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => downloadTripFile()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-rose hover:text-rose transition-colors disabled:opacity-60"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export file
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-matcha hover:text-matcha transition-colors disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={2} />
              Import file
            </button>
          </div>
        </div>
        {status && (
          <p
            className={[
              "mt-2 text-xs font-medium",
              status.isError ? "text-rose" : "text-matcha",
            ].join(" ")}
            role="status"
          >
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
}
