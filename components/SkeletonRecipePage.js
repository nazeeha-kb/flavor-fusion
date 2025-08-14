import React from "react";
import { motion } from "framer-motion";

const SkeletonRecipePage = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div>
      <motion.div
        className="bg-gray-50 w-full h-[83vh] flex flex-col justify-center animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="lg:w-4xl max-w-4xl lg:mx-auto mx-6 h-full bg-green-50 border-gray-400 border rounded-2xl p-8 shadow-lg relative my-10">
          {/* Title & Close Btn */}
          <div className="flex justify-between px-2 mt-6">
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
          </div>

          {/* Expected Time */}
          <div className="time flex items-center gap-2 mt-4 px-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* Ingredients & Instructions */}
          <div className="flex flex-col pt-8 pb-2 gap-8 lg:mx-16 sm:mx-8 mx-4">
            {/* Ingredients */}
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                {arr.map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                ))}
              </div>
            </div>
            {/* Instructions */}
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                {arr.map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkeletonRecipePage;
