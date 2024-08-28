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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
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
