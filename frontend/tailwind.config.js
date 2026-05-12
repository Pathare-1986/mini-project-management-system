/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          500: '#14b8a6',
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
