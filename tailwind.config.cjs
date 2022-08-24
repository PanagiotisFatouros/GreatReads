/** @type {import('tailwindcss').Config} */



module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          "1": `rgb(238, 238, 238)`,
          "2": `rgb(255, 149, 83)`,
          "3": `rgb(66, 76, 85)`,
        },
        secondary: `rgb(21, 176, 151)`,
        accent: `rgb(255, 102, 99)`,
      },
      fontFamily: {
        logo: ['Crete Round', 'serif'],
        heading: ['Quicksand', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}