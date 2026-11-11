import { useCallback, useState } from 'react';

/** useState that persists to localStorage. Falls back silently when storage is blocked. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable (private mode etc.): keep in memory only */
      }
    },
    [key],
  );

  return [value, set] as const;
}
