import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Camera, MessageSquareText, Phone, Settings, type LucideIcon } from 'lucide-react';
import { homeScreenProjects } from '../data/projects';
import { whyTinder } from '../data/whyTinder';
import { getTimelineEntry } from '../data/timeline';
import { links, isLinkPlaceholder } from '../config/links';
import { AppIcon } from '../components/AppIcon';
import { ClaudePanel, ClockCard, DateLine, GoogleSearchBar } from '../components/HomeWidgets';
import { TimelineWidget } from '../components/TimelineWidget';
import { TimelineDetail } from '../components/TimelineDetail';
import { routeHref } from '../hooks/useHashRoute';
import { inertProps } from '../lib/inert';
import { useApp } from '../lib/app-context';

import googleLogo from '../assets/icons/google.svg';
import gmailLogo from '../assets/icons/gmail.svg';
import driveLogo from '../assets/icons/drive.svg';
import mapsLogo from '../assets/icons/maps.svg';
import calendarLogo from '../assets/icons/calendar.svg';
import meetLogo from '../assets/icons/meet.svg';
import playStoreLogo from '../assets/icons/play-store.svg';
import linkedinLogo from '../assets/icons/linkedin.svg';
import lovableLogo from '../assets/icons/lovable.svg';
import substackLogo from '../assets/icons/substack.svg';
import spotifyLogo from '../assets/icons/spotify.svg';
import chromeLogo from '../assets/icons/chrome.svg';

const PAGES = ['Projects', 'Calendar', 'Home'] as const;

/**
 * An icon on the home screen. Exactly one of:
 *  - href:  external link, opens in a new tab
 *  - route: internal screen (#/...), same tab
 */
interface HomeApp {
  label: string;
  logo?: string;
  icon?: LucideIcon;
  colors?: { bg: string; fg: string };
  href?: string;
  route?: string;
}

/** Page 3 (Home) app grid, row by row */
const homeApps: HomeApp[] = [
  { label: 'Substack', logo: substackLogo, href: links.substack },
  { label: 'Spotify', logo: spotifyLogo, href: links.spotify },
  { label: 'Gmail', logo: gmailLogo, href: links.gmail },
  { label: 'Maps', logo: mapsLogo, href: links.maps },

  { label: 'Settings', icon: Settings, colors: { bg: '#ffffff', fg: '#1a73e8' }, route: 'settings' },
  { label: 'Drive', logo: driveLogo, href: links.drive },
  { label: 'Calendar', logo: calendarLogo, route: 'calendar' },
  { label: 'Meet', logo: meetLogo, href: links.meet },

  { label: 'Play Store', logo: playStoreLogo, href: links.playStore },
  { label: 'Google', logo: googleLogo, href: links.google },
  { label: 'LinkedIn', logo: linkedinLogo, href: links.linkedin },
  { label: 'Lovable', logo: lovableLogo, href: links.lovable },
];

/** Page 1: "Why Tinder", then the projects in the order of src/data/projects.ts */
const projectApps: (HomeApp & { id: string; ariaLabel: string })[] = [
  { id: whyTinder.id, label: whyTinder.appName, ariaLabel: `Open ${whyTinder.appName}`, icon: whyTinder.icon, colors: whyTinder.iconColors, route: whyTinder.id },
  ...homeScreenProjects.map((p) => ({ id: p.id, label: p.iconLabel, ariaLabel: `Open project: ${p.name}`, icon: p.icon, colors: p.iconColors, route: p.id })),
];

/** Dock row on every page: white circles, official colours, no labels */
const dock: HomeApp[] = [
  { label: 'Phone', icon: Phone, colors: { bg: '#ffffff', fg: '#4285f4' }, href: links.phone },
  { label: 'Messages', icon: MessageSquareText, colors: { bg: '#ffffff', fg: '#1a73e8' }, href: links.messages },
  { label: 'Chrome', logo: chromeLogo, href: links.chrome },
  { label: 'Camera', icon: Camera, colors: { bg: '#ffffff', fg: '#5f6368' }, href: links.camera },
];

const pagePad = 'h-full w-full shrink-0 px-4 pt-[calc(var(--status-inset)+8px)]';

export function HomeScreen({ hidden }: { hidden: boolean }) {
  const { homePage: page, setHomePage: setPage, calendarEntryId, navigate } = useApp();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const dragged = useRef(false);
  const [toast, setToast] = useState<string | null>(null);
  const openEntry = calendarEntryId ? getTimelineEntry(calendarEntryId) : undefined;

  // Measure the page width (412px in the frame, the screen width on a phone)
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Arrow keys change pages on desktop while the home screen is showing
  useEffect(() => {
    if (hidden) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') setPage(Math.min(page + 1, PAGES.length - 1));
      if (e.key === 'ArrowLeft') setPage(Math.max(page - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hidden, page, setPage]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = width * 0.18;
    let next = page;
    if (info.offset.x < -threshold || info.velocity.x < -400) next = page + 1;
    else if (info.offset.x > threshold || info.velocity.x > 400) next = page - 1;
    next = Math.max(0, Math.min(PAGES.length - 1, next));
    if (next !== page) setPage(next);
    // Let the click that ends a drag through only if the finger barely moved
    window.setTimeout(() => (dragged.current = false), 0);
  };

  // A drag that ends on an icon must not open it
  const swallowClickAfterDrag = (e: MouseEvent) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /** Render any home app: internal route, external link, or a placeholder that isn't set yet */
  const renderApp = (a: HomeApp, opts: { showLabel?: boolean; ariaLabel?: string } = {}) => {
    const common = { label: a.label, logo: a.logo, icon: a.icon, colors: a.colors, showLabel: opts.showLabel };
    if (a.route !== undefined) {
      return <AppIcon {...common} href={routeHref(a.route)} ariaLabel={opts.ariaLabel ?? `Open ${a.label}`} />;
    }
    if (!a.href || isLinkPlaceholder(a.href)) {
      return <AppIcon {...common} onClick={() => setToast(`${a.label} link isn't set yet`)} ariaLabel={`${a.label} (link not set yet)`} />;
    }
    return <AppIcon {...common} href={a.href} external ariaLabel={`${a.label} (opens in a new tab)`} />;
  };

  const tile = (href: string, name: string) =>
    isLinkPlaceholder(href) ? { href, onBlocked: () => setToast(`${name} link isn't set yet`) } : { href };

  return (
    <div aria-hidden={hidden || undefined} {...inertProps(hidden)} className="home-dark absolute inset-0 flex flex-col">
      {/* Pages */}
      <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div
          className="flex h-full touch-pan-y"
          style={{ width: width * PAGES.length }}
          drag="x"
          dragConstraints={{ left: -width * (PAGES.length - 1), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
          onClickCapture={swallowClickAfterDrag}
          animate={{ x: -page * width }}
          transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        >
          {/* Page 1: Projects (the start page, #/) */}
          <section style={{ width }} className={pagePad} aria-label="Projects" {...inertProps(page !== 0)}>
            <nav aria-label="Projects" className="grid grid-cols-4 gap-x-1 gap-y-2">
              {projectApps.map((a) => (
                <div key={a.id}>{renderApp(a, { ariaLabel: a.ariaLabel })}</div>
              ))}
            </nav>
          </section>

          {/* Page 2: Calendar (career timeline, or one entry's details) */}
          <section style={{ width }} className={`${pagePad} flex flex-col pb-2`} aria-label="Calendar" {...inertProps(page !== 1)}>
            {openEntry ? <TimelineDetail key={openEntry.id} entry={openEntry} /> : <TimelineWidget fill />}
          </section>

          {/* Page 3: Home (#/home) */}
          <section style={{ width }} className={`${pagePad} flex flex-col gap-3`} aria-label="Home" {...inertProps(page !== 2)}>
            <DateLine />
            <div className="grid h-[180px] shrink-0 grid-cols-2 gap-3">
              <ClockCard />
              <ClaudePanel
                claude={{ href: links.claude }}
                voice={tile(links.voice, 'Voice')}
                photos={{ href: links.photos }}
                onProjects={() => setPage(0)}
              />
            </div>
            <nav aria-label="Apps" className="grid grid-cols-4 gap-x-1 gap-y-1 pt-2">
              {homeApps.map((a) => (
                <div key={a.label}>{renderApp(a, a.route === 'calendar' ? { ariaLabel: 'Calendar: open my timeline' } : {})}</div>
              ))}
            </nav>
          </section>
        </motion.div>
      </div>

      {/* Dock row */}
      <nav aria-label="Dock" className="grid shrink-0 grid-cols-4 gap-1 px-4">
        {dock.map((d) => (
          <div key={d.label}>{renderApp(d, { showLabel: false })}</div>
        ))}
      </nav>

      {/* Search bar */}
      <div className="shrink-0 px-4 pt-2">
        <GoogleSearchBar />
      </div>

      {/* Page dots, between the search bar and the nav bar */}
      <div className="flex shrink-0 justify-center gap-1 py-1" role="tablist" aria-label="Home screen pages">
        {PAGES.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={i === page}
            aria-label={`${name} page`}
            onClick={() => (i === page && i === 1 && openEntry ? navigate('calendar', { replace: true }) : setPage(i))}
            className="flex h-6 w-6 items-center justify-center rounded-full"
          >
            <span className={`block rounded-full bg-white transition-all duration-300 ${i === page ? 'h-2 w-2' : 'h-1.5 w-1.5 opacity-40'}`} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="type-body-medium absolute inset-x-6 bottom-[170px] z-30 rounded-shape-xs bg-[#f6ece6] px-4 py-3 text-[#2a2220] shadow-elev-3"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
