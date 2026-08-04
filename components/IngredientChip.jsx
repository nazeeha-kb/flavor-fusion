import { cn } from "@/lib/storage/utils.jsx";

/**
 * A single floating ingredient chip. Positioned absolutely by parent
 * (see Hero's IngredientConstellation) to orbit around the recipe card.
 */
export function IngredientChip({ label, emoji, className, style }) {
  return (
    <div
      style={style}
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-gray-100 bg-white",
        "px-3.5 py-2 text-sm font-medium text-gray-700 shadow-md shadow-gray-900/[0.06]",
        "transition-transform duration-300 ease-out hover:-translate-y-0.5",
        className
      )}
    >
      <span aria-hidden className="text-base leading-none">
        {emoji}
      </span>
      {label}
    </div>
  );
}
