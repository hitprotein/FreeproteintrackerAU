import type { Config } from "tailwindcss";

// Palette fixed by the brand: charcoal, ivory, eucalyptus, sand, forest.
// "euc"/"sand" are the on-dark tints; "*-deep" are the on-light versions (for contrast).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111817",
        ivory: "#F7F5EF",
        euc: "#6FB08F",
        "euc-deep": "#2F6F5E",
        sand: "#D8C8A8",
        "sand-deep": "#7E6F4E",
        forest: "#173D34",
        line: "#E4E0D6",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
