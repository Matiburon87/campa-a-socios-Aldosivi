/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0a2e17',
          900: '#0f3f22',
          800: '#14532d',
          700: '#166534',
          600: '#15803d',
          500: '#22c55e',
          100: '#dcfce7',
          50: '#f0fdf4',
        },
        gold: {
          500: '#eab308',
          400: '#facc15',
          300: '#fde047',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,63,34,0.04), 0 8px 24px -8px rgba(15,63,34,0.10)',
      },
    },
  },
  plugins: [],
};
