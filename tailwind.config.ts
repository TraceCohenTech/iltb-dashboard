import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bright podcast / Colossus-inspired — warm paper, ink, ILTB teal + amber
        paper: "#FBFAF7",   // page background
        surface: "#FFFFFF", // cards
        cream: "#F4F1E9",   // alternating section band
        ink: {
          900: "#16181D",   // headings
          700: "#3A3F47",   // body text
          500: "#6A7078",   // muted (AA on paper)
          300: "#9AA0A6",   // faint
        },
        line: "#E7E2D6",    // borders / hairlines
        teal: {
          50: "#E4F5F6",
          100: "#C3EAEC",
          400: "#12A6B4",   // brand primary
          500: "#0E8F9C",
          600: "#0B7580",   // deep
        },
        amber: {
          100: "#FBEBC4",
          400: "#E9A100",   // secondary accent (cover-art yellow)
          500: "#CE8E00",
        },
        // chart categoricals — validated (dataviz six-checks) on white surface
        chart: {
          blue: "#2A78D6",
          teal: "#0E9AA7",
          amber: "#E08A00",
          green: "#1F9D55",
          red: "#E0403E",
          orange: "#E86A1C",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "sans-serif"],
        mono: ["SF Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,24,29,0.04), 0 8px 24px rgba(20,24,29,0.06)",
        lift: "0 2px 4px rgba(20,24,29,0.06), 0 16px 40px rgba(20,24,29,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
