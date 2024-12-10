/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customPink:'rgb(240, 222, 222)',
        customLightBlue:'#282854',
        customBlue:'rgb(14, 15, 45)',
        customDarkBlue:'rgb(13, 14, 33)',
        customSkyBlue: 'rgb(101, 217, 255)'
      }
    },
  },
  plugins: [],
}

