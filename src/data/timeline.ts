import type { TimelineEntry } from './types';

/* ------------------------------------------------------------------
   Career path shown in the calendar widget on the home screen.
   Entries are grouped by year and sorted by `date` automatically,
   so the order in this list does not matter.
   `link` is a route: a project id ("solhof") or a settings page
   ("settings/education", "settings/experience").

   [PLACEHOLDER] All dates below are guesses. Replace them with real ones.
   ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  {
    date: '2022-10', // [PLACEHOLDER: date]
    title: "Started bachelor's degree",
    subtitle: '[PLACEHOLDER: University]',
    link: 'settings/education',
    color: 'secondary',
  },
  {
    date: '2023-11', // [PLACEHOLDER: date]
    title: 'MARIE health app',
    subtitle: 'Concept · Figma prototypes',
    link: 'marie',
    color: 'tertiary',
  },
  {
    date: '2024-04', // [PLACEHOLDER: date]
    title: 'Gaming robot hackathon',
    subtitle: 'Hardware + software for elderly care',
    link: 'gaming-robot',
    color: 'primary',
  },
  {
    date: '2024-09', // [PLACEHOLDER: date]
    end: '2025-02',
    title: "Bachelor's thesis",
    subtitle: 'Technical side project',
    link: 'thesis',
    color: 'secondary',
  },
  {
    date: '2025-02', // [PLACEHOLDER: date]
    end: '2025-06',
    title: 'Solhof',
    subtitle: 'Funeral insurance · end-to-end',
    link: 'solhof',
    color: 'success',
  },
  {
    date: '2025-09', // [PLACEHOLDER: date]
    end: 'present',
    title: 'Melt',
    subtitle: 'Dating for active people · in progress',
    link: 'melt',
    color: 'primary',
  },
];
