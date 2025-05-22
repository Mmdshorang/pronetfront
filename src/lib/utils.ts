// src/lib/utils.ts

import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * ترکیب کلاس‌های CSS به‌صورت ایمن
 * استفاده از clsx و tailwind-merge برای جلوگیری از کلاس‌های متضاد
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


