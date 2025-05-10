/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['"Merriweather"', "serif"],
        ebgaramond: ['"EB Garamond"', "serif"],
        cinzelDecorative: ['"Cinzel Decorative"', "serif"],
        cinzel: ['"Cinzel"', "serif"],
        lora: ['"Lora"', "serif"],
        nunitoSans: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
