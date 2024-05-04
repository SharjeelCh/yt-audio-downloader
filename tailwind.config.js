/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        espn: ['Oswald', 'sans-serif'], // Use Oswald or your chosen font
      },
    },
  },
  plugins: [],
}

