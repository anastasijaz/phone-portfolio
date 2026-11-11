import { createContext, useContext } from 'react';

export interface AppState {
  navigate: (path: string) => void;
  /** Go to the parent screen (Android back). */
  back: () => void;
  openToInternships: boolean;
  setOpenToInternships: (v: boolean) => void;
  /** Recently opened app routes, newest first */
  recents: string[];
  clearRecents: () => void;
  /** Last tap position inside the phone screen, used as the app-open origin */
  tapOrigin: { current: { x: number; y: number } };
}

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppContext.Provider>');
  return ctx;
}

export const isPlaceholder = (s: string | undefined) => !!s && s.includes('[PLACEHOLDER');
