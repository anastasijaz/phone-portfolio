import { HOREICH_URL } from '../config/links';
import { HMonogramIcon } from '../components/icons/HMonogramIcon';

/* ------------------------------------------------------------------
   The Horeich.de redesign project page (#/horeich).
   Anything marked [PLACEHOLDER] still needs your words.

   Screenshots: put them in public/assets/horeich/ as before.png and
   after.png. Until then the page shows a placeholder in each slot.
   ------------------------------------------------------------------ */

export const horeich = {
  /** Route: #/horeich */
  id: 'horeich',
  /** Label under the home screen icon */
  iconLabel: 'Horeich.de',
  icon: HMonogramIcon,
  /** Solid circle in the palette's coral, white "H" */
  iconColors: { bg: '#ff6a5c', fg: '#ffffff' },

  title: 'Horeich.de (redesign)',
  line: 'Redesigned the horeich.de website.',
  /** One short line on what the site is, e.g. who it is for */
  about: '[PLACEHOLDER: one line on what horeich.de is]',

  screenshots: {
    before: { src: '/assets/horeich/before.png', alt: 'horeich.de before the redesign' },
    after: { src: '/assets/horeich/after.png', alt: 'horeich.de after the redesign' },
  },

  /** "What I improved". Replace with your own points; no invented numbers. */
  improvements: ['[PLACEHOLDER: improvement 1]', '[PLACEHOLDER: improvement 2]', '[PLACEHOLDER: improvement 3]'],

  liveUrl: HOREICH_URL,
};
