/** @type {import('tailwindcss').Config} */
const shadcnPath = "../../packages/shadcn_lib/src/**/*.{html,js,tsx}";
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", shadcnPath],
  theme: {
    extend: {
      backgroundImage: {
        dark: "url('/public/images/DarkBackground.png')",
        light: "url('/public/images/LightBackground.png')",
      },
    },
  },
  presets: [
    //其他组件的预设
    require("@zhixin/shadcn_lib/tailwind.config.js"),
  ],
};
