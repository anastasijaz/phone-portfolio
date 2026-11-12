import { createContext, useContext } from 'react';

export interface AppState {
  navigate: (path: string, opts?: { replace?: boolean }) => void;
  /** Android back: one step back in the visit's history. */
  back: () => void;
  /** Go to `path`: one step back if that's the previous screen, otherwise replace the current one with it. */
  backTo: (path: string) => void;
  openToInternships: boolean;
  setOpenToInternships: (v: boolean) => void;
  /** Recently opened app routes, newest first */
  recents: string[];
  clearRecents: () => void;
  /** Home screen page: 0 = Home, 1 = Calendar (timeline), 2 = Projects. Mirrors the route. */
  homePage: number;
  setHomePage: (page: number) => void;
  /** Timeline entry open in the Calendar page (#/calendar/:id), if any */
  calendarEntryId?: string;
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
