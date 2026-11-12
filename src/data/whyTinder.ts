import { HeartHandshake, Heart, Lightbulb, MessageCircleHeart, Sparkles, GraduationCap, type LucideIcon } from 'lucide-react';
import { MeltIcon } from '../components/icons/MeltIcon';

/* ------------------------------------------------------------------
   The "Why Tinder" app: a swipe deck where each card is one reason
   you want the internship. Visitors swipe (or tap ✕ / ♥) through the
   cards in this order, then land on the "match" card at the end.

   Edit, add, remove or reorder cards freely. Each card needs a unique
   `id`. `bullets` and `tags` are optional.
   Anything marked [PLACEHOLDER] still needs your words.
   ------------------------------------------------------------------ */

export interface WhyCard {
  id: string;
  /** Small label above the title */
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  tags?: string[];
  icon: LucideIcon;
  /** true = not shown on the site (handy for a card you are still writing) */
  hidden?: boolean;
}

export const whyTinder = {
  /** Deep link: #/why-tinder */
  id: 'why-tinder',
  /** Name under the home screen icon and in the app bar */
  appName: 'Why Tinder',
  /** Home screen icon: one solid tile color, white glyph */
  icon: HeartHandshake,
  iconColors: { bg: '#ff7a59', fg: '#ffffff' },
  /** Filter pills that show this app (it always shows under ALL) */
  subtitle: 'Why I want to intern at Tinder',
  /** Line above the deck */
  intro: 'Swipe through why I want to intern at Tinder.',

  cards: [
    {
      id: 'why-tinder',
      eyebrow: 'Why Tinder',
      title: 'I use it myself',
      body: 'Tinder is a product I use myself, and I love working on problems in products I use.',
      tags: ['User first', 'Dating'],
      icon: Heart,
    },
    {
      id: 'why-product',
      eyebrow: 'Why product management',
      title: 'I go looking for the real problem',
      body: "I love talking to customers and finding their pain points, working out what the actual issue is, even when they aren't sure themselves.",
      tags: ['Discovery', 'User interviews'],
      icon: MessageCircleHeart,
    },
    {
      id: 'what-i-bring',
      eyebrow: 'What I bring',
      title: 'Interviews, prototypes, shipping fast',
      body: 'I have taken ideas from first conversation to tested prototype, in incubators, hackathons and my own projects.',
      bullets: [
        '45 user interviews: 30 for Zollhof, about 15 for MARIE',
        'Prototypes in Figma and Lovable',
        '7 hackathons, including a HackBay finalist',
        'Working student roles at Siemens Healthineers and HOREICH',
      ],
      icon: Sparkles,
    },
    {
      id: 'melt',
      eyebrow: 'Already thinking about dating',
      title: "I'm building a dating app",
      body: 'With Melt I am exploring dating for active people: swipe in the app, then meet offline. My next step is talking to 5–10 active people to test the idea before building further.',
      tags: ['Melt', 'Side project'],
      icon: MeltIcon,
    },
    {
      id: 'learn',
      eyebrow: 'What I want to learn',
      title: 'Taking an idea all the way',
      body: 'I want to learn how to find the problem users really have, ask the right questions to get to the bottom of it, build a solution, and create a roadmap for how best to implement it. Basically a longer hackathon: with the time to fully develop an idea.',
      bullets: [
        'Find the real user problem',
        'Ask the right questions to get to the bottom of it',
        'Build a solution',
        'Plan the roadmap to implement it',
      ],
      icon: GraduationCap,
    },
    {
      id: 'idea',
      eyebrow: 'One idea for Tinder',
      title: '[PLACEHOLDER: your idea in a few words]',
      body: '[PLACEHOLDER: One problem you noticed as a user and how you would explore it. Keep it to 2–3 sentences.]',
      icon: Lightbulb,
      // Hidden until written: set to false (or delete this line) to show the card.
      hidden: true,
    },
  ] satisfies WhyCard[],

  /** The last card, after all swipes */
  match: {
    title: "It's a match?",
    body: "If you've made it this far, let's talk. I'd love to bring this to the Tinder product team as an intern.",
    emailSubject: 'Hi Anastasija, about the Tinder internship',
  },
};
