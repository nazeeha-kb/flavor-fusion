import * as React from "react";
import { cn } from "@/lib/storage/utils.jsx";
import Link from "next/link";

const variantStyles = {
  primary:
    "bg-green-500 text-white shadow-sm shadow-green-500/20 hover:bg-green-600 active:bg-green-700",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50/50",
  ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
};

const sizeStyles = {
  default: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "default", href, ...props }, ref) => {
    return (
      <Link href={href ? href : "/"}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium",
          "transition-colors duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
