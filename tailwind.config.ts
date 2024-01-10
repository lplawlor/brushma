/**
 * Custom TailwindCSS config, including custom gradient functions and a color theme.
 */
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial-from-tl": "radial-gradient(at 0% 0%, var(--tw-gradient-stops))",
        "gradient-radial-from-bl": "radial-gradient(at 0% 100%, var(--tw-gradient-stops))",
        "gradient-radial-from-tr": "radial-gradient(at 100% 0%, var(--tw-gradient-stops))",
        "gradient-radial-from-br": "radial-gradient(at 100% 100%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // Override the 'primary' color of NextUI to use colors from Tailwind's reds
            primary: {
              DEFAULT: "#F87171",
              foreground: "#FFFFFF",
            },
            focus: "#FCA5A5",
          },
        },
      },
    }),
  ],
}

export default config;
