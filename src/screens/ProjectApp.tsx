import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CircleAlert,
  ExternalLink,
  Layers,
  MessagesSquare,
  Rocket,
  Search,
  Share2,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import type { Project, ProjectSection, ProjectStatusTone } from '../data/types';
import { projects } from '../data/projects';
import { profile } from '../data/settings';
import { AppScreen, useScrollRoot } from '../components/AppScreen';
import { Button, IconButton } from '../components/Buttons';
import { MediaItem } from '../components/Media';
import { routeHref } from '../hooks/useHashRoute';

const sectionMeta: { key: keyof Project['sections']; title: string; icon: LucideIcon }[] = [
  { key: 'problem', title: 'Problem', icon: CircleAlert },
  { key: 'research', title: 'Research', icon: Search },
  { key: 'interviews', title: 'User interviews', icon: MessagesSquare },
  { key: 'prototype', title: 'Prototype', icon: Layers },
  { key: 'results', title: 'Results', icon: Trophy },
  { key: 'next', title: "What's next", icon: Rocket },
];

const statusTone: Record<ProjectStatusTone, string> = {
  complete: 'bg-success-container text-on-success-container',
  progress: 'bg-tertiary-container text-on-tertiary-container',
  hackathon: 'bg-primary-container text-on-primary-container',
  side: 'bg-secondary-container text-on-secondary-container',
  concept: 'bg-secondary-container text-on-secondary-container',
};

function SectionCard({ title, icon: Icon, section, index }: { title: string; icon: LucideIcon; section: ProjectSection; index: number }) {
  const root = useScrollRoot();
  const isNext = index === sectionMeta.length - 1;
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, root: root ?? undefined }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className={`rounded-shape-xl p-5 ${isNext ? 'bg-primary-container text-on-primary-container' : 'surface-card text-on-surface'}`}
      aria-labelledby={`card-${index}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isNext ? 'bg-brand-gradient' : 'bg-secondary-container text-on-secondary-container'
          }`}
          aria-hidden
        >
          <Icon size={20} />
        </span>
        <div>
          <p className="type-label-small uppercase tracking-wider opacity-70">{String(index + 1).padStart(2, '0')}</p>
          <h3 id={`card-${index}`} className="type-title-medium">
            {section.title ?? title}
          </h3>
        </div>
      </div>

      <p className="type-body-medium">{section.body}</p>

      {section.metrics && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {section.metrics.map((m) => (
            <div key={m.label} className="rounded-shape-l bg-surface-container-highest p-3 text-on-surface">
              <p className="type-headline-small text-primary">{m.value}</p>
              <p className="type-body-small text-on-surface-variant">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {section.quotes && (
        <div className="mt-4 flex flex-col gap-2">
          {section.quotes.map((q) => (
            <blockquote key={q.text} className="rounded-shape-l border-l-4 border-primary bg-surface-container-highest px-4 py-3 text-on-surface">
              <p className="type-body-medium italic">“{q.text}”</p>
              <footer className="type-label-medium mt-1 text-on-surface-variant">{q.who}</footer>
            </blockquote>
          ))}
        </div>
      )}

      {section.bullets && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {section.bullets.map((b) => (
            <li key={b} className="type-body-medium flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.media && (
        <div className="mt-4 flex flex-col gap-4">
          {section.media.map((m, i) => (
            <MediaItem key={i} media={m} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

export function ProjectApp({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);
  const idx = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(idx + 1) % projects.length];
  const Icon = project.icon;

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/${project.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${project.name} · ${profile.name}`, text: project.tagline, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <AppScreen
      title={project.name}
      collapseTitle
      actions={<IconButton icon={Share2} label="Share project link" onClick={share} />}
      overlay={
        copied && (
          <div role="status" className="type-body-medium absolute inset-x-4 bottom-4 z-30 rounded-shape-xs bg-inverse-surface px-4 py-3 text-inverse-on-surface shadow-elev-3">
            Link copied
          </div>
        )
      }
    >
      <div className="flex flex-col gap-4 px-4 pb-10">
        {/* Intro */}
        <header className="flex flex-col gap-4 pt-2">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-elev-2"
              style={{ background: project.iconColors.bg, color: project.iconColors.fg }}
              aria-hidden
            >
              {project.iconImage ? (
                <img src={project.iconImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <Icon size={32} />
              )}
            </span>
            <div className="min-w-0">
              <h2 className="type-headline-small">{project.name}</h2>
              <p className="type-body-medium text-on-surface-variant">{project.role}</p>
            </div>
          </div>

          <p className="type-body-large">{project.tagline}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`type-label-large inline-flex h-8 items-center gap-1.5 rounded-shape-s px-3 ${statusTone[project.status.tone]}`}>
              <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
              {project.status.label}
            </span>
            <span className="type-label-large inline-flex h-8 items-center rounded-shape-s border border-outline-variant px-3 text-on-surface-variant">
              {project.period}
            </span>
          </div>

          {project.cover && (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="aspect-[16/10] w-full rounded-shape-xl bg-surface-container-highest object-cover"
            />
          )}

          <p className="type-body-medium text-on-surface-variant">{project.intro}</p>

          {project.cta && (
            <div>
              <Button variant="filled" icon={ExternalLink} href={project.cta.href} target="_blank" rel="noopener noreferrer">
                {project.cta.label}
              </Button>
            </div>
          )}

          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((t) => (
              <li key={t} className="type-label-medium rounded-shape-s bg-surface-container-high px-2.5 py-1 text-on-surface-variant">
                {t}
              </li>
            ))}
          </ul>
        </header>

        {/* Case study cards (same structure for every project) */}
        {sectionMeta.map((s, i) => (
          <SectionCard key={s.key} title={s.title} icon={s.icon} section={project.sections[s.key]} index={i} />
        ))}

        {nextProject && nextProject.id !== project.id && (
          <div className="flex justify-end pt-2">
            <Button variant="tonal" trailingIcon={ArrowRight} href={routeHref(nextProject.id)}>
              Next: {nextProject.name}
            </Button>
          </div>
        )}
      </div>
    </AppScreen>
  );
}
