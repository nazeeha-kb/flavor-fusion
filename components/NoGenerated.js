import React from "react";

const NoGenerated = () => {
  return (
    <div className="flex flex-col justify-center items-center my-25 text-center mx-auto">
      <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center">
        <div className="text-3xl">🥲</div>
      </div>
      <div className="w-[46vw]">
        <h3 className="font-semibold text-xl mt-6">
          That’s a unique combination!
        </h3>
        <p className="text-gray-600 mt-4">
          We couldn’t find a matching recipe. Try re-entering the ingredients or
          experimenting with a different combo to discover something delicious!
        </p>
      </div>
    </div>
  );
};

export default NoGenerated;
