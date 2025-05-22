import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
        className
      )}
    >
      {children}
    </span>
  );
};
