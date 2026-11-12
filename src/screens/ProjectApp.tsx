import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Share2 } from 'lucide-react';
import type { Project, ProjectSection } from '../data/types';
import { homeScreenProjects } from '../data/projects';
import { profile } from '../data/settings';
import { isLinkPlaceholder } from '../config/links';
import { AppScreen, useScrollRoot } from '../components/AppScreen';
import { Button, IconButton } from '../components/Buttons';
import { MediaItem } from '../components/Media';
import { routeHref } from '../hooks/useHashRoute';

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((b) => (
        <li key={b} className="type-body-medium flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          {b}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({ section, index }: { section: ProjectSection; index: number }) {
  const root = useScrollRoot();
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, root: root ?? undefined }}
      transition={{ duration: 0.36, ease: [0.2, 0, 0, 1] }}
      className="surface-card rounded-shape-xl p-5 text-on-surface"
      aria-labelledby={`section-${index}`}
    >
      <h3 id={`section-${index}`} className="type-title-medium mb-1.5">
        {section.title}
      </h3>
      {section.body && <p className="type-body-medium">{section.body}</p>}
      {section.bullets && <Bullets items={section.bullets} />}
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

function ProjectButtons({ buttons }: { buttons: NonNullable<Project['buttons']> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((b, i) => (
        <Button
          key={b.label}
          variant={i === 0 ? 'filled' : 'tonal'}
          icon={ExternalLink}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          disabled={isLinkPlaceholder(b.href)}
        >
          {b.label}
        </Button>
      ))}
    </div>
  );
}

/** One project page: title, status line, summary, sections, media, buttons. */
export function ProjectApp({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);
  const idx = homeScreenProjects.findIndex((p) => p.id === project.id);
  const nextProject = idx === -1 ? undefined : homeScreenProjects[(idx + 1) % homeScreenProjects.length];
  const Icon = project.icon;

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/${project.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${project.name} · ${profile.name}`, text: project.summary, url });
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
        <header className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-elev-2"
              style={{ background: project.iconColors.bg, color: project.iconColors.fg }}
              aria-hidden
            >
              {project.iconImage ? <img src={project.iconImage} alt="" className="h-full w-full object-cover" /> : <Icon size={32} />}
            </span>
            <div className="min-w-0">
              <h2 className="type-headline-small">{project.name}</h2>
              <p className="type-label-large mt-1 inline-flex items-center gap-1.5 text-primary">
                <span className="h-2 w-2 shrink-0 rounded-full bg-current" aria-hidden />
                <span>
                  <span className="sr-only">Status: </span>
                  {project.status}
                </span>
              </p>
            </div>
          </div>
          <p className="type-body-large">{project.summary}</p>
        </header>

        {project.sections.map((s, i) => (
          <SectionCard key={s.title} section={s} index={i} />
        ))}

        {project.media && project.media.length > 0 && (
          <section className="surface-card rounded-shape-xl p-5 text-on-surface" aria-labelledby="project-media">
            <h3 id="project-media" className="type-title-medium mb-3">
              Media
            </h3>
            <div className="flex flex-col gap-4">
              {project.media.map((m, i) => (
                <MediaItem key={i} media={m} />
              ))}
            </div>
          </section>
        )}

        {project.buttons && project.buttons.length > 0 && <ProjectButtons buttons={project.buttons} />}

        {nextProject && nextProject.id !== project.id && (
          <div className="flex justify-end pt-2">
            <Button variant="text" trailingIcon={ArrowRight} href={routeHref(nextProject.id)}>
              Next: {nextProject.name}
            </Button>
          </div>
        )}
      </div>
    </AppScreen>
  );
}
