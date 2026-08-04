import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/link-button";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Recipes", href: "#recipes" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <ChefHat className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-gray-900">Flavor Fusion</span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button path="signin" size="default">Generate Recipe</Button>
      </div>
    </header>
  );
}
