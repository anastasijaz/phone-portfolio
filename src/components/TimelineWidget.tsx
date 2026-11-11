import { CalendarDays } from 'lucide-react';
import { timeline } from '../data/timeline';
import type { TimelineCategory, TimelineEntry } from '../data/types';
import { Pressable } from './Pressable';
import { routeHref } from '../hooks/useHashRoute';

export const categoryMeta: Record<TimelineCategory, { label: string; color: string; tint: string }> = {
  hackathon: { label: 'Hackathons', color: 'var(--cat-hackathon)', tint: 'var(--cat-hackathon-tint)' },
  university: { label: 'University', color: 'var(--cat-university)', tint: 'var(--cat-university-tint)' },
  work: { label: 'Work', color: 'var(--cat-work)', tint: 'var(--cat-work-tint)' },
  project: { label: 'Startups/projects', color: 'var(--cat-project)', tint: 'var(--cat-project-tint)' },
};

const CURRENT_YEAR = String(new Date().getFullYear());

const monthName = (m: number) => new Date(2000, m - 1, 1).toLocaleDateString('en', { month: 'short' });

/** "2024" | "2024-10" | "2024-10-23" → parts */
const parse = (d: string) => {
  const [y, m, day] = d.split('-');
  return { y, m: m ? Number(m) : undefined, day: day ? Number(day) : undefined };
};

/** One date with its year: "2023", "Oct 2024", "23 Oct 2026" */
const single = (d: string) => {
  const { y, m, day } = parse(d);
  if (!m) return y;
  return day ? `${day} ${monthName(m)} ${y}` : `${monthName(m)} ${y}`;
};

/** Date range, always showing the year: "Mar 2020 – Jun 2026", "Oct – Dec 2024", "Oct 2026 – Now" */
export const formatRange = (e: TimelineEntry) => {
  if (!e.end) return single(e.date);
  if (e.end === 'present') return `${single(e.date)} – Now`;
  const a = parse(e.date);
  const b = parse(e.end);
  if (a.y === b.y && a.m && b.m && !a.day && !b.day) return `${monthName(a.m)} – ${monthName(b.m)} ${a.y}`;
  return `${single(e.date)} – ${single(e.end)}`;
};

/** Newest first: ongoing entries on top, then by end date (or start date when there is no end). */
const sortKey = (e: TimelineEntry) => (e.end === 'present' ? '9999' : (e.end ?? e.date));

export function sortTimeline(entries: TimelineEntry[]) {
  return [...entries].sort((a, b) => sortKey(b).localeCompare(sortKey(a)) || b.date.localeCompare(a.date));
}

/** Google Calendar-style agenda widget: newest first, grouped by year, color-coded by category. */
export function TimelineWidget() {
  const sorted = sortTimeline(timeline);
  const groups: { year: string; entries: TimelineEntry[] }[] = [];
  for (const e of sorted) {
    const key = sortKey(e);
    const year = key === '9999' ? CURRENT_YEAR : key.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.entries.push(e);
    else groups.push({ year, entries: [e] });
  }

  return (
    <section aria-label="Career timeline" className="surface-card shrink-0 overflow-hidden rounded-shape-xl shadow-elev-1">
      <header className="flex items-center justify-between px-4 pb-1 pt-3">
        <div>
          <p className="type-label-small uppercase tracking-wider text-primary">Career path</p>
          <h2 className="type-title-medium text-on-surface">My timeline</h2>
        </div>
        <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-full shadow-elev-1" aria-hidden>
          <CalendarDays size={18} />
        </span>
      </header>

      {/* Legend */}
      <ul className="flex flex-wrap gap-x-2.5 gap-y-1 px-4 pb-2" aria-label="Legend">
        {Object.values(categoryMeta).map((c) => (
          <li key={c.label} className="type-label-small flex items-center gap-1.5 text-on-surface-variant">
            <span className="h-2 w-2 rounded-full" style={{ background: c.color }} aria-hidden />
            {c.label}
          </li>
        ))}
      </ul>

      <div className="no-scrollbar max-h-[206px] overflow-y-auto px-3 pb-3 [mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
        {groups.map(({ year, entries }) => (
          <div key={year} className="flex gap-2 pt-1.5">
            <div className="w-10 shrink-0 pt-1.5 text-center">
              <span className="type-label-medium block text-on-surface-variant">{year}</span>
            </div>
            <ol className="flex min-w-0 flex-1 flex-col gap-1.5">
              {entries.map((e) => {
                const c = categoryMeta[e.category];
                const range = formatRange(e);
                return (
                  <li key={e.title + e.date}>
                    <Pressable
                      href={routeHref(e.link)}
                      aria-label={`${e.title}, ${range}, ${c.label}`}
                      className="flex w-full items-stretch gap-2.5 rounded-shape-s py-1.5 pl-1.5 pr-3 text-left text-on-surface"
                    >
                      <span className="absolute inset-0 -z-10" style={{ background: c.tint }} aria-hidden />
                      <span className="w-1 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                      <span className="min-w-0">
                        <span className="type-label-small block text-on-surface-variant">{range}</span>
                        <span className="type-title-small block truncate">{e.title}</span>
                        <span className="type-body-small block truncate text-on-surface-variant">{e.subtitle}</span>
                      </span>
                    </Pressable>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
