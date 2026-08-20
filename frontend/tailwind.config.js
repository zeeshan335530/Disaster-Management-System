/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderMove: {
          '0%': { clipPath: 'inset(0 100% 100% 0)' },
          '25%': { clipPath: 'inset(0 0 100% 0)' },
          '50%': { clipPath: 'inset(0 0 0 0)' },
          '75%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 100% 100% 0)' },
        },
      },
      
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
