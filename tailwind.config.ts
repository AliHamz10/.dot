import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--background-primary)",
        bgSecondary: "var(--background-secondary)",
        bgTertiary: "var(--background-tertiary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
        borderSubtle: "var(--border)",
        hoverState: "var(--hover-state)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
      },
      transitionTimingFunction: {
        general: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        hover: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        page: "cubic-bezier(0.6, 0.01, -0.05, 0.95)",
      },
    },
  },
  plugins: [],
};

export default config;
