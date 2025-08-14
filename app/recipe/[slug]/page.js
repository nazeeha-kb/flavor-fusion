"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import slugify from "slugify";
import SkeletonRecipePage from "@/components/SkeletonRecipePage";

const RecipePage = () => {
  const router = useRouter();
  const { slug } = useParams(); // dynamic part of the URL
  const [recipe, setRecipe] = useState(null);
  const [noRecipe, setNoRecipe] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      // If i don't do "JSON.parse - the recipe returns as a string"
      try {
        const storedRecipes =
          JSON.parse(localStorage.getItem("recipes")) ||
          "⛔ no recipes in localStorage";
        const recipe = storedRecipes.find((recipe) => recipe.title);
        const recipeTitle = recipe.title;
        const recipeSlug = slugify(recipeTitle, { lower: true });
        // setLocalRecipes(storedRecipes);
        const res = await fetch(`/api/recipe/${slug}`);
        if (!res.ok) {
          setNoRecipe(true);
          console.log("the slug is", slug);
          console.log("response is", res);
          console.log("Recipe not found");
        }
        const data = await res.json();
        if (data != "not found") {
          setRecipe(data);
          console.log("recipe is set to", data);
        } else {
          const foundRecipe = storedRecipes.find(
            (recipe) => recipeSlug === slug
          );
          setRecipe(foundRecipe);
          console.log("the recipe is:", foundRecipe);
        }
        console.log("the slug is", slug);
        console.log("🍚 the recipe you're viewing is:", data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, [slug]);

  // useEffect(() => {
  //   console.log("the local recipes are", localRecipes);
  // }, [localRecipes]);

  const handleClose = () => {
    router.back(); //this will take user back to the previous page in history stack
  };

  // loading
  if (recipe == [] || !recipe) {
    return (
      <div>
        <SkeletonRecipePage />
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 w-full min-h-[83vh] flex flex-col justify-center">
      <div className="recipe-page md:mx-auto mx-8 max-w-4xl bg-green-50 border-gray-400 border rounded-2xl p-8 shadow-lg relative my-10">
        <div className="flex justify-between  px-2 mt-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {recipe.title}
          </h1>
          <div
            className="bg-red-200 rounded-full w-8 p-1 flex justify-center items-center cursor-pointer group hover:bg-red-400 absolute top-6 right-6"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined group-hover:text-red-800 text-red-600">
              close
            </span>
          </div>
        </div>
        <div className="info">
          <div className="time flex items-center gap-2 text-gray-700 mt-4 px-2">
            <span className="material-symbols-outlined">schedule</span>
            <span>{recipe.expectedTime}</span>
          </div>
        </div>
        <div className="main-info flex flex-col pt-8 pb-2 mb-4 gap-8 lg:mx-16 sm:mx-8 mx-4 text-gray-700">
          <div className="ingredients  text-[18px]">
            <h2 className="text-2xl font-semibold pb-4 text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc marker:text-green-700 pl-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="instructions  text-[18px]">
            <h2 className="text-2xl font-semibold pb-4 text-gray-800">
              Instructions
            </h2>
            <ul className="list-decimal marker:text-green-700 pl-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
