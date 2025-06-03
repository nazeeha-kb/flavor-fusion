import React from "react";
import RecipeCards from "@/components/RecipeCard";

const recipes = () => {
  return (
    <div className="bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 py-8">
          Your Favorite Recipes
        </h1>
        <div className="wrapper  flex xl:gap-6 md:gap-4 gap-2 justify-between h-full w-full flex-wrap">
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
          <div className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4">
            <RecipeCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default recipes;
