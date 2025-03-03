/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#704214", // Rich Mocha Brown (Warm & Sophisticated)
        accent: "#D4AF37", // Royal Gold (Prestige & Elegance)
        background: "#F8F5F2", // Soft Ivory (Luxury & Serenity)
        textPrimary: "#2E1A47", // Deep Plum (Regal & Timeless)
        textSecondary: "#8B5E3B", // Muted Copper (Warm & Premium)
        highlight: "#A67B5B", // Champagne Bronze (Subtle Glow & Refinement)
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill,minmax(200px,1fr))",
      },
    },
  },
  plugins: [],
};
