import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 * Used by every component in this project instead of raw template strings.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
