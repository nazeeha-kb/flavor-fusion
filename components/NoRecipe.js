import React from "react";

const NoRecipe = () => {
  return (
    <div className="flex flex-col justify-center items-center my-26 text-center mx-auto">
      <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center">
        <img src="/plate.svg" className="w-12" alt="" />
      </div>
      <h3 className="font-semibold text-xl mt-6">Enter ingredients to get started</h3>
      <p className="text-gray-600 mt-4">
        Type the ingredients you have and we'll suggest delicious recipes you
        can make right now.
      </p>
    </div>
  );
};

export default NoRecipe;
