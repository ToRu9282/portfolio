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
        void: "#060606",
        ink: "#0C0C0C",
        line: "rgba(255,255,255,0.14)",
        text: "#F2F2F2",
        muted: "#9A9A9A",
        flame: "#FF3D12",
        ember: "#BE2F10"
      },
      boxShadow: {
        ember: "0 0 26px rgba(255, 61, 18, 0.35)",
        panel: "0 28px 90px rgba(0,0,0,0.52)"
      }
    }
  },
  plugins: []
};

export default config;
