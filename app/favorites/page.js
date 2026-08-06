"use client";
import React, { useEffect, useState } from "react";
import RecipeCards from "@/components/home/RecipeCard";
import NoFavs from "@/components/NoFavs";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useGuestSession } from "@/components/guestSessionContext";
import { getRecipes } from "@/lib/storage/recipeRepository";

const Favorites = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const [favs, setFavs] = useState([]);
  const [favsExist, setFavsExist] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isGuest } = useGuestSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipes({ isGuest });
        setFavs(data || []);
        setFavsExist((data || []).length > 0);
      } catch (err) {
        console.error("failed to fetch favs", err);
        setFavs([]);
        setFavsExist(false);
        setError("We couldn't load your saved recipes right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isGuest]);

  return (
    <div className="bg-gray-50 min-h-[83vh] px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 py-8">
          Your Favorite Recipes
        </h1>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {!favsExist && !loading && <NoFavs />}
        {loading && (
          <div className="wrapper flex justify-start xl:gap-6 md:gap-4 gap-2 h-full w-full flex-wrap">
            {arr.map((i) => (
              <div
                key={i}
                className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
              >
                <SkeletonLoader />
              </div>
            ))}
          </div>
        )}
        {favsExist && !loading && (
          <div className="wrapper flex justify-start xl:gap-6 md:gap-4 gap-2 h-full w-full flex-wrap">
            {favs.map((recipe) => (
              <div
                key={recipe.id}
                className="lg:max-w-[32%] sm:max-w-[48%] w-full mb-4"
              >
                <RecipeCards recipe={recipe} isFavorite={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
