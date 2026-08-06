"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import { saveRecipe, deleteRecipe } from "@/lib/storage/recipeRepository";
import { useGuestSession } from "@/components/guestSessionContext";

const RecipeCard = ({ recipe, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageUrl, setImageUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const { isGuest } = useGuestSession();
  const maxToshow = 3;
  const showIngredients = recipe.ingredients.slice(0, maxToshow);
  const remainingCount = recipe.ingredients.length - maxToshow;
  const recipeSlug = slugify(recipe.title ?? "", { lower: true });
  useEffect(() => {
    async function loadImage() {
      try {
        const res = await fetch(`/api/pexels?query=${encodeURIComponent(recipe.title)}`);
        const data = await res.json();
        setImageUrl(data.url);
      } catch (err) {
        console.error("Fetch image failed", err);
        setImageUrl("/utensils-canva.png");
      }
    }
    loadImage();
  }, [recipe.title]);

  const handleLike = async () => {
    const favoriteRecipe = {
      id: recipe.id,
      title: recipe.title,
      expectedTime: recipe.expectedTime,
      classification: recipe.classification,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      slug: recipeSlug,
    };

    try {
      await saveRecipe(favoriteRecipe, { isGuest });
      setFavorite(true);
      setFeedback(isGuest ? "Saved to your guest recipes." : "Saved to favorites.");
    } catch (error) {
      setFeedback(error.message || "We couldn't save this recipe right now.");
    }
  };

  const handleUnlike = async (recipeId) => {
    try {
      await deleteRecipe(recipeId, { isGuest });
      setFavorite(false);
      setFeedback(isGuest ? "Removed from your guest recipes." : "Removed from favorites.");
    } catch (error) {
      setFeedback(error.message || "We couldn't remove this recipe right now.");
    }
  };

  return (
    <div>
      <div className="bg-white border-1 border-gray-300 rounded-2xl h-full overflow-hidden hover:shadow-md cursor-pointer">
        <div className=" min-h-[24vh] relative">
          <Link href={`/recipe/${recipeSlug}`}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover absolute top-0"
              />
            )}
          </Link>

          <div
            className="bg-gray-100 absolute top-4 right-4 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-red-300 group"
            onClick={() => {
              if (favorite) {
                handleUnlike(recipe.id);
              } else {
                handleLike();
              }
            }}
          >
            {!favorite && (
              <span className="material-symbols-outlined text-gray-500 group-hover:text-red-600">
                favorite
              </span>
            )}
            {favorite && (
              <span className=" text-gray-500 ">
                <img src="/filled-heart.svg" alt="" />
              </span>
            )}
          </div>
        </div>
        <Link href={`/recipe/${recipe.slug || recipeSlug}`}>
          <div className="p-6">
            <h3 className="font-semibold text-xl my-2">{recipe.title}</h3>
            <div className="">
              <span className="text-gray-600">{recipe.expectedTime}</span>
              <div className="mt-2">
                <span className="font-semibold">Key ingredients:</span>
                <div className="ingredients flex flex-col text-gray-600 mt-2">
                  {showIngredients.map((ingredient, index) => {
                    return <span key={index}>{ingredient}</span>;
                  })}
                  {remainingCount == 1 && <span>+{remainingCount} other</span>}
                  {remainingCount > 1 && <span>+{remainingCount} others</span>}
                </div>
              </div>
            </div>
            {feedback && <p className="mt-3 text-sm text-gray-500">{feedback}</p>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
