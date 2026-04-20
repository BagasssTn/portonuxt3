export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily:{
        yatra: ['Yatra One', 'cursive']
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          },
        },

        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },

      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        scroll: 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [],
}