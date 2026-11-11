import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useHashRoute } from './hooks/useHashRoute';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppContext, type AppState } from './lib/app-context';
import { getProject } from './data/projects';
import { openToInternshipsDefault, profile } from './data/settings';
import { NavBar, StatusBar } from './components/SystemBars';
import { HomeScreen } from './screens/HomeScreen';
import { ProjectApp } from './screens/ProjectApp';
import { SettingsApp } from './screens/SettingsApp';
import { RecentsScreen } from './screens/RecentsScreen';
import { WhyTinderApp } from './screens/WhyTinderApp';
import { whyTinder } from './data/whyTinder';
import { BEZEL, DEVICE_H, DEVICE_W, SCREEN_H, SCREEN_W, useFrameScale } from './hooks/useFrameScale';

const SETTINGS_SUBS = ['experience', 'education', 'skills', 'about', 'contact', 'cv'];

export default function App() {
  const { segments, path, navigate } = useHashRoute();
  const [openToInternships, setOpenToInternships] = useLocalStorage('az:open-to-internships', openToInternshipsDefault);
  const [recents, setRecents] = useState<string[]>([]);
  const tapOrigin = useRef({ x: 206, y: 450 });
  const { framed, scale } = useFrameScale();
  const mainRef = useRef<HTMLElement>(null);
  const lastAppPath = useRef('');

  // Resolve the route
  const top = segments[0];
  const project = top ? getProject(top) : undefined;
  const isSettings = top === 'settings';
  const settingsSub = isSettings && SETTINGS_SUBS.includes(segments[1] ?? '') ? segments[1] : undefined;
  const isRecents = top === 'recents';
  const isWhyTinder = top === whyTinder.id;
  const appKey = project ? project.id : isSettings ? 'settings' : isWhyTinder ? whyTinder.id : null;

  // Unknown routes fall back to the home screen
  useEffect(() => {
    if (top && !appKey && !isRecents) navigate('');
    else if (isSettings && segments[1] && !settingsSub) navigate('settings');
  }, [top, appKey, isRecents, isSettings, segments, settingsSub, navigate]);

  // Track recents + page title
  useEffect(() => {
    if (!isRecents) lastAppPath.current = path;
    if (appKey) {
      setRecents((rs) => [path, ...rs.filter((r) => r.split('/')[0] !== appKey)].slice(0, 8));
    }
    const name = project?.name ?? (isSettings ? 'Settings' : isWhyTinder ? whyTinder.appName : null);
    document.title = name ? `${name} · ${profile.name}` : `${profile.name} · Product Portfolio`;
  }, [path, appKey, isRecents, isSettings, isWhyTinder, project]);

  const back = useCallback(() => {
    if (isRecents) navigate(lastAppPath.current);
    else if (segments.length) navigate(segments.slice(0, -1).join('/'));
  }, [isRecents, segments, navigate]);

  const goRecents = useCallback(() => {
    navigate(isRecents ? lastAppPath.current : 'recents');
  }, [isRecents, navigate]);

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
      openToInternships,
      setOpenToInternships,
      recents,
      clearRecents: () => {
        setRecents([]);
        navigate('');
      },
      tapOrigin,
    }),
    [navigate, back, openToInternships, setOpenToInternships, recents],
  );

  const screen = (
    <div
      style={framed ? { width: SCREEN_W, height: SCREEN_H } : undefined}
      className={`wallpaper relative overflow-hidden ${framed ? 'rounded-[44px]' : 'h-[100dvh] w-screen'}`}
    >
      <StatusBar punchHole={framed} />
      <main ref={mainRef} onPointerDownCapture={recordTap} className="absolute inset-x-0 bottom-12 top-0 overflow-hidden">
        <HomeScreen hidden={!!appKey || isRecents} />
        <AnimatePresence>
          {project && <ProjectApp key={project.id} project={project} />}
          {isSettings && <SettingsApp key="settings" sub={settingsSub} />}
          {isWhyTinder && <WhyTinderApp key={whyTinder.id} />}
        </AnimatePresence>
        <AnimatePresence>{isRecents && <RecentsScreen key="recents" />}</AnimatePresence>
      </main>
      <NavBar onBack={back} onHome={() => navigate('')} onRecents={goRecents} solid={!!appKey || isRecents} />
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
