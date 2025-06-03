import React from "react";
// import { usePathname } from "next/navigation";
import Link from "next/link";

const RecipeCard = () => {

  return (
    <div>
      <Link href={"/recipe"}>
        <div className="bg-white border-1 border-gray-300 rounded-2xl h-full overflow-hidden hover:shadow-md cursor-pointer">
          <div className=" min-h-[24vh] relative">
            <img
              src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1770&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover absolute top-0"
            />
            <div className="bg-gray-100 absolute top-4 right-4 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-red-300 group">
              <span
                className="material-symbols-outlined text-gray-500 group-hover:text-red-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-xl my-2">
              Garlic Butter Shrimp Pasta
            </h3>
            <div className="">
              <span className="text-gray-600">20 mins</span>
              <div className="mt-2">
                <span className="font-semibold">Key ingredients:</span>
                <div className="ingredients flex flex-col text-gray-600 mt-2">
                  <span>Spaghetti</span>
                  <span>Large Shrimp</span>
                  <span>Butter</span>
                  <span>Olive Oil</span>
                  <span>+5 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
