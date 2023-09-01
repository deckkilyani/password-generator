/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        ripple:{
          'to ':{ 
            transform: 'scale(4)',
            opacity: 0

          }
        }
      }
    },
  },
  plugins: [],
}