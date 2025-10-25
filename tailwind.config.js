/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        pine: {
          DEFAULT: "var(--color-pine)",
          light: "var(--color-pine-light)",
          dark: "var(--color-pine-dark)",
        },
        lila: {
          DEFAULT: "var(--color-lila)",
          light: "var(--color-lila-light)",
          dark: "var(--color-lila-dark)",
        },
        beige: "var(--color-beige)",
        gris: "var(--color-gris)",
      },
      fontFamily: {
        heading: ["Didot", "serif"],
        body: ["Century Gothic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
