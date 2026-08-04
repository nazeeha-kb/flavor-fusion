"use client";
import React, { useState, useEffect } from "react";
import NoRecipe from "@/components/NoRecipe";
import RecipeCard from "@/components/RecipeCard";
import NoGenerated from "@/components/NoGenerated";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useGuestSession } from "@/components/guestSessionContext";

const Home = () => {
  const arr = [1, 2, 3];
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [noRecipe, setNoRecipe] = useState(true);
  const [genRecipes, setGenRecipes] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(null);
  const { isGuest } = useGuestSession();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();

        // If you returned lastGeneratedAt directly
        setLastGenerated(new Date(data.lastGeneratedAt));
        console.log("previous date", data.lastGeneratedAt)
        console.log("last generated set to", new Date())
      } else {
        console.log("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const storeInLocalStorage = (key, item) => {
    // clear previous recipes
    localStorage.removeItem(key);
    // Store the recipe
    localStorage.setItem(key, item);
    console.log(item, "stored in LS")
  }


  const GenerateRecipe = async () => {

    const ingredientArray = ingredients.split(",").map((item) => item.trim());
    if (ingredientArray.length === 0) return; //stop function if no ingredients.

    setLoading(true); //skeleton loader if generating
    setNoRecipe(false);
    setRecipe(""); // clears previous recipes
    setDisableInput(true); // Disabling the input field


    // fetch the API and generate the recipe:
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

      // store the response (ai generated recipe) in data
      const data = await res.json();

      // console.log("generated recipe:", data.recipe);

      // update "recipe" to include the generated recipe
      setRecipe(data.recipe);
      storeInLocalStorage("recipes", JSON.stringify(data.recipe))

    } catch (error) {
      console.log(`error generating recipe ${error}`);

    } finally {
      setLoading(false);
      setGenRecipes(true);
      setDisableInput(false);
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
              <div
                className={`generator border-1 border-gray-500 rounded-xl p-3  ${disableInput ? `bg-gray-100 text-gray-500` : `bg-white`
                  }`}
              >
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
                    className={` rounded-full w-8 h-8 flex items-center justify-center  transition ${disableInput
                      ? `bg-gray-400  hover:bg-none`
                      : `bg-green-300  hover:bg-green-500 cursor-pointer`
                      }`}
                  >
                    <img src="/arrow-up.svg" alt="" className="w-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            {loading && (
              <div className="md:mt-8 mt-14 w-full-xl">
                <h3 className="font-semibold text-2xl">Generated Recipes</h3>
                <div className="gen-recipes flex xl:gap-6 md:gap-4 gap-2 md:pt-5 pt-7 justify-between h-full w-full flex-wrap">
                  {arr.map((i) => (
                    <div
                      key={i}
                      className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
                    >
                      <SkeletonLoader />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* When no recipes are generate show this: */}
            {noRecipe && <NoRecipe />}
            {genRecipes && recipe.length != 0 && (
              <div className="md:mt-8 mt-14 w-full-xl">
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
