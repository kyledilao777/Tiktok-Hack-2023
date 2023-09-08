/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'md': '390px', //sm
        'lg': '393px', 
      },
      colors: {
        bgred: "#EE1D52",
        bgblue: "#69C9D0",
        bgblack: "#010101",
      },
    },
    fontFamily: {
      calibri: ["Calibri"],
      regencie: ["Regencie"],
      lato: ["Lato"],
    },
  },
  plugins: [],
};
