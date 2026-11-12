import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Camera, MessageSquareText, Phone, Settings, type LucideIcon } from 'lucide-react';
import { projects } from '../data/projects';
import { whyTinder } from '../data/whyTinder';
import { horeich } from '../data/horeich';
import { getTimelineEntry } from '../data/timeline';
import { links, isLinkPlaceholder } from '../config/links';
import { AppIcon } from '../components/AppIcon';
import { ClockWidget } from '../components/ClockWidget';
import { ClaudeWidget, GoogleSearchBar } from '../components/HomeWidgets';
import { TimelineWidget } from '../components/TimelineWidget';
import { TimelineDetail } from '../components/TimelineDetail';
import { routeHref } from '../hooks/useHashRoute';
import { inertProps } from '../lib/inert';
import { useApp } from '../lib/app-context';

import googleLogo from '../assets/icons/google.svg';
import gmailLogo from '../assets/icons/gmail.svg';
import driveLogo from '../assets/icons/drive.svg';
import mapsLogo from '../assets/icons/maps.svg';
import photosLogo from '../assets/icons/photos.svg';
import calendarLogo from '../assets/icons/calendar.svg';
import meetLogo from '../assets/icons/meet.svg';
import playStoreLogo from '../assets/icons/play-store.svg';
import linkedinLogo from '../assets/icons/linkedin.svg';
import lovableLogo from '../assets/icons/lovable.svg';
import substackLogo from '../assets/icons/substack.svg';
import spotifyLogo from '../assets/icons/spotify.svg';
import chromeLogo from '../assets/icons/chrome.svg';

const PAGES = ['Home', 'Calendar', 'Projects'] as const;

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

/** Page 1 apps, in grid order */
const homeApps: HomeApp[] = [
  { label: 'Google', logo: googleLogo, href: links.google },
  { label: 'Gmail', logo: gmailLogo, href: links.gmail },
  { label: 'Drive', logo: driveLogo, href: links.drive },
  { label: 'Maps', logo: mapsLogo, href: links.maps },
  { label: 'Photos', logo: photosLogo, href: links.photos },
  { label: 'Calendar', logo: calendarLogo, route: 'calendar' },
  { label: 'Meet', logo: meetLogo, href: links.meet },
  { label: 'Play Store', logo: playStoreLogo, href: links.playStore },
  { label: 'LinkedIn', logo: linkedinLogo, href: links.linkedin },
  { label: 'Lovable', logo: lovableLogo, href: links.lovable },
  { label: 'Substack', logo: substackLogo, href: links.substack },
  { label: 'Spotify', logo: spotifyLogo, href: links.spotify },
  { label: 'Settings', icon: Settings, colors: { bg: '#5f5350', fg: '#ffffff' }, route: 'settings' },
];

/** Page 3 order (project ids). Projects not listed here follow at the end. */
const PROJECT_ORDER = ['melt', 'zollhof', 'gaming-robot', 'thesis', horeich.id, 'marie'];
const rank = (id: string) => {
  const i = PROJECT_ORDER.indexOf(id);
  return i === -1 ? PROJECT_ORDER.length : i;
};

/** Page 3: "Why Tinder" first, then the projects and Horeich.de */
const projectApps: (HomeApp & { id: string; ariaLabel: string })[] = [
  { id: whyTinder.id, label: whyTinder.appName, ariaLabel: `Open ${whyTinder.appName}`, icon: whyTinder.icon, colors: whyTinder.iconColors, route: whyTinder.id },
  ...[
    ...projects.map((p) => ({ id: p.id, label: p.iconLabel, ariaLabel: `Open project: ${p.name}`, icon: p.icon, colors: p.iconColors, route: p.id })),
    { id: horeich.id, label: horeich.iconLabel, ariaLabel: `Open project: ${horeich.title}`, icon: horeich.icon, colors: horeich.iconColors, route: horeich.id },
  ].sort((a, b) => rank(a.id) - rank(b.id)),
];

/** Dock row on every page, like the Pixel launcher */
const dock: HomeApp[] = [
  { label: 'Phone', icon: Phone, colors: { bg: '#1e8e3e', fg: '#ffffff' }, href: links.phone },
  { label: 'Messages', icon: MessageSquareText, colors: { bg: '#1a73e8', fg: '#ffffff' }, href: links.messages },
  { label: 'Chrome', logo: chromeLogo, href: links.chrome },
  { label: 'Camera', icon: Camera, colors: { bg: '#4a3f3c', fg: '#ffffff' }, href: links.camera },
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

  const tile = (href: string) => (isLinkPlaceholder(href) ? { href, onBlocked: () => setToast("Voice link isn't set yet") } : { href });

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
          {/* Page 1: Home */}
          <section style={{ width }} className={`${pagePad} flex flex-col gap-3`} aria-label="Home" {...inertProps(page !== 0)}>
            <ClockWidget />
            <ClaudeWidget claude={{ href: links.claude }} voice={tile(links.voice)} />
            <nav aria-label="Apps" className="grid grid-cols-4 gap-x-1 gap-y-0.5 pt-1">
              {homeApps.map((a) => (
                <div key={a.label}>{renderApp(a, a.route === 'calendar' ? { ariaLabel: 'Calendar: open my timeline' } : {})}</div>
              ))}
            </nav>
          </section>

          {/* Page 2: Calendar (career timeline, or one entry's details) */}
          <section style={{ width }} className={`${pagePad} flex flex-col pb-2`} aria-label="Calendar" {...inertProps(page !== 1)}>
            {openEntry ? <TimelineDetail key={openEntry.id} entry={openEntry} /> : <TimelineWidget fill />}
          </section>

          {/* Page 3: Projects */}
          <section style={{ width }} className={pagePad} aria-label="Projects" {...inertProps(page !== 2)}>
            <nav aria-label="Projects" className="grid grid-cols-4 gap-x-1 gap-y-2">
              {projectApps.map((a) => (
                <div key={a.id}>{renderApp(a, { ariaLabel: a.ariaLabel })}</div>
              ))}
            </nav>
          </section>
        </motion.div>
      </div>

      {/* Page dots */}
      <div className="flex shrink-0 justify-center gap-1 pt-1" role="tablist" aria-label="Home screen pages">
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
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === page ? 'h-2 w-2 bg-[var(--brand-coral)]' : 'h-1.5 w-1.5 bg-on-surface-variant opacity-60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Dock row */}
      <nav aria-label="Dock" className="grid shrink-0 grid-cols-4 gap-1 px-4">
        {dock.map((d) => (
          <div key={d.label}>{renderApp(d, { showLabel: false })}</div>
        ))}
      </nav>

      {/* Search bar */}
      <div className="shrink-0 px-4 pb-3 pt-1">
        <GoogleSearchBar />
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="type-body-medium absolute inset-x-6 bottom-[140px] z-30 rounded-shape-xs bg-[#f6ece6] px-4 py-3 text-[#2a2220] shadow-elev-3"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
