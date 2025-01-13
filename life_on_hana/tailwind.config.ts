import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hanalightgreen: "var(--hanalightgreen)",
        hanagreen: "var(--hanagreen)",
        hanadeepgreen: "var(--hanadeepgreen)",
        hanalightpurple: "var(--hanalightpurple)",
        hanapurple: "var(--hanapurple)",
        hanagray: "var(--hanagray)",
        hanadeepgray: "var(--hanadeepgray)",
        red: "var(--red)",
        background: "var(--background)",
      },
    },
  },
  plugins: [],
} satisfies Config;
