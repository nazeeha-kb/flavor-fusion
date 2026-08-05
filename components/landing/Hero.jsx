import { Sparkles, ArrowRight, Clock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/link-button";
import { IngredientChip } from "@/components/IngredientChip";
import { Badge } from "@/components/ui/badge";

const orbitingIngredients = [
  { label: "Chicken", emoji: "🍗", className: "left-[2%] top-[8%]" },
  { label: "Rice", emoji: "🍚", className: "right-[0%] top-[20%]" },
  { label: "Tomatoes", emoji: "🍅", className: "left-[0%] top-[58%]" },
  { label: "Garlic", emoji: "🧄", className: "right-[4%] bottom-[10%]" },
  { label: "Basil", emoji: "🌿", className: "left-[20%] bottom-[0%]" },
];

/**
 * Signature visual: ingredient chips orbit a single AI-generated recipe
 * card, connected by faint dashed paths — a literal picture of "loose
 * ingredients become one recipe," rather than a generic stack of cards.
 */
function IngredientConstellation() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[460px]">
      {/* connective paths, decorative only */}
      <svg
        className="absolute inset-0 h-full w-full text-green-200"
        viewBox="0 0 400 460"
        fill="none"
        aria-hidden
      >
        <path d="M60 60 L200 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M340 100 L200 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M40 280 L200 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M360 360 L200 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M140 440 L200 230" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
      </svg>

      {orbitingIngredients.map((item) => (
        <IngredientChip
          key={item.label}
          label={item.label}
          emoji={item.emoji}
          className={`absolute ${item.className}`}
        />
      ))}

      {/* center: the resulting recipe card */}
      <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-900/10">
        <div className="flex items-center justify-between">
          <Badge tone="green">
            <Sparkles className="h-3 w-3" />
            AI-generated
          </Badge>
          <ChefHat className="h-4 w-4 text-gray-300" />
        </div>
        <p className="mt-3 text-sm font-semibold text-gray-900">
          One-Pan Garlic Tomato Chicken
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          25 min · Easy
        </div>
      </div>

      {/* ambient sparkles */}
      <Sparkles className="absolute right-2 top-2 h-5 w-5 text-green-300" aria-hidden />
      <Sparkles className="absolute bottom-4 left-2 h-4 w-4 text-green-200" aria-hidden />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Turn Your Ingredients Into Delicious Recipes
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-600">
            Tell Flavor Fusion what&apos;s in your kitchen and get personalized,
            AI-generated recipes in seconds — no more staring at the fridge
            wondering what to cook.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/signin" size="lg">
              Generate Recipe
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary">
              Explore Features
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <span>No sign-up required to try</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>Ready in under 30 seconds</span>
          </div>
        </div>

        <IngredientConstellation />
      </div>
    </section>
  );
}
