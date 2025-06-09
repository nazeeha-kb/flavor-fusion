import React from "react";
import CuisineBar from "@/components/CuisineBar";

const profile = () => {
  return (
    <div className="bg-gray-50 px-6">
    <div className="max-w-7xl flex flex-col justify-center items-center w-full mx-auto">
      <h1 className="font-bold text-3xl mt-10 mb-4">Your Profile</h1>
      <div className="text-gray-600 text-[18px]">Member since May 10, 2023</div>

      <section className="w-full mt-4">
        <div className="flex justify-between gap-6 md:flex-row flex-col mx-6">


          {/* <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex  justify-between">
            <div>
              <div className="title font-semibold text-sm pb-2">
                Favorite Recipes
              </div>
              <div className="font-semibold text-3xl">49</div>
            </div>
            <div className="icon">
              <span className="material-symbols-outlined text-gray-500">
                chef_hat
              </span>
            </div>
          </div> */}


          <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex justify-between">
            <div>
              <div className="title pb-2 font-semibold text-sm">
                Favorite Recipes
              </div>
              <div className="font-semibold text-3xl">12</div>
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
                Last Recipe Search
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

export default profile;
