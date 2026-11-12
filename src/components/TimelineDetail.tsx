import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { TimelineEntry } from '../data/types';
import { getProject } from '../data/projects';
import { horeich } from '../data/horeich';
import { categoryMeta, formatRange } from './TimelineWidget';
import { IconButton, Button } from './Buttons';
import { routeHref } from '../hooks/useHashRoute';
import { useApp } from '../lib/app-context';

/** Detail view of one timeline entry, shown inside the Calendar page (#/calendar/:id). */
export function TimelineDetail({ entry }: { entry: TimelineEntry }) {
  const { back } = useApp();
  const c = categoryMeta[entry.category];
  const projectName = entry.project ? (entry.project === horeich.id ? horeich.title : getProject(entry.project)?.name) : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      aria-label={entry.title}
      className="surface-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-shape-xl shadow-elev-1"
    >
      <header className="flex items-center gap-1 px-2 pt-2">
        <IconButton icon={ArrowLeft} label="Back to the timeline" onClick={back} className="text-on-surface" />
        <span className="type-label-large text-on-surface-variant">Career path</span>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-5">
        <div className="flex gap-3 pt-2">
          <span className="w-1.5 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
          <div className="min-w-0">
            <span
              className="type-label-medium inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
              style={{ background: c.tint, color: 'var(--md-on-surface)' }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: c.color }} aria-hidden />
              {c.label}
            </span>
            <h2 className="type-headline-small mt-2 text-on-surface">{entry.title}</h2>
            <p className="type-title-small mt-1 text-primary">{formatRange(entry)}</p>
            <p className="type-body-medium mt-1 text-on-surface-variant">{entry.subtitle}</p>
          </div>
        </div>

        <h3 className="type-title-small mt-5 text-on-surface">What I did</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {entry.details.map((d) => (
            <li key={d} className="type-body-medium flex gap-2 text-on-surface">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
              {d}
            </li>
          ))}
        </ul>

        {entry.project && projectName && (
          <div className="mt-6">
            <Button variant="tonal" trailingIcon={ArrowRight} href={routeHref(entry.project)}>
              Open {projectName}
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
