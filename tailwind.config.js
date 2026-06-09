/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nyan: {
          green: "#46ff7a",
          lime: "#b7ff31",
          gold: "#ffd166",
          black: "#050706",
          ink: "#0b1110",
          steel: "#aab7b0",
        },
      },
      boxShadow: {
        neon: "0 0 24px rgba(70, 255, 122, 0.36), 0 0 70px rgba(70, 255, 122, 0.16)",
        gold: "0 0 22px rgba(255, 209, 102, 0.28)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(70,255,122,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(70,255,122,0.11) 1px, transparent 1px)",
        scan:
          "linear-gradient(180deg, transparent, rgba(70,255,122,0.08), transparent)",
      },
      fontFamily: {
        display: ["Arial Black", "Impact", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
