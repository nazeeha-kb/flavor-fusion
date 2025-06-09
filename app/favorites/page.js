"use client";
import React, { useEffect, useState } from "react";
import RecipeCards from "@/components/RecipeCard";

const favorites = () => {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("api/favorite-actions");
      if (res.ok) {
        const data = await res.json();
        setFavs(data);
      } else {
        console.log("failed to fetch favs");
      }
    };
    fetchFavorites()
  }, []);

  const handleUnlike = async (recipeId) => {
  const res = await fetch("/api/favorite-actions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
  });

  if (res.ok) {
    setFavs((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== recipeId)
    );
  } else {
    console.error("Failed to delete favorite");
  }
};

  return (
    <div className="bg-gray-50 min-h-[82vh] px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 py-8">
          Your Favorite Recipes
        </h1>
        <div className="wrapper flex justify-start xl:gap-6 md:gap-4 gap-2 h-full w-full flex-wrap">
          {favs.map((recipe) => (
            <div
              key={recipe.id}
              className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
            >
              <RecipeCards recipe={recipe} isFavorite={true} onUnlike={handleUnlike}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default favorites;
