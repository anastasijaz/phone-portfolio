import type { TimelineEntry } from './types';

/* ------------------------------------------------------------------
   Career path on the Calendar page (home screen page 2).
   Sorted newest first automatically; the order here does not matter.
   Tapping an entry opens its detail view at #/calendar/<id>.

   date / end: "YYYY", "YYYY-MM" or "YYYY-MM-DD"; end can be "present".
   category:   hackathon | university | work | project (sets the color)
   details:    what was done, in the CV's wording
   project:    optional project page to link from the detail view
   ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  // ---- Work -------------------------------------------------------
  {
    id: 'siemens-healthineers',
    date: '2020-02',
    end: '2023-05',
    title: 'Siemens Healthineers',
    subtitle: 'Working Student, Project Management · IT Customer Services & Enterprise Service EMEA',
    category: 'work',
    details: [
      'Built and rolled out SharePoint sites to optimize internal processes',
      'Created visual project management tools (Gantt charts, PowerPoint, Visio) for project steering',
      'Authored user manuals for web services to onboard new service engineers',
      'Organized team events',
    ],
  },
  {
    id: 'horeich',
    date: '2025-05',
    end: '2025-11',
    title: 'HOREICH',
    subtitle: 'Working Student, Product Management · Startup for environmental and infrastructure monitoring',
    category: 'work',
    details: [
      'Redesigned and optimized the company website in WordPress (structure, SEO, modern design)',
      'Created user manuals and technical documentation for sensor products',
      'Supported development of the sales strategy and go-to-market approach for radon sensors',
      "Created and set up the company's LinkedIn page to increase its visibility",
    ],
    project: 'horeich',
  },

  // ---- University and courses -------------------------------------
  {
    id: 'bsc-electrical-engineering',
    date: '2020-03',
    end: '2026-06',
    title: 'B.Sc. Electrical Engineering',
    subtitle: 'General Electrical Engineering · Friedrich-Alexander-Universität Erlangen-Nürnberg',
    category: 'university',
    details: [
      'Bachelor\'s thesis: “Analysis and Implementation of the PowerFactory Import Function into the RTDS Real-Time Simulator” — evaluated a DGS-based conversion tool automating the transfer of power system models from DIgSILENT PowerFactory (RMS simulation) into RSCAD/RTDS (real-time EMT simulation), validated on IEEE 9-bus and 39-bus benchmark systems.',
    ],
    project: 'thesis',
  },
  {
    id: 'fau-digital-tech-academy',
    date: '2023',
    title: 'FAU Digital Tech Academy',
    subtitle: 'Fellow + Existency Building Box · Excellence programme of Friedrich-Alexander-Universität Erlangen-Nürnberg',
    category: 'university',
    details: ['Learned business plan development, prototyping and design thinking; developed and validated a startup idea in a diverse team'],
  },
  {
    id: 'summer-school-shanghai',
    date: '2026-07',
    title: 'Summer School in Social Entrepreneurship',
    subtitle: 'Shanghai, China · 10 days',
    category: 'university',
    details: [
      'Gained a fundamental understanding of entrepreneurship in the Chinese market',
      'Conceived and developed an app idea to ensure the safety of food delivery drivers, as part of an interdisciplinary, international team',
    ],
  },
  {
    id: 'msc-industrial-engineering',
    date: '2026-10',
    end: 'present',
    title: 'M.Sc. Industrial Engineering',
    subtitle: 'Focus: Energy Technology · Friedrich-Alexander-Universität Erlangen-Nürnberg',
    category: 'university',
    details: [
      'Current coursework: Electrical Power Supply, Renewable Energies, Battery Storage Systems, Business Administration, Marketing, Microeconomics, Macroeconomics, Game Theory',
    ],
  },

  // ---- Startups and projects --------------------------------------
  {
    id: 'sportbuddy',
    date: '2020-02',
    end: '2023-05',
    title: 'SportBuddy',
    subtitle: 'Co-Founder & CMO · Marketing and Product Design',
    category: 'project',
    details: [
      'Built and managed the social media presence (Instagram, LinkedIn); drove user acquisition and community building',
      'Organized a university sports course to increase brand awareness',
    ],
    project: 'melt',
  },
  {
    id: 'zollhof',
    date: '2024-10',
    end: '2024-12',
    title: 'Zollhof Talent Programme',
    subtitle: 'Funeral insurance app',
    category: 'project',
    details: [
      'Solved real-world challenges posed by corporate partners',
      'Conducted 24 user interviews to understand the problem, followed by 6 further interviews to validate the solution',
      'Developed Figma prototypes incl. business plan, currently being implemented with the partner',
    ],
    project: 'zollhof',
  },
  {
    id: 'melt',
    date: '2025',
    end: 'present',
    title: 'Melt',
    subtitle: 'Dating app for sports enthusiasts and gym-goers · in progress',
    category: 'project',
    // Not on the CV: from my project notes
    details: ['Swipe in the app, then meet offline', 'Grew out of SportBuddy, which wasn\'t niche enough', 'Prototype built in Lovable'],
    project: 'melt',
  },
  {
    id: 'bachelor-thesis',
    date: '2026-06',
    title: "Bachelor's thesis",
    subtitle: 'Analysis and Implementation of the PowerFactory Import Function into the RTDS Real-Time Simulator',
    category: 'project',
    details: [
      'Evaluated a DGS-based conversion tool automating the transfer of power system models from DIgSILENT PowerFactory (RMS simulation) into RSCAD/RTDS (real-time EMT simulation), validated on IEEE 9-bus and 39-bus benchmark systems',
    ],
    project: 'thesis',
  },

  // ---- Hackathons (from the CV) -----------------------------------
  {
    id: 'hackbay-2023',
    date: '2023',
    title: 'HackBay 2023',
    subtitle: 'Finalist',
    category: 'hackathon',
    details: ['[PLACEHOLDER: what you built at HackBay 2023 — the CV lists only "HackBay 2023 (Finalist)"]'],
  },
  {
    id: 'hackbay-2024',
    date: '2024',
    title: 'HackBay 2024',
    subtitle: 'Hackathon',
    category: 'hackathon',
    details: ['[PLACEHOLDER: what you built at HackBay 2024 — the CV lists only the name]'],
  },
  {
    id: 'junction-helsinki-2024',
    date: '2024',
    title: 'Junction Helsinki 2024',
    subtitle: 'Hackathon',
    category: 'hackathon',
    details: ['[PLACEHOLDER: what you built at Junction Helsinki — the CV lists only the name]'],
  },
  {
    id: 'healthcare-hackathon-bayern',
    date: '2024',
    end: '2025',
    title: 'Healthcare Hackathon Bayern',
    subtitle: 'Product Development · Menopause App „MARIE“ · Challenge Bionorica',
    category: 'hackathon',
    details: [
      'Conducted user interviews and needs analysis; derived key features directly from user conversations',
      'Designed the UI/UX in Figma for a digital health app',
      'Delivered pitch presentations and continued development after the hackathon, incl. a follow-up conversation with the Bavarian Ministry of Health',
    ],
    project: 'marie',
  },
  {
    id: 'hackbay-2025',
    date: '2025',
    title: 'HackBay 2025',
    subtitle: 'Hackathon',
    category: 'hackathon',
    details: ['[PLACEHOLDER: what you built at HackBay 2025 — the CV lists only the name]'],
  },
  {
    id: 'hack-den-mittelstand',
    date: '2026-03',
    title: 'Hack den Mittelstand',
    subtitle: 'Munich',
    category: 'hackathon',
    details: [
      'Built an AI-agent recruiting tool for an Allianz subsidiary that screens CVs for fit and generates tailored interview questions; now being developed further in-house',
    ],
  },
  {
    id: 'robo-innovate-2026',
    date: '2026-10',
    title: 'robo.innovate',
    subtitle: 'Garmisch-Partenkirchen / Munich · In cooperation with TUM Geriatronics',
    category: 'hackathon',
    details: [
      'Programmed GARMI, a robot assisting in elderly care, to communicate better: added facial expressions and more emotional speech by integrating a LiveKit voice AI assistant',
    ],
    project: 'gaming-robot',
  },
];

export const getTimelineEntry = (id: string) => timeline.find((e) => e.id === id);
