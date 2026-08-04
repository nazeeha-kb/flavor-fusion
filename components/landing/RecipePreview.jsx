import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/link-button";
import { ArrowRight } from "lucide-react";

const sampleRecipes = [
  {
    name: "One-Pan Garlic Tomato Chicken",
    description: "Juicy chicken thighs simmered with tomatoes and garlic in a single skillet.",
    ingredients: ["Chicken", "Tomatoes", "Garlic", "Onion", "Olive oil"],
    time: "25 min",
    difficulty: "Easy",
    emoji: "🍗",
  },
  {
    name: "Chicken & Tomato Rice Bowl",
    description: "A weeknight rice bowl built around what's already in your fridge.",
    ingredients: ["Rice", "Chicken", "Tomatoes", "Soy sauce"],
    time: "30 min",
    difficulty: "Easy",
    emoji: "🍚",
  },
  {
    name: "Slow-Roasted Tomato & Herb Chicken",
    description: "A low-effort roast that rewards patience with deep, savory flavor.",
    ingredients: ["Chicken", "Tomatoes", "Basil", "Garlic", "Butter", "Lemon"],
    time: "55 min",
    difficulty: "Medium",
    emoji: "🌿",
  },
];

export function RecipePreview() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              From "chicken, rice, tomatoes" to this
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              A real example of what three ordinary ingredients can become.
            </p>
          </div>
          <Button variant="ghost" className="shrink-0">
            See all recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleRecipes.map((recipe) => (
            <RecipeCard key={recipe.name} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}
