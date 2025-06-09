"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { fetchImageFromPixabay } from "@/app/lib/fetchImage";
// import { v4 as uuidv4 } from "uuid";

const RecipeCard = ({ recipe, isFavorite = false, onUnlike }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageUrl, setImageUrl] = useState("");
  const maxToshow = 4;
  const showIngredients = recipe.ingredients.slice(0, maxToshow);
  const remainingCount = recipe.ingredients.length - maxToshow;

  // fetching image from Pixaby
  const fetchImageFromPixabay = async (query) => {
    const response = await fetch(
      `https://pixabay.com/api/?key=${
        process.env.NEXT_PUBLIC_PIXABAY_API_KEY
      }&q=${encodeURIComponent(
        query
      )}&image_type=photo&category=food&per_page=3`
    );

    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL; //use first image
    } else {
      return "/utensils-canva"; //backup image if no match is found
    }
  };

  useEffect(() => {
    async function loadImage() {
      const imageUrl = await fetchImageFromPixabay(recipe.title, "food");
      setImageUrl(imageUrl);
    }
    loadImage();
  }, [recipe.title]);

  // Favorites recipe logic
  const handleLike = async () => {
    // Sending fav recipe object to the BE API
    const favoriteRecipe = {
      id: recipe.id,
      title: recipe.title,
      expectedTime: recipe.expectedTime,
      classification: recipe.classification,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };

    try {
      await fetch("api/favorite-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteRecipe),
      });
    } finally {
      setFavorite(true);
    }
    // console.log("the recipe",recipe)
    // console.log("favorite reicpe",favoriteRecipe)
  };

  return (
    <div>
      {/* <Link href={"/recipe"}> */}
      <div className="bg-white border-1 border-gray-300 rounded-2xl h-full overflow-hidden hover:shadow-md cursor-pointer">
        <div className=" min-h-[24vh] relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover absolute top-0"
            />
          )}
          <div
            className="bg-gray-100 absolute top-4 right-4 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-red-300 group"
            onClick={() => {
              if (favorite) {
                onUnlike(recipe.id);
              } else {
                handleLike();
                setFavorite(true);
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
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default RecipeCard;
