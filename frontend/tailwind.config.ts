import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: { max: "639px" },
        md: { max: "767px" },
        lg: { max: "1023px" },
        xl: { max: "1279px" },
        "2xl": { max: "1535px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
