import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [stored, setStored] = useState(read);

  useEffect(() => {
    setStored(read());
  }, [read]);

  const setValue = useCallback(
    (value) => {
      setStored((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch (e) {
          console.warn("localStorage save failed:", e);
        }
        return next;
      });
    },
    [key],
  );

  return [stored, setValue];
}
