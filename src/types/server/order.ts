export type Order = {
    id: string;                          // شناسه سفارش
    userId: string;                      // شناسه کاربر
    items: OrderItem[];                  // لیست اقلام سفارش
    totalPrice: number;                  // مجموع قیمت نهایی
    status: OrderStatus;                // وضعیت سفارش (در انتظار، ارسال شده، لغو شده و ...)
    paymentStatus: PaymentStatus;       // وضعیت پرداخت
    createdAt: string;                   // تاریخ ایجاد
    updatedAt?: string;                 // تاریخ بروزرسانی
    address: Address;                   // آدرس تحویل
    note?: string;                      // توضیحات اضافی کاربر
    shippingMethod?: string;            // روش ارسال (مثلاً پست، تیپاکس)
  };

  export type OrderItem = {
    productId: string;                  // شناسه محصول
    title: string;                      // عنوان محصول
    image: string;                      // تصویر محصول
    unitPrice: number;                  // قیمت واحد در لحظه سفارش
    quantity: number;                   // تعداد خریداری شده
    variant?: string;                   // ویژگی انتخابی (مثلاً رنگ، سایز)
  };
  
  export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';
  export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  export type Address = {
    fullName: string;                   // نام و نام خانوادگی گیرنده
    phone: string;                      // شماره تماس
    province: string;                   // استان
    city: string;                       // شهر
    postalCode: string;                 // کد پستی
    addressLine: string;                // آدرس کامل
  };
  