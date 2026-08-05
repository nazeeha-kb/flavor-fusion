import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { RecipePreview } from "@/components/landing/RecipePreview";
import { WhyFlavorFusion } from "@/components/landing/WhyFlavorFusion";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SiteFooter } from "@/components/landing/SiteFooter";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="features">
        <Features />
      </div>
      {/* <div id="recipes">
        <RecipePreview />
      </div> */}
      <WhyFlavorFusion />
      <FinalCTA />
      {/* <SiteFooter /> */}
    </main>
  );
}
