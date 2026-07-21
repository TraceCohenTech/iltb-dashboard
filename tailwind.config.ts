import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial data-terminal — warm paper, deep ink, ILTB teal + amber, cinematic dark bands
        paper: "#F6F2E9",   // page background (warm, crisp)
        surface: "#FFFFFF", // cards
        cream: "#EFEADE", // alt band
        ink: {
          950: "#0B0E11",   // darkest — dark bands / hero
          900: "#14171C",   // headings
          800: "#1E232A",   // raised dark card
          700: "#33383F",   // body text (darker, crisper)
          500: "#4E535A",   // muted — now ~6:1 on paper (was 4.3:1)
          300: "#6A7078",   // faint but still readable (~4.3:1)
        },
        line: "#E2DCCC",    // borders / hairlines (light)
        darkline: "#242A31", // borders on dark
        teal: {
          50: "#E2F4F5",
          100: "#BEE9EC",
          300: "#3FC7D4",   // bright glow (dark bg)
          400: "#12A6B4",   // brand primary
          500: "#0E8F9C",
          600: "#0B7580",   // deep
          700: "#0A5D66",
        },
        amber: {
          100: "#FBE7BC",
          300: "#FFCE4D",   // bright (dark bg)
          400: "#F0A81E",   // secondary accent
          500: "#CE8E00",
        },
        // chart categoricals — validated (dataviz six-checks)
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
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "SF Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,14,17,0.04), 0 10px 30px rgba(11,14,17,0.07)",
        lift: "0 4px 8px rgba(11,14,17,0.06), 0 24px 60px rgba(11,14,17,0.14)",
        glow: "0 0 0 1px rgba(18,166,180,0.25), 0 8px 40px rgba(18,166,180,0.20)",
      },
      keyframes: {
        "draw-line": { from: { strokeDashoffset: "1" }, to: { strokeDashoffset: "0" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
      },
    },
  },
  plugins: [],
};
export default config;
