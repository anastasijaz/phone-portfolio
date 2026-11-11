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

const SETTINGS_SUBS = ['experience', 'education', 'skills', 'about', 'contact', 'cv'];

export default function App() {
  const { segments, path, navigate } = useHashRoute();
  const [openToInternships, setOpenToInternships] = useLocalStorage('pz:open-to-internships', openToInternshipsDefault);
  const [recents, setRecents] = useState<string[]>([]);
  const tapOrigin = useRef({ x: 195, y: 400 });
  const mainRef = useRef<HTMLElement>(null);
  const lastAppPath = useRef('');

  // Resolve the route
  const top = segments[0];
  const project = top ? getProject(top) : undefined;
  const isSettings = top === 'settings';
  const settingsSub = isSettings && SETTINGS_SUBS.includes(segments[1] ?? '') ? segments[1] : undefined;
  const isRecents = top === 'recents';
  const appKey = project ? project.id : isSettings ? 'settings' : null;

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
    const name = project?.name ?? (isSettings ? 'Settings' : null);
    document.title = name ? `${name} · ${profile.name}` : `${profile.name} · Product Portfolio`;
  }, [path, appKey, isRecents, isSettings, project]);

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

  // Remember where the user tapped, so apps zoom open from the icon
  const recordTap = (e: PointerEvent) => {
    const rect = mainRef.current?.getBoundingClientRect();
    if (rect) tapOrigin.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
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

  return (
    <AppContext.Provider value={ctx}>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-[100dvh] items-center justify-center sm:p-6">
          <div className="relative">
            {/* Hardware buttons, desktop only */}
            <span className="phone-frame-bg absolute -right-[3px] top-[120px] hidden h-16 w-[4px] rounded-r sm:block" aria-hidden />
            <span className="phone-frame-bg absolute -right-[3px] top-[210px] hidden h-24 w-[4px] rounded-r sm:block" aria-hidden />

            <div className="wallpaper relative h-[100dvh] w-screen overflow-hidden sm:h-[min(860px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-[48px] sm:border-[10px] sm:border-[color:var(--frame)] sm:shadow-elev-5">
              <StatusBar />
              <main ref={mainRef} onPointerDownCapture={recordTap} className="absolute inset-x-0 bottom-12 top-0 overflow-hidden">
                <HomeScreen hidden={!!appKey || isRecents} />
                <AnimatePresence>
                  {project && <ProjectApp key={project.id} project={project} />}
                  {isSettings && <SettingsApp key="settings" sub={settingsSub} />}
                </AnimatePresence>
                <AnimatePresence>{isRecents && <RecentsScreen key="recents" />}</AnimatePresence>
              </main>
              <NavBar onBack={back} onHome={() => navigate('')} onRecents={goRecents} solid={!!appKey || isRecents} />
            </div>
          </div>
        </div>
      </MotionConfig>
    </AppContext.Provider>
  );
}
