import { ChefHat } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
            <ChefHat className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Flavor Fusion</span>
        </a>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Flavor Fusion. Cook with what you have.
        </p>
      </div>
    </footer>
  );
}
