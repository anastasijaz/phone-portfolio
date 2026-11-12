import { Bot, HeartPulse, Microchip, ShieldCheck } from 'lucide-react';
import { MeltIcon } from '../components/icons/MeltIcon';
import type { Project } from './types';
import { MELT_URL } from '../config/links';

/* ------------------------------------------------------------------
   Projects. Order here = order of the app icons on the home screen.
   Every project has the same six cards: problem, research, interviews,
   prototype, results, next. To add a project, copy one object below,
   give it a new unique `id`, and you're done (see README).
   Anything marked [PLACEHOLDER] still needs your real content.
   ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: 'zollhof',
    name: 'Zollhof',
    iconLabel: 'Zollhof',
    icon: ShieldCheck,
    iconColors: { bg: '#2e8b6e', fg: '#ffffff' },
    categories: ['mobile'],
    tagline: 'Funeral insurance built around what people actually want: not to burden their families.',
    status: { label: 'Complete · end-to-end, app not built', tone: 'complete' },
    role: 'Zollhof Talent Programme · research, prototype, business plan',
    period: 'Oct – Dec 2024',
    tags: ['Insurtech', '30 interviews', 'Business plan', 'End-to-end'],
    cover: { src: '/images/zollhof-cover.svg', alt: 'Funeral insurance app screens' },
    intro:
      'A funeral insurance app I developed in the Talent Programme of Zollhof, a tech incubator that pairs participants with real-world challenges from corporate partners. I took it end to end: 24 interviews to understand the problem, 6 more to validate the solution, then a prototype and a business plan. The app itself was not built during the programme; the concept is now being implemented with the partner.',
    sections: {
      problem: {
        body: 'The client brief: grow funeral insurance sales by adding a new feature, delivered digitally as an app. Behind the sales goal sits a topic most people avoid: their own death and what should happen afterwards.',
      },
      research: {
        body: 'Before designing anything, I used the first interview round to explore how people feel about death: their fears, and their wishes for their own funeral.',
        bullets: ['Fear of death', 'Wishes for their own funeral'],
      },
      interviews: {
        title: 'Customer & user interviews',
        body: '24 interviews to understand the problem, then 6 validation interviews to test the solution. Both rounds pointed to the same finding. [PLACEHOLDER: who you interviewed, e.g. age range and situation]',
        metrics: [
          { value: '24', label: 'interviews to understand the problem' },
          { value: '6', label: 'interviews to validate the solution' },
        ],
        quotes: [
          { text: '[PLACEHOLDER: A verbatim quote from an interview]', who: '[PLACEHOLDER: interviewee, e.g. age]' },
          { text: '[PLACEHOLDER: A second quote]', who: '[PLACEHOLDER: interviewee]' },
        ],
      },
      prototype: {
        body: 'An app prototype built around the main finding, with a business plan behind it. The two demo videos walk through it.',
        media: [
          { type: 'video', src: '/videos/zollhof-demo-1.mp4', poster: '/images/zollhof-cover.svg', caption: 'Demo 1: [PLACEHOLDER: what it shows]' },
          { type: 'video', src: '/videos/zollhof-demo-2.mp4', poster: '/images/zollhof-cover.svg', caption: 'Demo 2: [PLACEHOLDER: what it shows]' },
          {
            type: 'figma',
            title: 'Funeral insurance prototype',
            // [PLACEHOLDER] Paste your Figma embed link here, or delete this block
            embedUrl: '[PLACEHOLDER: Figma embed URL]',
          },
        ],
      },
      results: {
        body: 'The finding held up in both interview rounds: people do not want to burden their families. They want a small, cheap, simple funeral. The prototype and business plan are now being implemented with the partner.',
        bullets: ["Don't burden the family", 'Keep it small, cheap and simple'],
      },
      next: {
        body: 'My next idea: a voice AI agent that people simply talk to about their wishes, instead of clicking through an app. The open question I would test first: could the conversation replace the app altogether?',
      },
    },
  },
  {
    id: 'melt',
    name: 'Melt',
    iconLabel: 'Melt',
    icon: MeltIcon,
    iconColors: { bg: '#ff4d6d', fg: '#ffffff' },
    categories: ['mobile', 'social'],
    tagline: 'A dating app for active people: swipe in the app, then meet offline.',
    status: { label: 'In progress · early stage', tone: 'progress' },
    role: 'My own project · concept and prototype',
    period: '2025 – present',
    tags: ['Dating', 'Sports', 'Lovable', 'In progress'],
    cover: { src: '/images/melt-cover.svg', alt: 'Melt app concept' },
    cta: { label: 'Open prototype', href: MELT_URL },
    intro:
      'Melt is a dating app for sports enthusiasts and gym-goers: you swipe in the app, then meet offline. I have been working on it on and off since 2025. It grew out of SportBuddy, the sports startup I co-founded and ran marketing for from 2020 to 2023. Melt is early: there is a prototype, but no user research yet, and this page is honest about that.',
    sections: {
      problem: {
        body: 'Dating apps don\'t work well for active people. My belief: active people want to date other active people, and today\'s apps give them no good way to find each other.',
      },
      research: {
        title: 'What SportBuddy taught me',
        body: 'SportBuddy wasn\'t niche enough. Melt narrows the focus to one clear use case: dating for people with an active lifestyle.',
      },
      interviews: {
        title: 'User interviews',
        body: 'Not yet, and that is the next step. So far Melt rests on my own belief, not on evidence. Before building further, I want to talk to 5–10 active people to test whether they actually want to date other active people.',
      },
      prototype: {
        body: 'A clickable prototype built in Lovable, covering the core idea: swipe in the app, then meet offline.',
        media: [{ type: 'link', label: 'Open prototype', href: MELT_URL }],
      },
      results: {
        title: 'Where it stands',
        body: 'A working prototype. No users, waitlist or feedback yet, so no results to show.',
      },
      next: {
        body: 'Talk to 5–10 active people first, then rework the parts of the prototype the interviews call into question. [PLACEHOLDER: next milestone after that]',
      },
    },
  },
  {
    id: 'gaming-robot',
    name: 'GARMI: robot for elderly care',
    iconLabel: 'GARMI',
    icon: Bot,
    iconColors: { bg: '#4a72c9', fg: '#ffffff' },
    categories: ['health'],
    tagline: 'Helping an elderly-care robot communicate with people who can\'t see or hear well.',
    status: { label: 'Hackathon project', tone: 'hackathon' },
    role: 'robo.innovate hackathon · frontend & eye design',
    period: 'Oct 2026 · Garmisch-Partenkirchen / Munich',
    tags: ['Hackathon', 'Robotics', 'Voice AI', 'Elderly care'],
    cover: { src: '/images/gaming-robot-cover.svg', alt: 'GARMI robot' },
    intro:
      'At robo.innovate, run with TUM Geriatronics, our team programmed GARMI, a robot that assists in elderly care, to communicate better. We gave it facial expressions and more emotional speech by integrating a LiveKit voice AI assistant, combining the robot hardware with new software. I built the frontend and designed GARMI\'s eyes.',
    sections: {
      problem: {
        body: 'GARMI needed to communicate better with elderly people, many of whom can\'t see or hear well.',
      },
      research: {
        body: 'We started with a crash course on elderly care from Caritas, the German Catholic social welfare organisation, to understand the people GARMI is meant to help.',
      },
      interviews: {
        title: 'What we observed',
        body: 'In the demo we saw where GARMI\'s conversations broke down:',
        bullets: [
          'Interrupting and talking over people',
          'No emotion in its voice or face',
          'Not noticing when several people speak',
          'Not understanding dialects',
          'Not handling long pauses: it should wait, not jump in',
        ],
      },
      prototype: {
        title: 'What we built',
        body: 'We programmed facial expressions for GARMI and integrated a LiveKit voice AI assistant, so the robot speaks with more emotion. My part was the frontend and the design of GARMI\'s eyes.',
        bullets: [
          'Frontend and eye design (my part)',
          'Facial expressions for the robot',
          'More emotional speech via a LiveKit voice AI assistant',
        ],
        media: [
          { type: 'video', src: '/videos/garmi-demo.mp4', caption: 'GARMI demo' },
          { type: 'image', src: '/images/gaming-robot-cover.svg', alt: 'GARMI robot', caption: '[PLACEHOLDER: photo of GARMI or your eye designs]' },
        ],
      },
      results: {
        body: 'We demoed the new GARMI at the end of the hackathon. [PLACEHOLDER: jury feedback]',
      },
      next: {
        body: '[PLACEHOLDER: Which of the observed problems are still open, e.g. dialects, several speakers, long pauses, and how you would tackle them.]',
      },
    },
  },
  {
    id: 'thesis',
    name: "Bachelor's thesis",
    iconLabel: 'Thesis',
    icon: Microchip,
    iconColors: { bg: '#7058b8', fg: '#ffffff' },
    categories: ['internal'],
    tagline: 'When does automatic conversion of power-grid models from RMS to EMT simulation work, and when does it fail?',
    status: { label: 'Technical side project', tone: 'side' },
    role: 'B.Sc. Electrical Engineering · FAU Erlangen-Nürnberg',
    period: '2026',
    tags: ['Power systems', 'Simulation', 'PowerFactory', 'RTDS'],
    intro:
      'My bachelor\'s thesis, “Analysis and Implementation of the PowerFactory Import Function into the RTDS Real-Time Simulator”, presented here as a technical side project. I evaluated a DGS-based conversion tool that moves power system models from DIgSILENT PowerFactory (RMS simulation) into RSCAD/RTDS (real-time EMT simulation), and tested where it works and where it breaks on the IEEE 9-bus and 39-bus benchmark systems.',
    sections: {
      problem: {
        title: 'Problem',
        body: 'Converting power-grid models by hand from one simulation world to the other is slow and error-prone, and the result is hard to reproduce or verify. An automatic converter promises to fix that, but only if you know when you can trust it.',
      },
      research: {
        title: 'Background: RMS vs EMT',
        body: 'RMS simulation works with fundamental-frequency averaged quantities: it is fast and suited to large systems. EMT simulation resolves the instantaneous waveforms and fast transients, which takes much more computation.',
      },
      interviews: {
        title: 'Evaluation setup',
        body: 'I ran the converted models on two IEEE benchmark systems and compared them with the originals on four quantities:',
        bullets: ['Bus voltages', 'Generator active power', 'Generator reactive power', 'Rotor speed'],
        metrics: [
          { value: '9-bus', label: 'IEEE benchmark' },
          { value: '39-bus', label: 'IEEE benchmark' },
        ],
      },
      prototype: {
        title: 'What I did',
        body: 'Rather than building a new tool, I tested the existing conversion tool systematically: in which cases the converted models work, and in which they fail.',
      },
      results: {
        body: '[PLACEHOLDER: How closely the results matched for the 9-bus and the 39-bus system, and at what system size the conversion starts to fail.]',
      },
      next: { body: '[PLACEHOLDER: What would make the conversion trustworthy for larger grids, or what you would test next.]' },
    },
  },
  {
    id: 'marie',
    name: 'MARIE',
    iconLabel: 'MARIE',
    icon: HeartPulse,
    iconColors: { bg: '#e8835a', fg: '#ffffff' },
    categories: ['mobile', 'health'],
    tagline: 'A health app for women in menopause who don\'t feel listened to.',
    status: { label: 'Concept · continued after the hackathon', tone: 'concept' },
    role: 'Healthcare Hackathon Bayern · Bionorica challenge',
    period: '2024 – 2025',
    tags: ['Health', 'Menopause', 'User interviews', 'Figma', 'Pitch'],
    cover: { src: '/images/marie-cover.svg', alt: 'MARIE prototype screens' },
    intro:
      'MARIE is a menopause app for women aged 35 to 50 in perimenopause, menopause or postmenopause. It started at the Healthcare Hackathon Bayern as an answer to Bionorica\'s challenge. I ran user interviews and a needs analysis, derived the key features from those conversations, and designed the UI/UX in Figma. We named it MARIE because it should sound like a friend, not a medical product.',
    sections: {
      problem: {
        body: 'Women going through menopause often feel left alone with it.',
        bullets: [
          'Insufficient support from their doctors',
          'Not feeling listened to',
          'Often not even knowing they have entered menopause',
        ],
      },
      research: {
        title: 'Needs analysis',
        body: '[PLACEHOLDER: confirm what women said about tracking their symptoms. Your notes conflict: one says they want to track symptoms, an earlier one says they don\'t.]',
      },
      interviews: {
        body: 'We ran around 15 user interviews, and every key feature came directly out of those conversations. [PLACEHOLDER: who you spoke to]',
        metrics: [{ value: '~15', label: 'user interviews' }],
        quotes: [{ text: '[PLACEHOLDER: A quote from an interview]', who: '[PLACEHOLDER: e.g. woman, 48]' }],
      },
      prototype: {
        title: 'Prototypes',
        body: 'I designed the UI/UX for the app in Figma. [PLACEHOLDER: which screens and flows the prototypes show]',
        media: [
          { type: 'figma', title: 'MARIE prototype 1', embedUrl: '[PLACEHOLDER: Figma embed URL]' },
          { type: 'figma', title: 'MARIE prototype 2', embedUrl: '[PLACEHOLDER: Figma embed URL]' },
        ],
      },
      results: {
        body: 'We pitched MARIE at the hackathon and kept developing it afterwards, up to a follow-up conversation with the Bavarian Ministry of Health. The Ministry liked the idea and sees menopause as an important topic, but has no budget to fund it.',
      },
      next: { body: '[PLACEHOLDER: Next steps, e.g. other funding routes, a partner, or a first pilot.]' },
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
