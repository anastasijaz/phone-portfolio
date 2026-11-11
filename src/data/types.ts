import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------
   Shared content types. Components only read these shapes, so you can
   edit the data files freely as long as they match.
   ------------------------------------------------------------------ */

/** Media that can appear inside a project card. Paths are relative to /public. */
export type Media =
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'video'; src: string; poster?: string; caption?: string }
  /** Figma: paste the link from Share → "Get embed code" (the https://embed.figma.com/... or figma.com/embed?... URL). */
  | { type: 'figma'; embedUrl: string; title: string; caption?: string }
  /** A button that opens a live prototype or site in a new tab (e.g. Lovable, Framer). */
  | { type: 'link'; href: string; label: string; caption?: string };

export interface Quote {
  text: string;
  /** Who said it, e.g. "Customer, 58" or "User interview #3" */
  who: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ProjectSection {
  /** Optional override for the card title (defaults are set per section). */
  title?: string;
  body: string;
  bullets?: string[];
  quotes?: Quote[];
  metrics?: Metric[];
  media?: Media[];
}

export type ProjectStatusTone = 'complete' | 'progress' | 'hackathon' | 'side' | 'concept';

/** Filter pills on the home screen. A project can be in several. */
export type ProjectCategory = 'mobile' | 'web' | 'social' | 'health' | 'internal';

export interface Project {
  /** Used for the deep link: #/<id> */
  id: string;
  name: string;
  /** Short label shown under the home screen icon */
  iconLabel: string;
  icon: LucideIcon;
  /** Optional image icon in /public, overrides `icon` (square, at least 192×192). */
  iconImage?: string;
  /** Icon tile colors: one solid background, white glyph */
  iconColors: { bg: string; fg: string };
  /** Which filter pills show this project */
  categories: ProjectCategory[];
  tagline: string;
  status: { label: string; tone: ProjectStatusTone };
  role: string;
  period: string;
  tags: string[];
  cover?: { src: string; alt: string };
  intro: string;
  /** Every project uses the same six cards, in this order. */
  sections: {
    problem: ProjectSection;
    research: ProjectSection;
    interviews: ProjectSection;
    prototype: ProjectSection;
    results: ProjectSection;
    next: ProjectSection;
  };
}

/** Timeline color groups; colors live in src/index.css (--cat-*) */
export type TimelineCategory = 'hackathon' | 'university' | 'work' | 'project';

export interface TimelineEntry {
  /** "YYYY", "YYYY-MM" or "YYYY-MM-DD" */
  date: string;
  /** Optional end date, or "present" */
  end?: string;
  title: string;
  /** Role or short description */
  subtitle: string;
  /** Hash route to open, e.g. "zollhof" or "settings/education" */
  link: string;
  category: TimelineCategory;
}

export interface ListEntry {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  meta?: string;
  details?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Hobby {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}
