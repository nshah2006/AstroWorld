/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#23313e",
        teal: "#86cdc3",
        lavender: "#bb90e3",
        blue: "#52a5dc",
        text: "#ecf3f2",
        muted: "#bac7d2",
        primary: "#ecf3f2",
        "accent-teal": "#86cdc3",
        "accent-lavender": "#bb90e3",
        border: "#bac7d2",
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-11": "44px",
        "space-12": "48px",
      },
      borderRadius: {
        "radius-sm": "8px",
        "radius-md": "12px",
        "radius-lg": "16px",
        "radius-pill": "999px",
      },
      fontSize: {
        "type-xs": ["12px", { lineHeight: "16px" }],
        "type-sm": ["14px", { lineHeight: "20px" }],
        "type-base": ["16px", { lineHeight: "24px" }],
        "type-lg": ["20px", { lineHeight: "28px" }],
        "type-xl": ["24px", { lineHeight: "32px" }],
      },
    },
  },
  plugins: [],
};
