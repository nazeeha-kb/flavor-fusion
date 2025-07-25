"use client";
import React, { useEffect, useState } from "react";
import RecipeCards from "@/components/RecipeCard";
import NoFavs from "@/components/NoFavs";
// toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("api/favorite-actions");
      if (res.ok) {
        const data = await res.json();
        setFavs(data);
        console.log("data is", data);
      } else {
        console.log("failed to fetch favs");
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="bg-gray-50 min-h-[83vh] px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 py-8">
          Your Favorite Recipes
        </h1>
        {favs.length === 0 && <NoFavs />}
        <div className="wrapper flex justify-start xl:gap-6 md:gap-4 gap-2 h-full w-full flex-wrap">
          {favs.map((recipe) => (
            <div
              key={recipe.id}
              className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
            >
              <RecipeCards
                recipe={recipe}
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
