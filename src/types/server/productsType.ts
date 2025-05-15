export interface Variant {
  name: string;
  values: string;
}

export interface ProductDto {
  id: number;                         // شناسه محصول
  title: string;                      // عنوان محصول
  description: string;               // توضیحات محصول
  price: number;                     // قیمت اصلی (قبل از تخفیف)
  discountPrice: number;            // قیمت با تخفیف
  discountPercent: number;          // درصد تخفیف
  image: Uint8Array;                // تصویر اصلی محصول (byte[] در C# معادل Uint8Array در TS)
  
  quantity?: number;                // تعداد انتخاب‌شده توسط کاربر (اختیاری)
  stock: number;                    // موجودی در انبار
  unit: string;                     // واحد اندازه‌گیری
  category: string;                 // دسته‌بندی اصلی
  subCategory: string;              // زیر دسته‌بندی
  tags: string[];                   // برچسب‌ها

  rating?: number;                  // میانگین امتیاز کاربران
  reviewsCount?: number;           // تعداد نظرات کاربران
  isAvailable: boolean;            // وضعیت فعال بودن محصول
  brand: string;                   // برند یا سازنده محصول
  createdAt?: string;              // تاریخ ایجاد محصول (ISO string)
  updatedAt?: string;              // تاریخ بروزرسانی محصول (ISO string)

  variants: Variant[];             // ویژگی‌های انتخابی محصول
  isInCart?: boolean;              // آیا در سبد خرید است؟
  cartItemId?: string;             // شناسه آیتم در سبد خرید
}

export type ProductTag = "MostSale" | "NewGood" | "Amazing";
