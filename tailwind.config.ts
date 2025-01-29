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
        sm: '640px',
        lg: '1024px',
      },
      width: {
        'small': '6rem',  // 24 * 0.25rem
        'medium': '9rem', // 36 * 0.25rem
        'large': '12rem', // 48 * 0.25rem
      },
      height: {
        'small': '6rem',  // 24 * 0.25rem
        'medium': '9rem', // 36 * 0.25rem
        'large': '12rem', // 48 * 0.25rem
      },
    },
  },
  plugins: [],
} satisfies Config;
