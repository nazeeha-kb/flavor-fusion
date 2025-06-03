import React from "react";
import NoRecipe from "@/components/NoRecipe";
import GeneratedRecipes from "@/components/GeneratedRecipes";
import Loading from "@/components/Loading";

const home = () => {

  return (
    <div>
      <div className="bg-gray-50 w-full pb-6 min-h-screen">
        <div className=" flex flex-col justify-center items-center mx-auto max-w-screen-xl px-6 ">
          <section>
            <div className="text-center flex flex-col md:gap-6 gap-10 mt-14">
              <h1 className="font-semibold text-4xl">Find Delicious Recipes</h1>
              <p className="text-[18px] text-gray-600">
                Enter the ingredients you have on hand, and I'll generate the
                perfect recipe for you.
              </p>
              <div className="generator border-1 border-gray-500 rounded-xl p-3 bg-white">
                <div className="input-area flex justify-between">
                  <input
                    type="text"
                    className="grow outline-none mr-4"
                    name=""
                    id=""
                    placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
                  />
                  <button className="cursor-pointer bg-green-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-500 transition">
                    <img src="/arrow-up.svg" alt="" className="w-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            {/* <NoRecipe/> */}
            <GeneratedRecipes />
          </section>
        </div>
      </div>
    </div>
  );
};

export default home;
