import React from "react";

const NoFavs = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-30 mb-36 text-center mx-auto">
        <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center">
            {/* w-12 */}
          <span className="text-3xl">❤️</span>
        </div>
        <h3 className="font-semibold text-xl mt-6">
          You haven't saved any favorites yet
        </h3>
        <div className="text-gray-600 mt-4 md:w-[40vw]">
          <div className="text-center">
            Click ❤️ icon on a recipe to add it to your favorites. To remove it,
            just click the icon again.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFavs;
