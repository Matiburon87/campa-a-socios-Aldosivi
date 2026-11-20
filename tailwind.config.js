import colors from 'tailwindcss/colors';

/** Color backed by a CSS variable holding "R G B", so it switches with the theme and keeps alpha support. */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const scale = (prefix, steps) => Object.fromEntries(steps.map((s) => [s, v(`${prefix}-${s}`)]));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral scale is inverted (green-tinted) in dark mode — see index.css.
        slate: scale('slate', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        // Semantic surfaces & brand text that adapt to the theme.
        canvas: v('canvas'),
        surface: v('surface'),
        ink: { DEFAULT: v('ink'), 2: v('ink-2'), 3: v('ink-3') },
        brand: {
          950: '#0a2e17',
          900: '#0f3f22',
          800: v('brand-800'),
          700: v('brand-700'),
          600: '#15803d',
          500: '#22c55e',
          100: v('brand-100'),
          50: v('brand-50'),
        },
        gold: {
          500: '#eab308',
          400: '#facc15',
          300: '#fde047',
        },
        red: { ...colors.red, ...scale('red', [50, 100, 200, 700, 800, 950]) },
        amber: { ...colors.amber, ...scale('amber', [50, 100, 200, 700, 800]) },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow) / 0.04), 0 8px 24px -8px rgb(var(--shadow) / 0.10)',
      },
    },
  },
  plugins: [],
};
