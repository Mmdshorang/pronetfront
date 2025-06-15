import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // پیشنهاد: برای مدیریت بهتر حالت تیره، این گزینه را اضافه کنید
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'],
      },
      // تعریف فریم‌های کلیدی برای انیمیشن‌ها
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      // اتصال نام انیمیشن به فریم‌های کلیدی تعریف شده
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-in-down': 'fade-in-down 0.2s ease-out', // انیمیشن جدید اضافه شد
      },
    },
  },
  plugins: [],
} satisfies Config;