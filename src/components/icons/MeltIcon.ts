import { createLucideIcon } from 'lucide-react';

/**
 * Melt's own app glyph: a melting heart (heart outline with two drips).
 * Built with lucide's icon factory so it takes the same props as every other icon.
 */
export const MeltIcon = createLucideIcon('Melt', [
  [
    'path',
    {
      d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
      key: 'heart',
    },
  ],
  ['path', { d: 'M8 17v2.5', key: 'drip-left' }],
  ['path', { d: 'M15.5 17.5v4', key: 'drip-right' }],
]);
