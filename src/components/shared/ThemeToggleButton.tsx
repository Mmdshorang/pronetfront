'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  // از هوک useTheme برای دسترسی به تم فعلی و تابع تغییر آن استفاده می‌کنیم
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // این useEffect کمک می‌کند تا دکمه فقط بعد از اینکه صفحه در کلاینت load شد نمایش داده شود
  // و از خطاهای hydration جلوگیری می‌کند.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // تا قبل از mount شدن، یک placeholder نمایش می‌دهیم تا جای دکمه خالی نماند
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      className="p-2 rounded-full transition-colors duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {/* بر اساس تم فعلی، آیکون خورشید یا ماه را نمایش می‌دهیم */}
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
}
