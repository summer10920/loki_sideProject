/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Noto Sans TC', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 