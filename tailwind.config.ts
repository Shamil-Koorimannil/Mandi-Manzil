import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FCCB1C",
          "yellow-hover": "#E5B612",
          "yellow-light": "#FDDA4F",
          "yellow-muted": "rgba(252, 203, 28, 0.10)",
          charcoal: "#333233",
          "charcoal-dark": "#141314",
          "charcoal-surface": "#1B1A1B",
          "charcoal-card": "#242324",
          "charcoal-elevated": "#2D2C2D",
          "charcoal-border": "rgba(255, 255, 255, 0.08)",
          "charcoal-border-strong": "rgba(255, 255, 255, 0.14)",
          white: "#FFFFFF",
          black: "#000000",
          muted: "#9E9C9E",
          subtle: "#D4D2D4",
        },
      },
      fontFamily: {
        philosopher: ["var(--font-philosopher)", "Philosopher", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.14em",
        editorial: "0.2em",
      },
      maxWidth: {
        site: "1360px",
        reading: "760px",
        editorial: "1120px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
