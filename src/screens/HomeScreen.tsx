import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Mail, Phone, Settings } from 'lucide-react';
import { projects } from '../data/projects';
import { whyTinder } from '../data/whyTinder';
import type { ProjectCategory } from '../data/types';
import { contact, profile } from '../data/settings';
import { AppIcon } from '../components/AppIcon';
import { TimelineWidget } from '../components/TimelineWidget';
import { Pressable } from '../components/Pressable';
import { routeHref } from '../hooks/useHashRoute';
import { inertProps } from '../lib/inert';
import { useApp } from '../lib/app-context';
import { useClock } from '../hooks/useClock';

const dock = [
  { label: 'Phone', icon: Phone, href: routeHref('settings/contact'), colors: { bg: '#2e9a6a', fg: '#ffffff' } },
  { label: 'Mail', icon: Mail, href: `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`, colors: { bg: '#4a72c9', fg: '#ffffff' } },
  { label: 'CV', icon: FileText, href: routeHref('settings/cv'), colors: { bg: '#e39a2d', fg: '#ffffff' } },
  { label: 'Settings', icon: Settings, href: routeHref('settings'), colors: { bg: '#6b5a54', fg: '#ffffff' } },
];

/** Home screen apps: "Why Tinder" first, then the projects in their data-file order. */
const apps = [
  {
    id: whyTinder.id,
    label: whyTinder.appName,
    ariaLabel: `Open ${whyTinder.appName}`,
    icon: whyTinder.icon,
    image: undefined as string | undefined,
    colors: whyTinder.iconColors,
    categories: whyTinder.categories,
  },
  ...projects.map((p) => ({
    id: p.id,
    label: p.iconLabel,
    ariaLabel: `Open project: ${p.name}`,
    icon: p.icon,
    image: p.iconImage,
    colors: p.iconColors,
    categories: p.categories,
  })),
];

type Filter = 'all' | ProjectCategory;
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
  { id: 'social', label: 'Social' },
  { id: 'health', label: 'Health' },
  { id: 'internal', label: 'Internal' },
];

export function HomeScreen({ hidden }: { hidden: boolean }) {
  const { openToInternships } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const now = useClock();
  const date = now.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  const visible = filter === 'all' ? apps : apps.filter((a) => a.categories.includes(filter));

  return (
    <div
      aria-hidden={hidden || undefined}
      {...inertProps(hidden)}
      className="no-scrollbar absolute inset-0 flex flex-col overflow-y-auto px-4 pb-3 pt-10"
    >
      <TimelineWidget />

      {/* Intro, styled like the Pixel "At a glance" text */}
      <section className="shrink-0 px-2 pt-4" aria-label="Intro">
        <p className="type-label-large text-on-surface-variant">{date}</p>
        <h1 className="type-headline-small mt-0.5 text-on-surface">{profile.name}</h1>
        <p className="type-body-medium mt-1 text-on-surface-variant">{profile.tagline}</p>
        {openToInternships && (
          <Pressable
            href={routeHref('settings')}
            className="surface-card type-label-large mt-2.5 inline-flex h-8 items-center gap-2 rounded-full px-3 text-on-surface"
          >
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
            Open to internships
          </Pressable>
        )}
      </section>

      {/* Filter pills */}
      <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-4 mt-4 flex shrink-0 gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <Pressable
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`type-label-medium h-8 shrink-0 rounded-full px-3.5 uppercase tracking-wider transition-shadow ${
                active ? 'bg-brand-gradient shadow-elev-1' : 'surface-card text-on-surface-variant'
              }`}
            >
              {f.label}
            </Pressable>
          );
        })}
      </div>

      {/* Project apps */}
      <nav aria-label="Projects" className="grid min-h-[104px] shrink-0 grid-cols-4 gap-x-1 gap-y-1 pt-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <AppIcon label={a.label} ariaLabel={a.ariaLabel} icon={a.icon} image={a.image} colors={a.colors} href={routeHref(a.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="type-body-medium col-span-4 self-center px-2 text-center text-on-surface-variant" role="status">
            No {filters.find((f) => f.id === filter)?.label.toLowerCase()} projects yet.
          </p>
        )}
      </nav>

      <div className="min-h-3 flex-1" />

      {/* Dock */}
      <nav aria-label="Dock" className="surface-card mt-3 grid shrink-0 grid-cols-4 gap-1 rounded-[28px] px-2 py-1 shadow-elev-1">
        {dock.map((d) => (
          <AppIcon key={d.label} label={d.label} icon={d.icon} colors={d.colors} href={d.href} showLabel={false} ariaLabel={d.label} />
        ))}
      </nav>
    </div>
  );
}
