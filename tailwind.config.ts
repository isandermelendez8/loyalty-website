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
        luxury: {
          black: "#0a0a0a",
          dark: "#111111",
          card: "#1a1a1a",
          border: "#2a2a2a",
          gold: "#c9a962",
          "gold-light": "#e8d5a3",
          "gold-dark": "#a68b4b",
          champagne: "#f7e7ce",
          cream: "#faf6f0",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(26,26,26,0.7) 50%, rgba(10,10,10,0.9) 100%)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
