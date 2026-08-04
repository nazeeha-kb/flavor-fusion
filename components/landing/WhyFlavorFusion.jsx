import { X, Check } from "lucide-react";

const problems = [
  "Staring into the fridge with no idea what goes together",
  "Recipe sites that assume you already have ten specialty ingredients",
  "The same three meals on repeat because they're the only ones you trust",
];

const solutions = [
  "Recipes built from exactly what you already have",
  "No shopping list required to get started",
  "New combinations generated every time, so dinner doesn't get old",
];

export function WhyFlavorFusion() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Don&apos;t know what to cook with what you have?
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            That's the exact problem Flavor Fusion was built to solve.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Without Flavor Fusion
            </h3>
            <ul className="mt-5 space-y-4">
              {problems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green-600">
              With Flavor Fusion
            </h3>
            <ul className="mt-5 space-y-4">
              {solutions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
