/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        win: {
          silver: '#c0c0c0',
          darkSilver: '#808080',
          blue: '#000080',
          lightBlue: '#1084d0',
          cyan: '#008080',
          darkGrey: '#404040',
          borderLight: '#dfdfdf',
          borderDark: '#000000',
        }
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
        display: ['Handjet', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'win-out': 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        'win-in': 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff',
        'win-window': '2px 2px 0px rgba(0, 0, 0, 0.4), inset 1px 1px 0px #dfdfdf',
      }
    },
  },
  plugins: [],
}
