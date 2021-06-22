const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/index.html', '.src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.trueGray,
      spotify: {
        light: '#1ed760',
        DEFAULT: '#1DB954',
        dark: '#3b9e66',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
