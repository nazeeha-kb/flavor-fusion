import React from "react";

const RecipePage = () => {
  return (
    <div className=" bg-gray-50 w-full min-h-[44vw] flex flex-col justify-center">
      <div className="recipe-page mx-auto max-w-4xl bg-green-50 border-gray-400 border rounded-2xl p-8 shadow-lg relative">
        <div className="flex justify-between  px-2 mt-6">
          <h1 className="text-3xl font-semibold text-gray-900">Garlic Butter Shrimp Pasta</h1>
          <div className="bg-red-200 rounded-full w-8 p-1 flex justify-center items-center cursor-pointer group hover:bg-red-400 absolute top-6 right-6">
            <span className="material-symbols-outlined group-hover:text-red-800 text-red-600">close</span>
          </div>
        </div>
        <div className="info">
          <div className="time flex items-center gap-2 text-gray-700 mt-4 px-2">
            <span className="material-symbols-outlined">schedule</span>
            <span>20 mins</span>
          </div>
        </div>
        <div className="main-info flex  py-8 mb-4 gap-6 mx-16 text-gray-700">
          <div className="ingredients  text-[18px]">
            <h2 className="text-2xl font-semibold pb-4 text-gray-800">Ingredients</h2>
            <ul className="list-disc marker:text-green-700 pl-6">
              <li>Spaghetti or linguine</li>
              <li>Large shrimp</li>
              <li>Butter</li>
              <li>Olive</li>
              <li>Garlic Cloves</li>
              <li>Red pepper flakes</li>
              <li>Lemon juice</li>
              <li>parsely</li>
            </ul>
          </div>
          <div className="instructions  text-[18px]">
            <h2 className="text-2xl font-semibold pb-4 text-gray-800">Instructions</h2>
            <ul className="list-decimal marker:text-green-700 pl-6">
              <li>Cook pasta according to package instructions.</li>
              <li>
                In a large skillet, melt butter with olive oil over medium heat.
              </li>
              <li>Add garlic and red pepper flakes, cook until fragrant.</li>
              <li>Add shrimp and cook until pink and opaque.</li>
              <li>Pour in white wine and lemon juice, simmer for 2 minutes.</li>
              <li>Drain pasta and add to the skillet, tossing to coat.</li>
              <li>Garnish with fresh parsley and serve immediately.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
