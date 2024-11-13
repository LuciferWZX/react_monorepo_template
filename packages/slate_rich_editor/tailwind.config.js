/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--slate-border))",
        muted: {
          DEFAULT: "hsl(var(--slate-muted))",
          foreground: "hsl(var(---slate-muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--slate-primary))",
          // foreground: "hsl(var(---slate-foreground))",
        },
        danger: {
          DEFAULT: "hsl(var(--slate-danger))",
          // foreground: "hsl(var(---slate-foreground))",
        },
      },
    },
  },
  plugins: [],
};
