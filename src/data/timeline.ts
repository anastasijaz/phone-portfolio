import type { TimelineEntry } from './types';

/* ------------------------------------------------------------------
   Career path shown in the calendar widget on the home screen.
   The widget sorts entries itself, newest first (by end date, so
   ongoing and recently finished entries come first). The order in
   this list does not matter.

   date / end: "YYYY", "YYYY-MM" or "YYYY-MM-DD"; end can be "present".
   category:   hackathon | university | work | project (sets the color)
   link:       a project id ("zollhof") or a settings page
               ("settings/education", "settings/experience").
   ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  // ---- Work -------------------------------------------------------
  {
    date: '2020-02',
    end: '2023-05',
    title: 'Siemens Healthineers',
    subtitle: 'Working student, project management',
    link: 'settings/experience',
    category: 'work',
  },
  {
    date: '2025-05',
    end: '2025-11',
    title: 'HOREICH',
    subtitle: 'Working student, product management',
    link: 'settings/experience',
    category: 'work',
  },

  // ---- University and courses -------------------------------------
  {
    date: '2020-03',
    end: '2026-06',
    title: 'B.Sc. Electrical Engineering',
    subtitle: 'FAU Erlangen-Nürnberg',
    link: 'settings/education',
    category: 'university',
  },
  {
    date: '2023',
    title: 'FAU Digital Tech Academy',
    subtitle: 'Fellow + Existency Building Box',
    link: 'settings/education',
    category: 'university',
  },
  {
    date: '2026-07',
    title: 'Summer School, Shanghai',
    subtitle: 'Social entrepreneurship · 10 days',
    link: 'settings/education',
    category: 'university',
  },
  {
    date: '2026-10',
    end: 'present',
    title: 'M.Sc. Industrial Engineering',
    subtitle: 'FAU · focus on energy technology',
    link: 'settings/education',
    category: 'university',
  },

  // ---- Startups and projects --------------------------------------
  {
    date: '2020-02',
    end: '2023-05',
    title: 'SportBuddy',
    subtitle: 'Co-founder & CMO · the roots of Melt',
    link: 'melt',
    category: 'project',
  },
  {
    date: '2024-10',
    end: '2024-12',
    title: 'Zollhof',
    subtitle: 'Funeral insurance app · Talent Programme',
    link: 'zollhof',
    category: 'project',
  },
  {
    date: '2025',
    end: 'present',
    title: 'Melt',
    subtitle: 'Dating app for active people · in progress',
    link: 'melt',
    category: 'project',
  },
  {
    date: '2026-06',
    title: "Bachelor's thesis",
    subtitle: 'PowerFactory → RTDS model conversion',
    link: 'thesis',
    category: 'project',
  },

  // ---- Hackathons (from the CV) -----------------------------------
  {
    date: '2023',
    title: 'HackBay 2023',
    subtitle: 'Finalist',
    link: 'settings/experience',
    category: 'hackathon',
  },
  {
    date: '2024',
    title: 'HackBay 2024',
    subtitle: 'Hackathon',
    link: 'settings/experience',
    category: 'hackathon',
  },
  {
    date: '2024',
    title: 'Junction Helsinki',
    subtitle: 'Hackathon',
    link: 'settings/experience',
    category: 'hackathon',
  },
  {
    date: '2024',
    title: 'Healthcare Hackathon Bayern',
    subtitle: 'MARIE menopause app · Bionorica challenge',
    link: 'marie',
    category: 'hackathon',
  },
  {
    date: '2025',
    title: 'HackBay 2025',
    subtitle: 'Hackathon',
    link: 'settings/experience',
    category: 'hackathon',
  },
  {
    date: '2026-03',
    title: 'Hack den Mittelstand, Munich',
    subtitle: 'AI-agent recruiting tool for an Allianz subsidiary',
    link: 'settings/experience',
    category: 'hackathon',
  },
  {
    date: '2026-10',
    title: 'robo.innovate · GARMI',
    subtitle: 'With TUM Geriatronics · frontend & eye design',
    link: 'gaming-robot',
    category: 'hackathon',
  },
];
