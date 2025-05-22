import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, ImgHTMLAttributes } from "react";

export const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-10 h-10 rounded-full overflow-hidden bg-gray-200", className)}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("object-cover w-full h-full", className)}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = ({ children }: { children: string }) => (
  <div className="flex items-center justify-center w-full h-full text-sm text-gray-600">
    {children}
  </div>
);