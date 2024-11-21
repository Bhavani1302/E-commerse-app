/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Scan these files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          500: '#67b7d1',  // Custom light blue color
        },
      },
    },
  },
  plugins: [],
}
