import {elementColors} from "./src/styles/element-theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...elementColors
    },
    extend: {},
  },
  plugins: [],
}

