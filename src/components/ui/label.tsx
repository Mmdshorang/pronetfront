// components/ui/label.tsx

import * as React from "react";
import { Label as LabelPrimitive } from "@radix-ui/react-label";
import { cn } from "@/lib/utils"; // اگر utility class داری برای ترکیب کلاس‌ها

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive>
>(({ className, ...props }, ref) => (
  <LabelPrimitive
    ref={ref}
    className={cn("text-sm font-medium text-gray-700", className)}
    {...props}
  />
));

Label.displayName = "Label";
