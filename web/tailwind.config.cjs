/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        background: '#09090A',
        blue: {
          500: '#81D8F7',
        },
        orange: {
          500: '#FBA94C',
        },
        red: {
          500: '#F75A68',
        },
        primary: {
          500: '#4C1D95',
          400: '#5B21B6',
          300: '#6D28D9',
          200: '#7C3AED',
          100: '#8B5CF6',
        },
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
