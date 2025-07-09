"use client";
import React, { useState } from "react";
import NoRecipe from "@/components/NoRecipe";
import RecipeCard from "@/components/RecipeCard";
import Generating from "@/components/Generating";
import NoGenerated from "@/components/NoGenerated";

const Home = () => {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [noRecipe, setNoRecipe] = useState(true);
  const [genRecipes, setGenRecipes] = useState(false);

  const GenerateRecipe = async () => {
    const ingredientArray = ingredients.split(",").map((item) => item.trim());
    if (ingredientArray.length === 0) return; //returns the ingredients in an array form

    setLoading(true); //the loading component appears
    setNoRecipe(false);
    setRecipe(""); // clears previous recipes

    // Now we'll fetch the API and generate the recipe:

    try {
      const res = await fetch("/api/generate-recipe", {
        // fetching details
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // passing the ingredientArray as ingredients to route.js
          ingredients: ingredientArray,
        }),
      });

      // the response (ai generated recipe) we're getting as data here
      const data = await res.json();

      // const parsedRecipe = parseRecipe(data.recipe);
      // setParsedRecipe(parsedRecipe);
      console.log("generated recipe:", data.recipe);
      // updating "recipe" to include the generated recipe
      setRecipe(data.recipe);
      // if (
      //   !parsedRecipe.title ||
      //   !Array.isArray(parsedRecipe.ingredients) ||
      //   !Array.isArray(parsedRecipe.instructions)
      // ) {
      //   console.error("AI returned incomplete recipe.");
      //   return; // skip it or show error
      // }
    } catch (error) {
      console.log(`error generating recipe ${error}`);
    } finally {
      setLoading(false);
      setGenRecipes(true);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 w-full pb-6 min-h-[83vh]">
        <div className=" flex flex-col justify-center items-center mx-auto max-w-screen-xl px-6 ">
          <section>
            <div className="text-center flex flex-col md:gap-6 gap-10 mt-14">
              <h1 className="font-semibold text-4xl">Find Delicious Recipes</h1>
              <p className="text-[18px] text-gray-600">
                Enter the ingredients you have on hand, and I&apos;ll generate
                the perfect recipe for you.
              </p>
              <div className="generator border-1 border-gray-500 rounded-xl p-3 bg-white">
                <div className="input-area flex justify-between">
                  <input
                    type="text"
                    className="grow outline-none mr-4"
                    name=""
                    id=""
                    value={ingredients}
                    onChange={(e) => {
                      setIngredients(e.target.value);
                    }}
                    placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
                  />
                  <button
                    onClick={GenerateRecipe}
                    className="cursor-pointer bg-green-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-500 transition"
                  >
                    <img src="/arrow-up.svg" alt="" className="w-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            {loading && <Generating />}
            {noRecipe && <NoRecipe />}
            {(genRecipes && recipe.length != 0) && (
              <div className="md:mt-10 mt-14 w-full-xl">
                <h3 className="font-semibold text-2xl">Generated Recipes</h3>
                <div className="gen-recipes flex xl:gap-6 md:gap-4 gap-2 md:pt-5 pt-7 justify-between h-full w-full flex-wrap">
                  {recipe.map((recipes) => (
                    <div
                      // I was using recipe.id which was causing the error now fixed.
                      key={recipes.id}
                      id={recipes.id}
                      className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
                    >
                      <RecipeCard recipe={recipes} isFavorite={false} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* If no recipe is generated then show the noGen component - but while the other conditions (&&) are met too */}
            {recipe.length === 0 && !noRecipe && !loading && <NoGenerated />}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
