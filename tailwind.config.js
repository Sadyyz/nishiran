/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2ECDE",
        paperDark: "#E7DFC9",
        ink: "#221D17",
        hanko: "#A3352A",
        navy: "#28324A",
        gold: "#9C7A34",
      },
      fontFamily: {
        display: ["'Shippori Mincho'", "serif"],
        body: ["'Zen Kaku Gothic New'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
