import * as React from "react";
import { cn } from "@/lib/storage/utils.jsx";

export function Badge({ className, tone = "gray", ...props }) {
  const toneStyles = {
    green: "bg-green-50 text-green-700",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
