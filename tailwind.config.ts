import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-accent": "#1A1A1A"
      }
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"])
      addVariant("hacus", ["&:hover", "&:focus", "&.active"])
    })
  ],
  daisyui: {
    themes: [
      {
        default: {
          "primary": "#FFFBF6",
          "accent": "#EB4646"
        }
      }
    ]
  }
};
export default config;
