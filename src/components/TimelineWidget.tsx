import { CalendarDays } from 'lucide-react';
import { timeline } from '../data/timeline';
import type { TimelineEntry } from '../data/types';
import { Pressable } from './Pressable';
import { routeHref } from '../hooks/useHashRoute';

const chipTone: Record<TimelineEntry['color'], string> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  success: 'bg-success-container text-on-success-container',
};
const barTone: Record<TimelineEntry['color'], string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  success: 'bg-success',
};

const month = (d: string) => {
  if (d === 'present') return 'Now';
  const [y, m] = d.split('-').map(Number);
  if (!m) return String(y);
  return new Date(y, m - 1, 1).toLocaleDateString('en', { month: 'short' });
};

const range = (e: TimelineEntry) => {
  const start = month(e.date);
  if (!e.end) return start;
  const sameYear = e.end !== 'present' && e.end.slice(0, 4) === e.date.slice(0, 4);
  return `${start} – ${month(e.end)}${!sameYear && e.end !== 'present' ? ` ${e.end.slice(0, 4)}` : ''}`;
};

/** Google Calendar-style agenda widget: career path grouped by year, oldest first. */
export function TimelineWidget() {
  const sorted = [...timeline].sort((a, b) => a.date.localeCompare(b.date));
  const groups = sorted.reduce<Record<string, TimelineEntry[]>>((acc, e) => {
    const y = e.date.slice(0, 4);
    (acc[y] ??= []).push(e);
    return acc;
  }, {});
  const years = Object.keys(groups).sort();

  return (
    <section
      aria-label="Career timeline"
      className="shrink-0 overflow-hidden rounded-shape-xl bg-surface-container-low shadow-elev-1"
    >
      <header className="flex items-center justify-between px-5 pb-2 pt-4">
        <div>
          <p className="type-label-medium uppercase tracking-wider text-primary">Career path</p>
          <h2 className="type-title-large text-on-surface">My timeline</h2>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary" aria-hidden>
          <CalendarDays size={20} />
        </span>
      </header>

      <div className="no-scrollbar max-h-[172px] overflow-y-auto px-3 pb-3 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
        {years.map((year) => (
          <div key={year} className="flex gap-2 py-1.5">
            <div className="w-12 shrink-0 pt-2 text-center">
              <span className="type-title-small block text-on-surface-variant">{year}</span>
            </div>
            <ol className="flex min-w-0 flex-1 flex-col gap-1.5">
              {groups[year].map((e) => (
                <li key={e.title + e.date}>
                  <Pressable
                    href={routeHref(e.link)}
                    aria-label={`${e.title}, ${range(e)}`}
                    className={`flex w-full items-stretch gap-2.5 rounded-shape-m py-2 pl-2 pr-3 text-left ${chipTone[e.color]}`}
                  >
                    <span className={`w-1 shrink-0 rounded-full ${barTone[e.color]}`} aria-hidden />
                    <span className="min-w-0">
                      <span className="type-title-small block truncate">{e.title}</span>
                      <span className="type-body-small block truncate opacity-80">
                        {range(e)} · {e.subtitle}
                      </span>
                    </span>
                  </Pressable>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
