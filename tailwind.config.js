/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        orange: 'var(--orange)',
        'header-gray': '#E5E7EB',
        gray: {
          light: 'var(--gray-light)',
          dark: 'var(--gray-dark)',
        },
      },
      fontFamily: {
        logo: "'Baloo Tammudu 2', cursive",
      },
      height: {
        noneHeader: 'calc(100vh - 5.5rem)',
      },
      boxShadow: {
        'sign-up': '2px 2px 10px 1px rgba(0, 0, 0, 0.15), -2px -2px 10px 0px rgba(0, 0, 0, 0.15)',
        'sign-up-info': '-2px 2px 8px 0px rgba(0, 0, 0, 0.15), 2px 2px 8px 1px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
