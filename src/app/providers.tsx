'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';


// اینجا ما نوع ThemeProviderProps را با نوعی که children را دارد ترکیب می‌کنیم
export function ThemeProvider({ children, ...props }: ThemeProviderProps& { children: React.ReactNode }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}