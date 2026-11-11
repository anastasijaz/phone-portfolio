import { FileText, Mail, Phone, Settings } from 'lucide-react';
import { projects } from '../data/projects';
import { contact, profile } from '../data/settings';
import { AppIcon } from '../components/AppIcon';
import { TimelineWidget } from '../components/TimelineWidget';
import { Pressable } from '../components/Pressable';
import { routeHref } from '../hooks/useHashRoute';
import { inertProps } from '../lib/inert';
import { useApp } from '../lib/app-context';
import { useClock } from '../hooks/useClock';

const dock = [
  { label: 'Phone', icon: Phone, href: routeHref('settings/contact'), colors: { bg: '#1f6c3a', fg: '#e3f9e7' } },
  { label: 'Mail', icon: Mail, href: `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`, colors: { bg: '#3b5ba5', fg: '#e8eeff' } },
  { label: 'CV', icon: FileText, href: routeHref('settings/cv'), colors: { bg: '#775930', fg: '#fff1e0' } },
  { label: 'Settings', icon: Settings, href: routeHref('settings'), colors: { bg: '#524344', fg: '#ffeeee' } },
];

export function HomeScreen({ hidden }: { hidden: boolean }) {
  const { openToInternships } = useApp();
  const now = useClock();
  const date = now.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div
      aria-hidden={hidden || undefined}
      {...inertProps(hidden)}
      className="no-scrollbar absolute inset-0 flex flex-col overflow-y-auto px-4 pb-3 pt-10"
    >
      <TimelineWidget />

      {/* Intro, styled like the Pixel "At a glance" text */}
      <section className="shrink-0 px-2 pb-1 pt-4" aria-label="Intro">
        <p className="type-title-small text-on-surface-variant">{date}</p>
        <h1 className="type-headline-medium mt-1 text-on-surface">{profile.name}</h1>
        <p className="type-body-medium mt-1 text-on-surface-variant">{profile.tagline}</p>
        {openToInternships && (
          <Pressable
            href={routeHref('settings')}
            className="type-label-large mt-3 inline-flex h-8 items-center gap-2 rounded-shape-s bg-secondary-container px-3 text-on-secondary-container"
          >
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
            Open to internships
          </Pressable>
        )}
      </section>

      {/* Project apps */}
      <nav aria-label="Projects" className="grid shrink-0 grid-cols-4 gap-x-1 gap-y-1 pt-3">
        {projects.map((p) => (
          <AppIcon
            key={p.id}
            label={p.iconLabel}
            ariaLabel={`Open project: ${p.name}`}
            icon={p.icon}
            image={p.iconImage}
            colors={p.iconColors}
            href={routeHref(p.id)}
          />
        ))}
      </nav>

      <div className="min-h-4 flex-1" />

      {/* Dock */}
      <nav aria-label="Dock" className="mt-3 grid shrink-0 grid-cols-4 gap-1 rounded-[32px] bg-surface-container-low px-2 py-1 shadow-elev-1">
        {dock.map((d) => (
          <AppIcon key={d.label} label={d.label} icon={d.icon} colors={d.colors} href={d.href} showLabel={false} ariaLabel={d.label} />
        ))}
      </nav>
    </div>
  );
}
