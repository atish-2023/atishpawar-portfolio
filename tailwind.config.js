/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./public/**/*.{html,js}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#38BDF8', // cyan
        secondary: '#6366F1', // indigo
        neutral: '#0F172A', // dark base
        'text-primary': '#F8FAFC', // primary white
        'text-secondary': '#94A3B8', // secondary text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}