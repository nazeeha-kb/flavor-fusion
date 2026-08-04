import { ListPlus, Sparkles, CookingPot } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: ListPlus,
    title: "Add your ingredients",
    description:
      "List what's already in your fridge or pantry — even just three or four items is enough to start.",
  },
  {
    icon: Sparkles,
    title: "AI creates personalized recipes",
    description:
      "Flavor Fusion matches your ingredients against thousands of flavor combinations to build recipes that make sense together.",
  },
  {
    icon: CookingPot,
    title: "Cook and enjoy",
    description:
      "Follow clear, step-by-step instructions and turn what you had on hand into a meal worth making again.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Three steps between an empty search and a finished plate.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50">
                  <step.icon className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
