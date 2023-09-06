/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
