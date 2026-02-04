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
        cream: "var(--cream)",
        nude: "var(--nude)",
        beige: "var(--beige)",
        "rose-dust": "var(--rose-dust)",
        "rose-gold": "var(--rose-gold)",
        charcoal: "var(--charcoal)",
        "warm-gray": "var(--warm-gray)",
        "gold-accent": "var(--gold-accent)",
      },
      fontFamily: {
        heading: ["Didot", "serif"],
        body: ["Inter", "Century Gothic", "sans-serif"],
      },
      boxShadow: {
        'premium-sm': '0 2px 8px rgba(0,0,0,0.04)',
        'premium-md': '0 4px 16px rgba(0,0,0,0.06)',
        'premium-lg': '0 8px 24px rgba(0,0,0,0.08)',
        'premium-xl': '0 12px 32px rgba(0,0,0,0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};
