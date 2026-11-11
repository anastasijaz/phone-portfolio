import {
  Briefcase,
  Dumbbell,
  GraduationCap,
  Swords,
  Users,
  School,
  Sparkles,
} from 'lucide-react';
import type { Hobby, ListEntry, SkillGroup } from './types';

/* ------------------------------------------------------------------
   Profile, contact details and the Settings app content.
   Anything marked [PLACEHOLDER] still needs your real content.
   ------------------------------------------------------------------ */

export const profile = {
  name: 'Pelagija Zlatic',
  firstName: 'Pelagija',
  initials: 'PZ',
  /** Square photo in /public. Replace public/images/profile.svg with e.g. profile.jpg and update this path. */
  photo: '/images/profile.svg',
  /** Shown in Settings while "Open to internships" is ON */
  headlineOpen: 'Product Manager, open to internships',
  /** Shown in Settings while "Open to internships" is OFF */
  headlineClosed: 'Product Manager',
  /** One-liner on the home screen */
  tagline: 'Aspiring Product Manager who turns user conversations into products people love.',
  location: '[PLACEHOLDER: City, Country]',
};

/** Default state of the "Open to internships" switch. A visitor's choice is then remembered in localStorage. */
export const openToInternshipsDefault = true;

export const contact = {
  /** What visitors see */
  phoneDisplay: '[PLACEHOLDER: +00 000 000 000]',
  /** What the tel: link dials. Digits and a leading + only. */
  phoneHref: '+000000000000',
  email: 'placeholder@example.com', // [PLACEHOLDER: your email]
  emailSubject: 'Hi Pelagija, about the internship',
  linkedin: '', // [PLACEHOLDER: https://www.linkedin.com/in/...] (leave empty to hide)
};

export const cv = {
  /** PDF in /public. Replace public/cv.pdf with your CV (same file name = nothing else to change). */
  file: '/cv.pdf',
  /** File name used when someone downloads it */
  downloadName: 'Pelagija-Zlatic-CV.pdf',
  updated: '[PLACEHOLDER: Month YYYY]',
};

export const experience: ListEntry[] = [
  {
    icon: Briefcase,
    title: '[PLACEHOLDER: Role]',
    subtitle: '[PLACEHOLDER: Company]',
    meta: '[PLACEHOLDER: Start – End]',
    details: [
      '[PLACEHOLDER: What you owned, in one line]',
      '[PLACEHOLDER: An outcome with a number, if you have one]',
    ],
  },
  {
    icon: Sparkles,
    title: 'Product lead (side projects)',
    subtitle: 'Solhof, Melt, MARIE',
    meta: '[PLACEHOLDER: Years]',
    details: [
      'Ran customer and user interviews, turned findings into prototypes',
      'Built Figma prototypes and tested them with real users',
    ],
  },
];

export const education: ListEntry[] = [
  {
    icon: GraduationCap,
    title: "[PLACEHOLDER: Bachelor's degree, field]",
    subtitle: '[PLACEHOLDER: University]',
    meta: '[PLACEHOLDER: Start – End]',
    details: ['Thesis: [PLACEHOLDER: fill in the thesis topic in one line]'],
  },
  {
    icon: School,
    title: '[PLACEHOLDER: Course, exchange or certificate]',
    subtitle: '[PLACEHOLDER: Institution]',
    meta: '[PLACEHOLDER: Year]',
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Product',
    skills: [
      'User interviews',
      'Customer discovery',
      'Problem framing',
      'Prioritisation',
      'Roadmapping',
      'Writing PRDs',
    ],
  },
  {
    title: 'Design',
    skills: ['Figma', 'Prototyping', 'Usability testing', 'User flows'],
  },
  {
    title: 'Technical',
    skills: ['[PLACEHOLDER: e.g. Python]', '[PLACEHOLDER: e.g. SQL]', 'Hardware prototyping'],
  },
  {
    title: 'Languages',
    skills: ['[PLACEHOLDER: Language (level)]', '[PLACEHOLDER: Language (level)]'],
  },
];

export const about = {
  intro:
    '[PLACEHOLDER: Two or three sentences about you. What draws you to product management, and why dating and connection products in particular?]',
  hobbies: [
    { icon: Dumbbell, title: 'Gym', subtitle: '[PLACEHOLDER: e.g. 4× a week, strength training]' },
    { icon: Swords, title: 'Squash', subtitle: '[PLACEHOLDER: one line]' },
    { icon: Users, title: 'Padel', subtitle: '[PLACEHOLDER: one line]' },
  ] satisfies Hobby[],
};
