import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#070915",
        ink: "#0d1024",
        aurora: "#7c3aed",
        cyan: "#22d3ee",
        mint: "#34d399",
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.16)",
        violet: "0 0 60px rgba(124, 58, 237, 0.18)",
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
