import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hanalightgreen: 'var(--hanalightgreen)',
        hanagreen: 'var(--hanagreen)',
        hanadeepgreen: 'var(--hanadeepgreen)',
        hanalightpurple: 'var(--hanalightpurple)',
        hanapurple: 'var(--hanapurple)',
        hanagray: 'var(--hanagray)',
        hanadeepgray: 'var(--hanadeepgray)',
        red: 'var(--red)',
        background: 'var(--background)',
      },
      fontFamily: {
        Hana2bold: ['Hana2bold', 'sans-serif'],
        Hana2cm: ['Hana2cm', 'sans-serif'],
        Hana2heavy: ['Hana2heavy', 'sans-serif'],
        Hana2light: ['Hana2light', 'sans-serif'],
        Hana2medium: ['Hana2medium', 'sans-serif'],
        Hana2regular: ['Hana2regular', 'sans-serif'],
        SCDream1: ['SCDream1', 'sans-serif'],
        SCDream2: ['SCDream2', 'sans-serif'],
        SCDream3: ['SCDream3', 'sans-serif'],
        SCDream4: ['SCDream4', 'sans-serif'],
        SCDream5: ['SCDream5', 'sans-serif'],
        SCDream6: ['SCDream6', 'sans-serif'],
        SCDream7: ['SCDream7', 'sans-serif'],
        SCDream8: ['SCDream8', 'sans-serif'],
        SCDream9: ['SCDream9', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
