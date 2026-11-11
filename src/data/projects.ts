import { Bot, Flame, HeartPulse, Microchip, ShieldCheck } from 'lucide-react';
import type { Project } from './types';

/* ------------------------------------------------------------------
   Projects. Order here = order of the app icons on the home screen.
   Every project has the same six cards: problem, research, interviews,
   prototype, results, next. To add a project, copy one object below,
   give it a new unique `id`, and you're done (see README).
   Anything marked [PLACEHOLDER] still needs your real content.
   ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: 'solhof',
    name: 'Solhof',
    iconLabel: 'Solhof',
    icon: ShieldCheck,
    iconColors: { bg: '#2f5d50', fg: '#e6f4ee' },
    tagline: 'Funeral insurance that feels human, not bureaucratic.',
    status: { label: 'Complete · end-to-end, app not built', tone: 'complete' },
    role: 'Product lead · research, UX, prototype',
    period: '[PLACEHOLDER: e.g. Feb – Jun 2025]',
    tags: ['Insurtech', 'Customer interviews', 'Figma', 'End-to-end'],
    cover: { src: '/images/solhof-cover.svg', alt: 'Solhof app screens' },
    intro:
      'Solhof is a funeral insurance app concept I took from first customer conversation to a tested, clickable prototype. It covers the full product process end to end. The app itself was not built, so this case study is about the discovery, the decisions, and what the prototype proved. [PLACEHOLDER: add one line on context, e.g. course, client or startup]',
    sections: {
      problem: {
        body: '[PLACEHOLDER: Describe the problem in two sentences. Example: buying funeral insurance is emotionally heavy and confusing, so people postpone it and their families end up paying the price.]',
        bullets: [
          '[PLACEHOLDER: Pain point 1]',
          '[PLACEHOLDER: Pain point 2]',
          '[PLACEHOLDER: Pain point 3]',
        ],
      },
      research: {
        body: '[PLACEHOLDER: What desk research and market analysis you did, and the key insight it gave you.]',
        bullets: [
          '[PLACEHOLDER: Competitor or market finding]',
          '[PLACEHOLDER: Regulatory or pricing finding]',
        ],
      },
      interviews: {
        title: 'Customer & user interviews',
        body: 'I interviewed both sides: customers who would buy the policy and the people who would use the app. [PLACEHOLDER: how many interviews, with whom, and how you ran them]',
        metrics: [
          { value: '[#]', label: 'customer interviews' },
          { value: '[#]', label: 'user interviews' },
        ],
        quotes: [
          { text: '[PLACEHOLDER: A quote from a customer that changed your thinking]', who: 'Customer [PLACEHOLDER]' },
          { text: '[PLACEHOLDER: A quote from a user]', who: 'User [PLACEHOLDER]' },
        ],
        bullets: ['[PLACEHOLDER: Key insight 1]', '[PLACEHOLDER: Key insight 2]'],
      },
      prototype: {
        body: 'A clickable Figma prototype covering [PLACEHOLDER: the core flows, e.g. onboarding, choosing a plan, adding a beneficiary]. The demo videos walk through the main flows.',
        media: [
          {
            type: 'figma',
            title: 'Solhof prototype',
            // [PLACEHOLDER] Paste your Figma embed link here
            embedUrl: '[PLACEHOLDER: Figma embed URL]',
          },
          { type: 'video', src: '/videos/solhof-demo-1.mp4', poster: '/images/solhof-cover.svg', caption: 'Demo 1: [PLACEHOLDER: flow name]' },
          { type: 'video', src: '/videos/solhof-demo-2.mp4', poster: '/images/solhof-cover.svg', caption: 'Demo 2: [PLACEHOLDER: flow name]' },
        ],
      },
      results: {
        body: '[PLACEHOLDER: What the testing showed. Did users complete the flow? What did they understand, and what not?]',
        metrics: [
          { value: '[PLACEHOLDER]', label: 'task success' },
          { value: '[PLACEHOLDER]', label: 'testers' },
        ],
        bullets: ['[PLACEHOLDER: Result or learning]'],
      },
      next: {
        body: '[PLACEHOLDER: What you would do next if Solhof were built, e.g. MVP scope, pilot with an insurer, pricing test.]',
      },
    },
  },
  {
    id: 'melt',
    name: 'Melt',
    iconLabel: 'Melt',
    icon: Flame,
    iconColors: { bg: '#e2475a', fg: '#fff1f2' },
    tagline: 'A dating app for sports enthusiasts and gym-goers.',
    status: { label: 'In progress', tone: 'progress' },
    role: 'Founder & product lead',
    period: '[PLACEHOLDER: Start] – present',
    tags: ['Dating', 'Sports', 'Community', 'In progress'],
    cover: { src: '/images/melt-cover.svg', alt: 'Melt app concept' },
    intro:
      'Melt matches people who share an active lifestyle, so a first date can be a squash match, a padel game or a gym session. It is in progress: this page shows where it stands today. [PLACEHOLDER: one line on current stage]',
    sections: {
      problem: {
        body: '[PLACEHOLDER: Why mainstream dating apps fail active people. Example: shared routines matter more than photos, but no app lets you match on them.]',
        bullets: ['[PLACEHOLDER: Pain point 1]', '[PLACEHOLDER: Pain point 2]'],
      },
      research: {
        body: '[PLACEHOLDER: Market and competitor research so far.]',
      },
      interviews: {
        body: '[PLACEHOLDER: Who you have talked to (gym-goers, club players), how many, and what you heard.]',
        quotes: [{ text: '[PLACEHOLDER: A quote from an interview]', who: '[PLACEHOLDER: e.g. Padel player, 27]' }],
      },
      prototype: {
        body: '[PLACEHOLDER: Current prototype status and what it covers.]',
        media: [{ type: 'figma', title: 'Melt prototype', embedUrl: '[PLACEHOLDER: Figma embed URL]' }],
      },
      results: {
        title: 'Results so far',
        body: '[PLACEHOLDER: Early signals, e.g. waitlist sign-ups, test feedback.]',
      },
      next: {
        body: '[PLACEHOLDER: The next milestones, e.g. MVP, beta with a local gym or club.]',
      },
    },
  },
  {
    id: 'gaming-robot',
    name: 'Gaming robot for elderly care',
    iconLabel: 'Care Robot',
    icon: Bot,
    iconColors: { bg: '#3b5ba5', fg: '#e8eeff' },
    tagline: 'A hackathon robot that brings play into elderly care.',
    status: { label: 'Hackathon project', tone: 'hackathon' },
    role: '[PLACEHOLDER: Your role in the team]',
    period: '[PLACEHOLDER: Hackathon name, date]',
    tags: ['Hackathon', 'Hardware', 'Software', 'Health'],
    cover: { src: '/images/gaming-robot-cover.svg', alt: 'Gaming robot prototype' },
    intro:
      'At [PLACEHOLDER: hackathon name] our team built a robot that plays games with elderly people in care homes, combining hardware and software in [PLACEHOLDER: e.g. 48 hours].',
    sections: {
      problem: {
        body: '[PLACEHOLDER: Loneliness and inactivity in elderly care, and why a game-playing robot helps.]',
      },
      research: {
        body: '[PLACEHOLDER: What you learned about care homes, caregivers and residents before building.]',
      },
      interviews: {
        body: '[PLACEHOLDER: Who you spoke with during the hackathon (caregivers, mentors, residents) and what you learned.]',
      },
      prototype: {
        body: '[PLACEHOLDER: The hardware (e.g. microcontroller, sensors, motors) and software (e.g. game logic, app) you built.]',
        media: [{ type: 'image', src: '/images/gaming-robot-cover.svg', alt: 'Robot prototype', caption: '[PLACEHOLDER: photo caption]' }],
      },
      results: {
        body: '[PLACEHOLDER: Demo outcome, jury feedback, placement.]',
      },
      next: {
        body: '[PLACEHOLDER: What a pilot in a care home could look like.]',
      },
    },
  },
  {
    id: 'thesis',
    name: "Bachelor's thesis",
    iconLabel: 'Thesis',
    icon: Microchip,
    iconColors: { bg: '#5b4a8a', fg: '#efe9ff' },
    tagline: '[PLACEHOLDER: fill in the thesis topic in one line]',
    status: { label: 'Technical side project', tone: 'side' },
    role: 'Author',
    period: '[PLACEHOLDER: Year]',
    tags: ['Technical', 'Research', '[PLACEHOLDER: topic tag]'],
    intro:
      'My bachelor\'s thesis, presented here as a technical side project. Topic: [PLACEHOLDER: fill in the thesis topic in one line]',
    sections: {
      problem: { title: 'Research question', body: '[PLACEHOLDER: The question your thesis answers.]' },
      research: { title: 'Background', body: '[PLACEHOLDER: Related work and method.]' },
      interviews: {
        title: 'Experts & users',
        body: '[PLACEHOLDER: Any interviews, expert input or user studies. If none, describe the evaluation setup.]',
      },
      prototype: { title: 'What I built', body: '[PLACEHOLDER: The system, model or prototype.]' },
      results: { body: '[PLACEHOLDER: Main findings and grade, if you want to share it.]' },
      next: { body: '[PLACEHOLDER: What a product built on this could look like.]' },
    },
  },
  {
    id: 'marie',
    name: 'MARIE',
    iconLabel: 'MARIE',
    icon: HeartPulse,
    iconColors: { bg: '#00696d', fg: '#e0fbfb' },
    tagline: 'A health app concept. [PLACEHOLDER: one-line description]',
    status: { label: 'Concept', tone: 'concept' },
    role: '[PLACEHOLDER: Your role]',
    period: '[PLACEHOLDER: Date]',
    tags: ['Health', 'Concept', 'Figma'],
    cover: { src: '/images/marie-cover.svg', alt: 'MARIE prototype screens' },
    intro: 'MARIE is a health app concept with Figma prototypes. [PLACEHOLDER: what MARIE stands for and who it is for]',
    sections: {
      problem: { body: '[PLACEHOLDER: The health problem MARIE addresses.]' },
      research: { body: '[PLACEHOLDER: Research done.]' },
      interviews: { body: '[PLACEHOLDER: Interviews or tests with users.]' },
      prototype: {
        title: 'Prototypes',
        body: '[PLACEHOLDER: What the Figma prototypes show.]',
        media: [
          { type: 'figma', title: 'MARIE prototype 1', embedUrl: '[PLACEHOLDER: Figma embed URL]' },
          { type: 'figma', title: 'MARIE prototype 2', embedUrl: '[PLACEHOLDER: Figma embed URL]' },
        ],
      },
      results: { body: '[PLACEHOLDER: What you learned.]' },
      next: { body: '[PLACEHOLDER: Next steps.]' },
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
