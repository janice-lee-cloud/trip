import { useCallback, useRef, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const initialRef = useRef(initialValue);
  initialRef.current = initialValue;

  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialRef.current;
      return JSON.parse(raw);
    } catch {
      return initialRef.current;
    }
  }, [key]);

  const [stored, setStored] = useState(read);

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
