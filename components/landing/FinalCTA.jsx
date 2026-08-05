import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/link-button";

export function FinalCTA() {
  return (
    <section id="final-cta" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
          <Sparkles className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Ready to create your next meal?
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Enter what's in your kitchen and let Flavor Fusion do the rest.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg">Start Generating</Button>
        </div>
      </div>
    </section>
  );
}
