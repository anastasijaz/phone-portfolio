import { useCallback, useEffect, useState } from 'react';

/**
 * Tiny hash router. "#/solhof" → ["solhof"], "#/settings/cv" → ["settings", "cv"].
 * No router library needed; the browser back button works through hashchange.
 */
const parse = (hash: string) =>
  decodeURIComponent(hash.replace(/^#\/?/, ''))
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

export function useHashRoute() {
  const [segments, setSegments] = useState<string[]>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setSegments(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    const clean = path.replace(/^#?\/?/, '');
    const next = `#/${clean}`;
    if (window.location.hash !== next) window.location.hash = next;
  }, []);

  return { segments, path: segments.join('/'), navigate };
}

export const routeHref = (path: string) => `#/${path.replace(/^#?\/?/, '')}`;
