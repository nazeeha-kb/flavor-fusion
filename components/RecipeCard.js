"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "pexels";
import slugify from "slugify";
// import { v4 as uuidv4 } from "uuid";

// toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeCard = ({ recipe, isFavorite = false, onUnlike }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageUrl, setImageUrl] = useState("");
  const maxToshow = 4;
  const showIngredients = recipe.ingredients.slice(0, maxToshow);
  const remainingCount = recipe.ingredients.length - maxToshow;
  const pexelsClient = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
  const recipeSlug = slugify(recipe.title, { lower: true })

  async function fetchImageFromPexels(query) {
    try {
      const res = await pexelsClient.photos.search({ query, per_page: 5 });
      const photo = res.photos?.[0];
      return photo?.src.medium || "/utensils-canva"; // fallback if no image
    } catch (err) {
      console.error("Pexels fetch error", err);
      return "/utensils-canva";
    }
  }

  useEffect(()=>{
    console.log("from recipe card this recipe's slug is:",recipeSlug)
  })

  useEffect(() => {
    async function loadImage() {
      const imageUrl = await fetchImageFromPexels(recipe.title);
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
      slug: recipeSlug,
    };

    try {
      await fetch("api/favorite-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteRecipe),
      });
      toast("💗 Recipe saved to favs", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setFavorite(true);
    }
    // console.log("the recipe",recipe)
    // console.log("favorite reicpe",favoriteRecipe)
  };

  // Handling Unlike here instead of on favs page
  const handleUnlike = async (recipeId) => {
    const res = await fetch("/api/favorite-actions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId }),
    });

    if (res.ok) {
      setFavorite(false);

      toast("🗑️ your recipe is deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("idk why the delete toast ran 🤷🏼‍♀️");
      // setFavs((prevFavorites) =>
      //   prevFavorites.filter((recipe) => recipe.id !== recipeId)
      // );
    } else {
      console.error("Failed to delete favorite");
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
                console.log("Deleted the recipe 🗑️");
              } else {
                handleLike();
                console.log("Set the recipe to favs 💗");
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
        {/* since recipe slug isn't generated by AI I had to define it */}
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
