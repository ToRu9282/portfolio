import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Panton", "Impact", "Arial Black", "sans-serif"],
        body: ["Evolve Sans", "Inter", "Arial", "sans-serif"],
        mono: ["Laqonic", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        white: "rgb(var(--theme-white) / <alpha-value>)",
        black: "rgb(var(--theme-black) / <alpha-value>)",
        void: "rgb(var(--theme-void) / <alpha-value>)",
        ink: "rgb(var(--theme-ink) / <alpha-value>)",
        line: "rgb(var(--theme-line) / <alpha-value>)",
        text: "rgb(var(--theme-text) / <alpha-value>)",
        muted: "rgb(var(--theme-muted) / <alpha-value>)",
        flame: "rgb(var(--theme-flame) / <alpha-value>)",
        ember: "rgb(var(--theme-ember) / <alpha-value>)"
      },
      boxShadow: {
        ember: "0 0 26px var(--shadow-ember)",
        panel: "0 28px 90px var(--shadow-panel)"
      }
    }
  },
  plugins: []
};

export default config;
