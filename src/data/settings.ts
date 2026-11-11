import {
  Briefcase,
  Dumbbell,
  Globe,
  GraduationCap,
  Plane,
  Rocket,
  School,
  Swords,
  Ticket,
  Trophy,
  Users,
} from 'lucide-react';
import type { Hobby, ListEntry, SkillGroup } from './types';

/* ------------------------------------------------------------------
   Profile, contact details and the Settings app content.
   Anything marked [PLACEHOLDER] still needs your real content.
   ------------------------------------------------------------------ */

export const profile = {
  name: 'Anastasija Zlatic',
  firstName: 'Anastasija',
  initials: 'AZ',
  /** Square photo in /public. Replace public/images/profile.svg with e.g. profile.jpg and update this path. */
  photo: '/images/profile.svg', // [PLACEHOLDER: your photo]
  /** Shown in Settings while "Open to internships" is ON */
  headlineOpen: 'Product Manager, open to internships',
  /** Shown in Settings while "Open to internships" is OFF */
  headlineClosed: 'Product Manager',
  /** One-liner on the home screen */
  tagline: 'Industrial engineering student who turns user interviews into product features and validates them with Figma prototypes.',
};

/** Default state of the "Open to internships" switch. A visitor's choice is then remembered in localStorage. */
export const openToInternshipsDefault = true;

export const contact = {
  /**
   * Phone number shown on the Phone screen. Leave both empty to hide it:
   * the screen then leads with email and LinkedIn instead.
   * phoneHref is what the tel: link dials (digits and a leading + only).
   */
  phoneDisplay: '',
  phoneHref: '',
  email: 'anastasija.zlatic@fau.de',
  emailSubject: 'Hi Anastasija, about the internship',
  /** Leave empty to hide */
  linkedin: 'https://www.linkedin.com/in/anastasija-zlatic',
};

export const cv = {
  /** PDF in /public. Replace public/cv.pdf with your CV (same file name = nothing else to change). */
  file: '/cv.pdf',
  /** File name used when someone downloads it */
  downloadName: 'Anastasija-Zlatic-CV.pdf',
  updated: 'November 2026',
};

export const experience: ListEntry[] = [
  {
    icon: Briefcase,
    title: 'Working Student, Product Management',
    subtitle: 'HOREICH · startup for environmental and infrastructure monitoring',
    meta: 'May 2025 – Nov 2025',
    details: [
      'Supported the sales strategy and go-to-market approach for radon sensors',
      'Redesigned and optimised the company website in WordPress (structure, SEO, modern design)',
      'Created user manuals and technical documentation for sensor products',
      "Created and set up the company's LinkedIn page to increase its visibility",
    ],
  },
  {
    icon: Briefcase,
    title: 'Working Student, Project Management',
    subtitle: 'Siemens Healthineers · IT Customer Services & Enterprise Service EMEA',
    meta: 'Feb 2020 – May 2023',
    details: [
      'Built and rolled out SharePoint sites to optimise internal processes',
      'Created visual project management tools (Gantt charts, PowerPoint, Visio) for project steering',
      'Authored user manuals for web services to onboard new service engineers',
      'Organised team events',
    ],
  },
  {
    icon: Rocket,
    title: 'Co-Founder & CMO',
    subtitle: 'SportBuddy · marketing and product design',
    meta: 'Feb 2020 – May 2023',
    details: [
      'Built and managed the social media presence (Instagram, LinkedIn); drove user acquisition and community building',
      'Organised a university sports course to increase brand awareness',
    ],
  },
  {
    icon: Trophy,
    title: 'Hackathons',
    subtitle: 'Selected hackathons',
    meta: '2023 – 2026',
    details: [
      'robo.innovate 2026 with TUM Geriatronics: gave the elderly-care robot GARMI facial expressions and more emotional speech',
      'Hack den Mittelstand 2026: built an AI-agent recruiting tool for an Allianz subsidiary that screens CVs and generates tailored interview questions, now being developed further in-house',
      'Healthcare Hackathon Bayern: menopause app MARIE (Bionorica challenge)',
      'HackBay 2025, Junction Helsinki 2024, HackBay 2024, HackBay 2023 (finalist)',
    ],
  },
  {
    icon: Ticket,
    title: 'Volunteer, Special Events for LPs',
    subtitle: 'SLUSH · Helsinki, Finland',
    details: ["Supported events for limited partners at one of Europe's largest startup and investor conferences"],
  },
];

export const education: ListEntry[] = [
  {
    icon: GraduationCap,
    title: 'M.Sc. Industrial Engineering',
    subtitle: 'Friedrich-Alexander-Universität Erlangen-Nürnberg · focus: energy technology',
    meta: 'Oct 2026 – present',
    details: [
      'Coursework: Electrical Power Supply, Renewable Energies, Battery Storage Systems, Business Administration, Marketing, Microeconomics, Macroeconomics, Game Theory',
    ],
  },
  {
    icon: GraduationCap,
    title: 'B.Sc. Electrical Engineering',
    subtitle: 'Friedrich-Alexander-Universität Erlangen-Nürnberg',
    meta: 'Mar 2020 – Jun 2026',
    details: [
      'Thesis: “Analysis and Implementation of the PowerFactory Import Function into the RTDS Real-Time Simulator”',
    ],
  },
  {
    icon: Globe,
    title: 'Summer School in Social Entrepreneurship',
    subtitle: 'Shanghai, China · 10 days',
    meta: 'Jul 2026',
    details: [
      'Gained a fundamental understanding of entrepreneurship in the Chinese market',
      'Conceived and developed an app idea to keep food delivery drivers safe, in an interdisciplinary, international team',
    ],
  },
  {
    icon: School,
    title: 'Zollhof Talent Programme',
    subtitle: 'Real-world challenges from corporate partners',
    meta: 'Oct 2024 – Dec 2024',
    details: ['See the Zollhof project'],
  },
  {
    icon: School,
    title: 'FAU Digital Tech Academy Fellow + Existency Building Box',
    subtitle: 'Excellence programme of FAU Erlangen-Nürnberg',
    meta: '2023',
    details: ['Business plan development, prototyping and design thinking; developed and validated a startup idea in a diverse team'],
  },
  {
    icon: Plane,
    title: 'Life in the United States',
    subtitle: 'Childhood years and a high-school exchange',
    meta: '2003 – 2005 & exchange year',
    details: ['Lived in the US from 2003 to 2005 (preschool, 1st–2nd grade)', 'Returned for an exchange year in 10th grade at an American high school'],
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Product',
    skills: [
      'User interviews',
      'Needs analysis',
      'Solution validation',
      'Go-to-market',
      'Business plans',
      'Design thinking',
      'Pitching',
    ],
  },
  {
    title: 'Design',
    skills: ['Figma', 'UI/UX design', 'Prototyping', 'WordPress & SEO'],
  },
  {
    title: 'Project management',
    skills: ['Gantt charts', 'SharePoint', 'Visio', 'PowerPoint', 'Technical documentation', 'User manuals'],
  },
  {
    title: 'Technical',
    skills: ['Power system simulation', 'DIgSILENT PowerFactory', 'RSCAD / RTDS', 'Voice AI (LiveKit)', 'AI agents'],
  },
  {
    title: 'Languages',
    skills: ['German (native)', 'Serbian/Croatian (native)', 'English (fluent)', 'Russian (A1)', 'Korean (learning)'],
  },
];

export const about = {
  intro:
    "I love talking to customers and finding their pain points, working out what the actual issue is, even when they aren't sure themselves. That's what draws me to product management. Why Tinder? I use it myself, and I love working on problems in products I use.",
  hobbies: [
    { icon: Dumbbell, title: 'Gym', subtitle: '[PLACEHOLDER: one line, e.g. how often, what you train]' },
    { icon: Swords, title: 'Squash', subtitle: '[PLACEHOLDER: one line]' },
    { icon: Users, title: 'Padel', subtitle: '[PLACEHOLDER: one line]' },
  ] satisfies Hobby[],
};
