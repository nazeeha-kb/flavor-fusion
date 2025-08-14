"use client"
import CuisineBar from "@/components/CuisineBar";
import React, { useEffect, useState } from "react";

const Profile = () => {
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
    <div className="bg-gray-50 px-6 max-h-[84vh]">
      <div className="max-w-7xl flex flex-col justify-center items-center w-full mx-auto">
        <h1 className="font-bold text-3xl mt-6 mb-2">Your Profile</h1>
        <div className="text-gray-600 text-[18px]">
          Member since May 10, 2023
        </div>

        <section className="w-full mt-4">
          <div className="flex justify-between gap-6 md:flex-row flex-col mx-6">
            <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex justify-between">
              <div>
                <div className="title pb-2 font-semibold text-sm">
                  Favorite Recipes
                </div>
                <div className="font-semibold text-3xl">{favs.length}</div>
              </div>
              <div className="icon">
                <span className="material-symbols-outlined text-gray-500">
                  favorite
                </span>
              </div>
            </div>

            <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex justify-between">
              <div>
                <div className="title pb-2 font-semibold text-sm">
                  Last Recipe Generation
                </div>
                <div className="font-semibold text-3xl">4 days ago</div>
              </div>
              <div className="icon">
                <span className="material-symbols-outlined text-gray-500">
                  search
                </span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <CuisineBar />
        </section>
      </div>
    </div>
  );
};

export default Profile;
