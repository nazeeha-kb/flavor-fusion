import { Sparkles, Heart, Compass, Refrigerator } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-generated recipes",
    description:
      "Every recipe is generated for your exact ingredient list, not pulled from a generic database.",
  },
  {
    icon: Heart,
    title: "Save favorite recipes",
    description:
      "Keep the ones you love in one place, so a good result is never a one-time thing.",
  },
  {
    icon: Compass,
    title: "Discover new meal ideas",
    description:
      "Break out of the same five dinners with combinations you wouldn't have thought to try.",
  },
  {
    icon: Refrigerator,
    title: "Works with what you have",
    description:
      "No special ingredients or extra shopping trips — Flavor Fusion works with what's already in your kitchen.",
  },
];

export function Features() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to cook smarter
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Built around one idea: the best recipe is the one you can actually make right now.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex items-start gap-4 p-6 transition-colors duration-200 hover:border-green-200"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
                <feature.icon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
