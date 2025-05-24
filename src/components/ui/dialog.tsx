import { ReactNode, useState } from "react";

// Container اصلی
type DialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const Dialog = ({ children, open, onClose }: DialogProps) => {
  if (!open) return null; // اگر open برابر false باشد، هیچ چیزی نمایش داده نمی‌شود.

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} // کلیک روی بک‌گراند برای بستن دیالوگ
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن دیالوگ وقتی بر روی خود دیالوگ کلیک می‌شود.
      >
        {children}
      </div>
    </div>
  );
};

// تریگر برای باز کردن دیالوگ (اختیاری – در اینجا ساده‌سازی شده)
export const DialogTrigger = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
  return (
    <button
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
};

// محتوای اصلی دیالوگ
export const DialogContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">{children}</div>
    </div>
  );
};

// هدر دیالوگ
export const DialogHeader = ({ children }: { children: ReactNode }) => {
  return <div className="mb-4 border-b pb-2">{children}</div>;
};

// عنوان دیالوگ
export const DialogTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

// فوتر دیالوگ (دکمه‌ها معمولاً اینجا قرار می‌گیرند)
export const DialogFooter = ({ children }: { children: ReactNode }) => {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
};
