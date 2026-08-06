"use client"
import React from "react";
import Lottie from "lottie-react";

const NoRecipe = () => {
  return (
    <div className="flex flex-col justify-center items-center my-26 text-center mx-auto">
      <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center">
        {/* <img src="/plate.svg" className="w-12" alt="" /> */}
        <Lottie
          animationData={require("@/public/animations/plate.json")}
          loop
          autoplay
          style={{ width: 200, height: 200, transform: "scale(1.2)" }}
        />
      </div>
      <h3 className="font-semibold text-xl mt-6">
        Enter ingredients to get started
      </h3>
      <p className="text-gray-600 mt-4">
        Type the ingredients you have and we&apos;ll suggest delicious recipes
        you can make right now.
      </p>
    </div>
  );
};

export default NoRecipe;
