import { ReactNode } from "react";
import clsx from "clsx"; // استفاده از clsx برای ترکیب کلاس‌ها (اختیاری اما پیشنهادی)

// Dialog اصلی
type DialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

export const Dialog = ({ children, open, onClose, className }: DialogProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-white w-full max-w-lg rounded-xl shadow-lg p-6",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// دکمه تریگر
export const DialogTrigger = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

// محتوای جداگانه (اگر استفاده شود)
export const DialogContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      className={clsx("bg-white w-full max-w-lg rounded-xl shadow-lg p-6", className)}
    >
      {children}
    </div>
  </div>
);

// Header
export const DialogHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("mb-4 border-b pb-2", className)}>{children}</div>
);

// Title
export const DialogTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2 className={clsx("text-lg font-bold", className)}>{children}</h2>
);

// Footer
export const DialogFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("mt-6 flex justify-end gap-2", className)}>{children}</div>
);
