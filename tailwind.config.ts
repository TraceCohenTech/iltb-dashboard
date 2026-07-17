import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Midnight library — deep navy ink, warm ivory, brass
        ink: {
          950: "#0A1220", // page background
          900: "#0E1830", // card background
          800: "#16233F", // raised card / hover
          700: "#22334F", // borders, dividers
        },
        ivory: {
          50: "#FAF6EC", // primary text
          200: "#E8E0CC", // secondary text
          400: "#C9BFA4", // muted text (still AA on ink-950)
        },
        brass: {
          300: "#E8C878", // bright accent / highlights
          400: "#D9B45C", // primary accent
          500: "#C39F3F", // deep accent
        },
        // chart categoricals — validated (dataviz six-checks) on ink-900 surface
        chart: {
          blue: "#3987E5",
          aqua: "#199E70",
          yellow: "#C98500",
          green: "#008300",
          red: "#E66767",
          orange: "#D95926",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["SF Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
