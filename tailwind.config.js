/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#f9f9fb",
        ink: "#1a1c1d",
        "ink-soft": "#46464a",
        "paper": "#ffffff",
        "paper-soft": "#f3f3f5",
        "paper-mid": "#e8e8ea",
        "line": "#c7c6ca",
        "blue": "#146ef1",
        "blue-deep": "#0056c5",
      },
      fontFamily: {
        display: ["Geist", "Arial", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        frame: "1440px",
      },
      boxShadow: {
        ambient: "0 24px 80px -40px rgba(26, 28, 29, 0.28)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "20%": { transform: "translate3d(12px, -8px, 0) rotate(1deg)" },
          "40%": { transform: "translate3d(-6px, -16px, 0) rotate(-0.5deg)" },
          "60%": { transform: "translate3d(20px, -6px, 0) rotate(1.8deg)" },
          "80%": { transform: "translate3d(-4px, 2px, 0) rotate(-0.8deg)" },
          "100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        },
      },
      animation: {
        rise: "rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 18s cubic-bezier(0.45, 0.05, 0.25, 1) infinite",
      },
    },
  },
  plugins: [],
};
