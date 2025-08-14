"use client";
import React, { useState, useEffect } from "react";
import NoRecipe from "@/components/NoRecipe";
import RecipeCard from "@/components/RecipeCard";
import Generating from "@/components/Generating";
import NoGenerated from "@/components/NoGenerated";
// toastify
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [noRecipe, setNoRecipe] = useState(true);
  const [genRecipes, setGenRecipes] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [localRecipesPresent, setlocalRecipesPresent] = useState(false);
  const [localRecipes, setlocalRecipes] = useState(null)
  // unliking recipe
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const storedRecipes =
      JSON.parse(localStorage.getItem("recipes")) ||
      "⛔ no recipes in localStorage";
    if (storedRecipes.length != 0) {
      setlocalRecipes(storedRecipes)
      setlocalRecipesPresent(true);
    }
  }, []);
  // Working: UseEffect fetches fav recipes Unliking the recipe
  const GenerateRecipe = async () => {
    const ingredientArray = ingredients.split(",").map((item) => item.trim());
    if (ingredientArray.length === 0) return; //returns the ingredients in an array form

    setLoading(true); //the loading component appears
    setNoRecipe(false);
    setRecipe(""); // clears previous recipes
    // Disabling the input
    setDisableInput(true)

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
      // Storing the generated recipes in localStorage
      if (data.recipe.length != 0) {
        // const flatRecipes = data.recipe.flat(); // ensure it's a flat array
        // const uniqueRecipes = Array.from(
        //   new Map(flatRecipes.map((r) => [r.id, r])).values()
        // ); // removes duplicates by id

        try {
          const Recipes = data.recipe;
          localStorage.removeItem("recipes");
          localStorage.setItem("recipes", JSON.stringify(Recipes));
          console.log("local storage recipes", Recipes);
        } catch (err) {
          console.log("couldnt save to locaal storage cause of", err);
        }
      } else {
        console.log("didn't store in localstorage");
      }
      // };
    } catch (error) {
      console.log(`error generating recipe ${error}`);
    } finally {
      setLoading(false);
      setGenRecipes(true);
      setDisableInput(false)
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          GenerateRecipe();
          console.log("generating recipe");
        }
      }}
    >
      <div className="bg-gray-50 w-full pb-6 min-h-[83vh]">
        <div className=" flex flex-col justify-center items-center mx-auto max-w-screen-xl px-6 ">
          <section>
            <div className="text-center flex flex-col md:gap-6 gap-10 mt-14">
              <h1 className="font-semibold text-4xl">Find Delicious Recipes</h1>
              <p className="text-[18px] text-gray-600">
                Enter the ingredients you have on hand, and I&apos;ll generate
                the perfect recipe for you.
              </p>
              <div className={`generator border-1 border-gray-500 rounded-xl p-3  ${disableInput?`bg-gray-100 text-gray-500`:`bg-white`}`}>
                <div className="input-area flex justify-between">
                  <input
                    type="text"
                    disabled={disableInput}
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
                    disabled={disableInput}
                    className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center  transition ${disableInput?`bg-gray-400  hover:bg-none`:`bg-green-300  hover:bg-green-500`}`}
                  >
                    <img src="/arrow-up.svg" alt="" className="w-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            {loading && <Generating />}
            {/* When no recipes are generate show this: */}
            {noRecipe && !localRecipesPresent && <NoRecipe />}
            {/* When recipes no recipes are generated AND there's recipes in localstorage show this: */}
            {noRecipe && localRecipesPresent && (
              <div className="md:mt-10 mt-14 w-full-xl">
                <h3 className="font-semibold text-2xl">Generated Recipes</h3>
                <div className="gen-recipes flex xl:gap-6 md:gap-4 gap-2 md:pt-5 pt-7 justify-between h-full w-full flex-wrap">
                  {localRecipes.map((recipes) => (
                    <div
                      key={recipes.id}
                      id={recipes.id}
                      className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
                    >
                      <RecipeCard
                        recipe={recipes}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {genRecipes && recipe.length != 0 && (
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
                      <RecipeCard
                        recipe={recipes}
                        //  onUnlike={handleUnlike}
                      />
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
