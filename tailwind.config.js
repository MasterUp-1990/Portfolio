/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F0F4F8",
        ink: "#0B1524",
        panel: "#FFFFFF",
        panel2: "#E6EDF5",
        line: "#CDD7E3",
        cyan: { DEFAULT: "#0891B2" },
        volt: "#E4570E",
        mint: "#0D9F6E",
        amber: "#D97706",
        mute: "#5B6B7C",
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
