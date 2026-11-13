import { Bot, HeartPulse, Microchip, ShieldCheck } from 'lucide-react';
import { MeltIcon } from '../components/icons/MeltIcon';
import { HMonogramIcon } from '../components/icons/HMonogramIcon';
import type { Project } from './types';
import {
  HOREICH_FIGMA_URL,
  HOREICH_SOFTWARE_URL,
  HOREICH_URL,
  MARIE_FIGMA_URL,
  MELT_URL,
  ZOLLHOF_FIGMA_URL,
} from '../config/links';

/* ------------------------------------------------------------------
   All project pages. Order here = order of the icons on the Projects
   page (home screen page 3). Each page shows: title, status line,
   one-line summary, the sections in order, media, then the buttons.
   Anything marked [PLACEHOLDER] still needs your content.
   ------------------------------------------------------------------ */

/** [PLACEHOLDER] ZOLLHOF client. Replace with the company name if you may name it. */
export const CLIENT_NAME = 'a German funeral insurance company';

export const projects: Project[] = [
  {
    id: 'melt',
    name: 'Melt',
    iconLabel: 'Melt',
    icon: MeltIcon,
    iconColors: { bg: '#ff4d6d', fg: '#ffffff' },
    status: 'On hold',
    summary: 'A dating app that uses shared physical activities as the way from the app to real life.',
    sections: [
      {
        title: 'Problem',
        body: 'Dating apps stopped working for many people. Younger users who grew up on them, and came out of COVID, never fully learned to date offline. Melt uses the app for the first contact, then gives an easy way to meet in person through activities such as run clubs.',
      },
      {
        title: 'Origin',
        body: 'A personal project I have worked on, on and off, since 2025. It was inspired by SportBuddy, which wasn’t niche enough, and by informal conversations with friends. Melt is an early concept based on those informal conversations, not on formal user research.',
      },
      {
        title: 'What I built',
        body: 'A Lovable prototype with profile pages and swiping.',
        bullets: [
          'Profiles use sport-specific prompts, for example “how to approach me at the gym” or “my latest PR”.',
          'An activities feature matches people with a shared interest and lets them organise a session in chat.',
        ],
      },
      {
        title: 'Business idea',
        body: 'Sports venues and clubs pay to be listed as date options, and can host singles events.',
      },
      {
        title: 'Users',
        body: 'None formally tested yet.',
      },
      {
        title: 'What I’d improve',
        body: 'The “It’s a match” animation. I’d redesign it to make that moment more engaging.',
      },
      {
        title: 'Next',
        body: 'Move off Lovable into a proper build and plan the marketing. Melt is on hold for now.',
      },
    ],
    buttons: [{ label: 'Open web app', href: MELT_URL }],
  },
  {
    id: 'zollhof',
    name: 'ZOLLHOF',
    iconLabel: 'ZOLLHOF',
    icon: ShieldCheck,
    iconColors: { bg: '#2e8b6e', fg: '#ffffff' },
    status: 'Ended. The insurer is building the product in-house.',
    summary: 'A digital checklist and secure vault for funeral wishes, developed as a challenge for a funeral insurance company.',
    sections: [
      {
        title: 'Client',
        body: `${CLIENT_NAME.charAt(0).toUpperCase()}${CLIENT_NAME.slice(1)}, through the ZOLLHOF tech incubator.`,
      },
      {
        title: 'Brief',
        body: 'The insurer sold funeral insurance and wanted to add a digital product feature to attract younger buyers. They asked the team to find out why people don’t buy funeral insurance and what would change that.',
      },
      {
        title: 'My role',
        body: 'I was team lead of a two-person team. I helped design the interview questions, split the interviews roughly 50/50 with my teammate, and built the first Figma mock-up.',
      },
      {
        title: 'Research',
        body: 'About 20 interviews with people aged roughly 20 to 60, recruited through friends and family. The insurer did not help recruit. Then 6 validation interviews testing the prototype.',
      },
      {
        title: 'Key findings',
        bullets: [
          'People don’t want to be a burden on their families.',
          'They want a simple, minimalist and low-cost funeral.',
          'Some choose cremation for cost reasons.',
          'Most people have assets, such as stocks, bonds or real estate, that would cover funeral costs.',
        ],
      },
      {
        title: 'Prototype',
        body: 'A digital checklist with questions on burial or cremation, casket, music, clothing, and where documents and passwords are kept. The vault stores these wishes.',
      },
      {
        title: 'Testing feedback',
        body: 'The 6 testers liked the clean, neutral, non-gamified design, because the topic is sensitive. The corporate partner loved the final presentation.',
      },
      {
        title: 'Reflection',
        body: 'If I did it again, I’d build a voice AI conversation as the vault, instead of a clickable checklist.',
      },
      {
        title: 'What I learned',
        body: 'My first project as team lead. I learned to mentor rather than direct, to ask questions that get a team aligned, and to stay committed to users on a topic I wasn’t passionate about.',
      },
    ],
    media: [
      { type: 'video', src: '/assets/zollhof/checklist.mp4', caption: 'Checklist [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/checklist-2.mp4', caption: 'Checklist, part 2 [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/file-upload.mp4', caption: 'File upload [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/digital-estate.mp4', caption: 'Digital estate [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/digital-estate-2.mp4', caption: 'Digital estate, part 2 [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/shared-with.mp4', caption: 'Shared with [PLACEHOLDER: confirm caption]' },
      { type: 'video', src: '/assets/zollhof/repatriation-abroad.mp4', caption: 'Repatriation from abroad [PLACEHOLDER: confirm caption]' },
    ],
    buttons: [{ label: 'Figma', href: ZOLLHOF_FIGMA_URL }],
  },
  {
    id: 'marie',
    name: 'MARIE',
    iconLabel: 'MARIE',
    icon: HeartPulse,
    iconColors: { bg: '#8e5bb5', fg: '#ffffff' },
    status: 'On hold',
    summary: 'A voice AI companion for women in menopause that tracks symptoms through conversation, without manual logging.',
    sections: [
      {
        title: 'Origin',
        body: 'A hackathon challenge from a pharma company selling a homeopathic menopause medication. Women had to take it daily for 2–3 months before seeing benefits, so many stopped. The team built a voice AI that tracks symptoms through conversation and shows daily progress reports. After the hackathon, the team continued with features such as a fitness plan against osteoporosis, and held talks with the Bavarian Ministry of Health.',
      },
      {
        title: 'My role',
        body: 'I designed the UI/UX and the Figma prototype, and ran the interviews with women, as the team was mostly men.',
      },
      {
        title: 'Research',
        body: 'About 15 women aged 35–50, across perimenopause, menopause and postmenopause.',
      },
      {
        title: 'Findings',
        bullets: [
          'Many women don’t know they’re entering menopause, and there’s little awareness.',
          'Many felt their symptoms weren’t taken seriously by gynaecologists, and were pushed towards aggressive hormone treatment they didn’t want.',
          'There’s a lack of emotional support.',
          'Hot flashes disrupt work.',
          'Some women were pushed into early menopause by breast cancer treatment.',
          'Women want tracking that happens passively, not manual logging.',
        ],
      },
      {
        title: 'Ministry of Health',
        body: 'The Ministry liked the idea, but its budget for that year went to other health topics, so the project had no funding.',
      },
      {
        title: 'Status',
        body: 'On hold, for two reasons: no funding, and the team wasn’t well placed to market a women’s health product.',
      },
      {
        title: 'Next steps',
        body: 'Add emotional voice features with LiveKit, and possibly approach German startups working on this topic.',
      },
      {
        title: 'What I learned',
        body: 'Interviewing people about difficult subjects. The more emotional the topic, the more human the product has to feel.',
      },
    ],
    buttons: [{ label: 'Figma', href: MARIE_FIGMA_URL }],
  },
  {
    id: 'garmi',
    name: 'GARMI',
    iconLabel: 'GARMI',
    icon: Bot,
    iconColors: { bg: '#4a72c9', fg: '#ffffff' },
    status: 'Hackathon project · robo.innovate 2026',
    summary: 'A companion robot for elderly care, developed with TUM’s Department of Geriatronics. I built the robot’s face and eyes.',
    sections: [
      {
        title: 'Problem',
        body: 'GARMI needed to communicate better with elderly people who have hearing or vision loss. Issues we saw:',
        bullets: [
          'Interrupting or talking over people',
          'Showing no emotion',
          'Not noticing when several people speak',
          'Not understanding dialects',
          'Not handling long pauses',
        ],
      },
      {
        title: 'Caritas course',
        body: 'A crash course on elderly care, including a suit that simulates limited mobility and senses. Takeaways:',
        bullets: [
          'Speak slowly',
          'Keep the mouth visible for lip reading',
          'Use facial expressions',
          'Avoid a monotone voice',
          'Give social cues through the screens',
        ],
      },
      {
        title: 'My role',
        body: 'Front-end. I designed the eyes and face expressions, and mapped them to the emotions the LiveKit voice agent detects. I added a listening state (the eyes turn to the side, with an attentive tilt) and a thinking state (the eyes look to the upper left), so people can tell what GARMI is doing when it’s quiet.',
      },
      {
        title: 'Not built',
        body: 'The chest-screen aura.',
      },
      {
        title: 'Results',
        body: 'A demo video of about 2 minutes. No jury feedback and no placement.',
      },
      {
        title: 'What I learned',
        body: 'How important human-centred design is for emotional topics and for users who aren’t used to technology.',
      },
    ],
    media: [{ type: 'video', src: '/assets/garmi/demo.mp4', caption: 'GARMI demo' }],
  },
  {
    id: 'horeich',
    name: 'Horeich.de (redesign)',
    iconLabel: 'Horeich.de',
    icon: HMonogramIcon,
    iconColors: { bg: '#ffae94', fg: '#5c4a44' },
    status: 'Live · HOREICH GmbH, working student',
    summary: 'Redesigned the website of HOREICH GmbH, an Erlangen company that makes sensors for infrastructure and environment monitoring.',
    sections: [
      {
        title: 'My role',
        body: 'Product management working student. My first task was the website redesign. I also worked on the go-to-market strategy for the company’s radon sensor.',
      },
      {
        title: 'Users',
        body: 'Customers who find the products through Google search, and engineers who implement the sensors. The site had to be a company landing page and also a data-sheet hub.',
      },
      {
        title: 'The old site',
        body: 'Built quickly by the two founders. Cluttered and unstructured, with key information missing and filler content that added nothing. A dark grey, matte design. No before screenshots are available.',
      },
      {
        title: 'New structure',
        bullets: [
          'A landing page',
          'Separate sections for environmental and infrastructure sensors',
          'A software page with demo videos',
          'A template for each sensor: features at the top, technical data (size, connection, how data is sent), a price list and contact',
        ],
      },
      {
        title: 'Constraints',
        body: 'Built in WordPress, so the theme limited the layout. The founders didn’t want custom hard-coding, so some formatting drifts from the design. The live site has been rearranged since handover and isn’t as clean as my version.',
      },
      {
        title: 'Results',
        body: 'No measured metrics. The founders report positive feedback from customers and engineers.',
      },
      {
        title: 'Proudest part',
        body: 'The software page with short demo videos.',
      },
    ],
    media: [
      {
        type: 'image',
        src: '/assets/horeich/after.png',
        alt: 'horeich.de after the redesign',
        caption: 'After the redesign. [PLACEHOLDER: Anastasija will upload the screenshots.]',
      },
    ],
    buttons: [
      { label: 'Live site', href: HOREICH_URL },
      { label: 'Software page', href: HOREICH_SOFTWARE_URL },
      { label: 'Concept Figma', href: HOREICH_FIGMA_URL },
    ],
  },
  {
    // Not on the Projects page; still opens at #/thesis
    id: 'thesis',
    name: "Bachelor's thesis",
    iconLabel: 'Thesis',
    icon: Microchip,
    iconColors: { bg: '#7058b8', fg: '#ffffff' },
    onHomeScreen: false,
    status: 'B.Sc. Electrical Engineering · FAU Erlangen-Nürnberg · 2026',
    summary: 'When does automatic conversion of power-grid models from RMS to EMT simulation work, and when does it fail?',
    sections: [
      {
        title: 'Thesis',
        body: '“Analysis and Implementation of the PowerFactory Import Function into the RTDS Real-Time Simulator”. I evaluated a DGS-based conversion tool that moves power system models from DIgSILENT PowerFactory (RMS simulation) into RSCAD/RTDS (real-time EMT simulation).',
      },
      {
        title: 'Problem',
        body: 'Converting power-grid models by hand from one simulation world to the other is slow and error-prone, and the result is hard to reproduce or verify. An automatic converter promises to fix that, but only if you know when you can trust it.',
      },
      {
        title: 'Evaluation setup',
        body: 'I ran the converted models on the IEEE 9-bus and 39-bus benchmark systems and compared them with the originals on four quantities:',
        bullets: ['Bus voltages', 'Generator active power', 'Generator reactive power', 'Rotor speed'],
      },
      {
        title: 'Results',
        body: '[PLACEHOLDER: How closely the results matched for the 9-bus and the 39-bus system, and at what system size the conversion starts to fail.]',
      },
    ],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

/** Projects with an icon on the Projects page, in order */
export const homeScreenProjects = projects.filter((p) => p.onHomeScreen !== false);
