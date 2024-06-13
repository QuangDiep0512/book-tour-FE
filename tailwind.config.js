/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "003C71": "#003C71",
        grey: "#EEEEEE",
        lightYellow: "#FFC709",
        orange: "#F97316",
      },
      boxShadow: {
        custom: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;",
      },
      backgroundImage: {
        bgLogin: "url('./imgs/bgLogin-beach.jpeg')",
      },
    },
  },
  plugins: [],
};
