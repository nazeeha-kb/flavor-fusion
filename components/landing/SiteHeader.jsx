import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/link-button";
import Logo from "../app/Logo";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Generate", href: "#final-cta" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo href={"/"} />

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
        <Button href="signin" size="default">Generate Recipe</Button>
      </div>
    </header>
  );
}
