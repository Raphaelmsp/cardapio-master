/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg-fundo.jpg')"
      }
    },
  },
  plugins: [],
};
