/** @type {import('tailwindcss').Config} */
const roles = [
  'primary', 'on-primary', 'primary-container', 'on-primary-container',
  'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
  'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
  'error', 'on-error', 'error-container', 'on-error-container',
  'success', 'on-success', 'success-container', 'on-success-container',
  'surface', 'on-surface', 'surface-variant', 'on-surface-variant',
  'surface-container-lowest', 'surface-container-low', 'surface-container',
  'surface-container-high', 'surface-container-highest',
  'inverse-surface', 'inverse-on-surface', 'outline', 'outline-variant', 'scrim',
];

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Every Material 3 color role is a CSS variable defined in src/index.css
      colors: Object.fromEntries(roles.map((r) => [r, `var(--md-${r})`])),
      borderRadius: {
        'shape-xs': 'var(--md-shape-xs)',
        'shape-s': 'var(--md-shape-s)',
        'shape-m': 'var(--md-shape-m)',
        'shape-l': 'var(--md-shape-l)',
        'shape-xl': 'var(--md-shape-xl)',
      },
      boxShadow: {
        'elev-1': 'var(--md-elevation-1)',
        'elev-2': 'var(--md-elevation-2)',
        'elev-3': 'var(--md-elevation-3)',
        'elev-4': 'var(--md-elevation-4)',
        'elev-5': 'var(--md-elevation-5)',
      },
      fontFamily: {
        brand: 'var(--md-font-brand)',
        plain: 'var(--md-font-plain)',
      },
    },
  },
  plugins: [],
};
