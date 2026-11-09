/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06080D",
        panel: "#0E1522",
        panel2: "#121B2B",
        line: "#1E2A3D",
        cyan: { DEFAULT: "#22D3EE" },
        volt: "#F2662B",
        mint: "#34D399",
        amber: "#FBBF24",
        mute: "#8B98AB",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
