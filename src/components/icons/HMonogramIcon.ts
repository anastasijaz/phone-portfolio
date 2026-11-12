import { createLucideIcon } from 'lucide-react';

/** Simple "H" monogram for the Horeich.de app (no third-party logo). */
export const HMonogramIcon = createLucideIcon('HMonogram', [
  ['path', { d: 'M7 5v14', key: 'left' }],
  ['path', { d: 'M17 5v14', key: 'right' }],
  ['path', { d: 'M7 12h10', key: 'bar' }],
]);
