import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useHashRoute } from './hooks/useHashRoute';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppContext, type AppState } from './lib/app-context';
import { getProject } from './data/projects';
import { openToInternshipsDefault, profile } from './data/settings';
import { getTimelineEntry } from './data/timeline';
import { NavBar, StatusBar } from './components/SystemBars';
import { HomeScreen } from './screens/HomeScreen';
import { ProjectApp } from './screens/ProjectApp';
import { SettingsApp } from './screens/SettingsApp';
import { RecentsScreen } from './screens/RecentsScreen';
import { WhyTinderApp } from './screens/WhyTinderApp';
import { whyTinder } from './data/whyTinder';
import { BEZEL, DEVICE_H, DEVICE_W, SCREEN_H, SCREEN_W, useFrameScale } from './hooks/useFrameScale';

const SETTINGS_SUBS = ['experience', 'education', 'skills', 'about', 'contact', 'cv'];

/** Home screen pages and their routes: #/ (Home), #/calendar, #/projects */
export const HOME_PAGE_ROUTES = ['', 'calendar', 'projects'] as const;

/** Height of the status bar row (clock, signal, battery) */
const STATUS_ROW = 36;
/** Gap above the status bar inside the desktop device frame (keeps the camera clear) */
const STATUS_GAP_FRAMED = 30;
/** On a real phone the browser already sits below the system status bar */
const STATUS_GAP_PHONE = 4;
/** Space below the 3-button nav inside the device frame (nav glyphs sit ~30px above the bezel) */
const NAV_GAP_FRAMED = 8;

/**
 * Where "back" goes when there is no earlier screen in this visit (someone opened a deep link).
 * Projects → Projects page, timeline details → Calendar, settings pages → Settings.
 */
function fallbackParent(segments: string[]): string | null {
  const [top, sub] = segments;
  if (!top) return null;
  if (top === 'calendar') return sub ? 'calendar' : '';
  if (top === 'settings') return sub ? 'settings' : '';
  if (top === 'projects' || top === 'recents') return '';
  return 'projects'; // a project, Why Tinder or Horeich.de
}

export default function App() {
  const { segments, path, navigate, canGoBack } = useHashRoute();
  const [openToInternships, setOpenToInternships] = useLocalStorage('az:open-to-internships', openToInternshipsDefault);
  const [recents, setRecents] = useState<string[]>([]);
  const tapOrigin = useRef({ x: 206, y: 450 });
  const { framed, scale } = useFrameScale();
  const mainRef = useRef<HTMLElement>(null);

  // Resolve the route
  const top = segments[0] ?? '';
  const project = top ? getProject(top) : undefined;
  const isSettings = top === 'settings';
  const settingsSub = isSettings && SETTINGS_SUBS.includes(segments[1] ?? '') ? segments[1] : undefined;
  const isRecents = top === 'recents';
  const isWhyTinder = top === whyTinder.id;
  const appKey = project ? project.id : isSettings ? 'settings' : isWhyTinder ? whyTinder.id : null;
  const homePageIndex = HOME_PAGE_ROUTES.indexOf(top as (typeof HOME_PAGE_ROUTES)[number]);
  const isHome = homePageIndex !== -1;
  const calendarEntryId = top === 'calendar' ? segments[1] : undefined;

  // Unknown routes fall back to the nearest valid screen (replacing, so back isn't polluted)
  useEffect(() => {
    if (top === 'gaming-robot') navigate('garmi', { replace: true }); // old GARMI link
    else if (!isHome && !appKey && !isRecents) navigate('', { replace: true });
    else if (isSettings && segments[1] && !settingsSub) navigate('settings', { replace: true });
    else if (calendarEntryId && !getTimelineEntry(calendarEntryId)) navigate('calendar', { replace: true });
  }, [top, isHome, appKey, isRecents, isSettings, segments, settingsSub, calendarEntryId, navigate]);

  // Track recents + page title
  useEffect(() => {
    if (appKey) setRecents((rs) => [path, ...rs.filter((r) => r.split('/')[0] !== appKey)].slice(0, 8));
    const name =
      project?.name ??
      (isSettings ? 'Settings' : isWhyTinder ? whyTinder.appName : top === 'calendar' ? 'Calendar' : top === 'projects' ? 'Projects' : null);
    document.title = name ? `${name} · ${profile.name}` : `${profile.name} · Product Portfolio`;
  }, [path, appKey, isSettings, isWhyTinder, project, top]);

  /** Android back: one step back in what the visitor actually did. */
  const back = useCallback(() => {
    if (canGoBack()) {
      window.history.back();
      return;
    }
    const parent = fallbackParent(segments);
    if (parent !== null) navigate(parent, { replace: true });
  }, [canGoBack, segments, navigate]);

  // Remember the previous screen, for "Back to Projects"-style buttons
  const route = useRef({ current: path, previous: null as string | null });
  useEffect(() => {
    if (route.current.current !== path) route.current = { current: path, previous: route.current.current };
  }, [path]);
  const backTo = useCallback(
    (target: string) => {
      if (canGoBack() && route.current.previous === target) window.history.back();
      else navigate(target, { replace: true });
    },
    [canGoBack, navigate],
  );

  const goHome = useCallback(() => navigate(''), [navigate]);
  // Recents is a no-op, as requested (the #/recents overview still opens from a direct link)
  const goRecents = useCallback(() => {}, []);
  // Swiping between home pages replaces the entry, so it doesn't fill the back history
  const setHomePage = useCallback((page: number) => navigate(HOME_PAGE_ROUTES[page] ?? '', { replace: true }), [navigate]);

  // Same-tab links (#/...) go through the router so every step is a real history entry
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      const href = a?.getAttribute('href');
      if (!a || !href || !href.startsWith('#/') || a.target === '_blank') return;
      e.preventDefault();
      navigate(href.slice(2));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  // Escape = Android back on desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [back]);

  // Remember where the user tapped, so apps zoom open from the icon.
  // The frame may be scaled down, so convert from screen pixels to the phone's own pixels.
  const recordTap = (e: PointerEvent) => {
    const el = mainRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const s = rect.width / el.offsetWidth || 1;
    tapOrigin.current = { x: (e.clientX - rect.left) / s, y: (e.clientY - rect.top) / s };
  };

  const ctx = useMemo<AppState>(
    () => ({
      navigate,
      back,
      backTo,
      openToInternships,
      setOpenToInternships,
      recents,
      clearRecents: () => {
        setRecents([]);
        navigate('');
      },
      homePage: isHome ? homePageIndex : 0,
      setHomePage,
      calendarEntryId,
      tapOrigin,
    }),
    [navigate, back, backTo, openToInternships, setOpenToInternships, recents, isHome, homePageIndex, setHomePage, calendarEntryId],
  );

  // Space between the top of the screen and the status bar row. Inside the device frame the
  // status bar sits ~30px below the bezel, leaving the punch-hole camera clear above it.
  const statusGap = framed ? STATUS_GAP_FRAMED : STATUS_GAP_PHONE;
  const darkChrome = isHome && !isRecents;

  const screen = (
    <div
      style={{
        ...(framed ? { width: SCREEN_W, height: SCREEN_H } : {}),
        ['--status-gap' as string]: `${statusGap}px`,
        ['--status-inset' as string]: `${statusGap + STATUS_ROW}px`,
        ['--nav-gap' as string]: `${framed ? NAV_GAP_FRAMED : 0}px`,
      }}
      className={`relative overflow-hidden ${darkChrome ? 'wallpaper-dark' : 'wallpaper'} ${framed ? 'rounded-[44px]' : 'h-[100dvh] w-screen'}`}
    >
      <StatusBar punchHole={framed} dark={darkChrome} />
      <main ref={mainRef} onPointerDownCapture={recordTap} className="absolute inset-x-0 bottom-[calc(48px+var(--nav-gap))] top-0 overflow-hidden">
        <HomeScreen hidden={!isHome} />
        <AnimatePresence>
          {project && <ProjectApp key={project.id} project={project} />}
          {isSettings && <SettingsApp key="settings" sub={settingsSub} />}
          {isWhyTinder && <WhyTinderApp key={whyTinder.id} />}
        </AnimatePresence>
        <AnimatePresence>{isRecents && <RecentsScreen key="recents" />}</AnimatePresence>
      </main>
      <NavBar onBack={back} onHome={goHome} onRecents={goRecents} solid={!isHome} dark={darkChrome} />
    </div>
  );

  return (
    <AppContext.Provider value={ctx}>
      <MotionConfig reducedMotion="user">
        {framed ? (
          // Desktop / tablet: the device, scaled to fit the window
          <div className="flex h-[100dvh] w-screen items-center justify-center">
            <div style={{ width: DEVICE_W * scale, height: DEVICE_H * scale }} className="relative">
              <div
                style={{ width: DEVICE_W, height: DEVICE_H, transform: `scale(${scale})`, transformOrigin: 'top left', padding: BEZEL }}
                className="phone-frame-bg absolute left-0 top-0 rounded-[56px] shadow-elev-5 ring-1 ring-black/40"
              >
                {/* Hardware buttons: power, then volume rocker */}
                <span className="phone-frame-bg absolute -right-[4px] top-[190px] h-[72px] w-[5px] rounded-r-md" aria-hidden />
                <span className="phone-frame-bg absolute -right-[4px] top-[300px] h-[128px] w-[5px] rounded-r-md" aria-hidden />
                {screen}
              </div>
            </div>
          </div>
        ) : (
          // Real phone: no frame, fill the screen
          screen
        )}
      </MotionConfig>
    </AppContext.Provider>
  );
}
