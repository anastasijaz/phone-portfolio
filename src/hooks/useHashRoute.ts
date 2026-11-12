import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tiny history-aware hash router. "#/zollhof" → ["zollhof"], "#/calendar/msc" → ["calendar", "msc"].
 *
 * Every navigation is a real browser history entry tagged with its position (`idx`), so
 * "back" can always go back exactly one step in what the visitor actually did. Swiping
 * between home screen pages uses `replace`, so it doesn't fill the history.
 */
const parse = (hash: string) =>
  decodeURIComponent(hash.replace(/^#\/?/, ''))
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

const clean = (path: string) => path.replace(/^#?\/?/, '');
const readIdx = (): number | undefined => (window.history.state as { idx?: number } | null)?.idx;

export function useHashRoute() {
  const [segments, setSegments] = useState<string[]>(() => parse(window.location.hash));
  const idx = useRef(readIdx() ?? 0);

  useEffect(() => {
    // Tag the entry the visitor arrived on
    if (readIdx() === undefined) window.history.replaceState({ idx: 0 }, '');
    const sync = () => {
      const i = readIdx();
      if (i === undefined) {
        // A hash typed into the address bar: it's a new entry after the current one
        idx.current += 1;
        window.history.replaceState({ idx: idx.current }, '');
      } else {
        idx.current = i;
      }
      setSegments(parse(window.location.hash));
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = useCallback((path: string, opts?: { replace?: boolean }) => {
    const url = `#/${clean(path)}`;
    const current = window.location.hash || '#/';
    if (current === url) return;
    if (opts?.replace) {
      window.history.replaceState({ idx: idx.current }, '', url);
    } else {
      idx.current += 1;
      window.history.pushState({ idx: idx.current }, '', url);
    }
    setSegments(parse(url));
  }, []);

  /** Is there an earlier screen of this visit to go back to? */
  const canGoBack = useCallback(() => idx.current > 0, []);

  return { segments, path: segments.join('/'), navigate, canGoBack };
}

export const routeHref = (path: string) => `#/${clean(path)}`;
