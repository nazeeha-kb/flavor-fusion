import React from "react";
import { motion } from "framer-motion";

const SkeletonLoader = () => {
  return (
    <div>
      <motion.div
        className="bg-white border border-gray-300 rounded-2xl overflow-hidden animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Image skeleton */}
        <div className="relative min-h-[23vh] bg-gray-200 w-full">
          <div className="absolute top-4 right-4 bg-gray-300 rounded-full w-10 h-10"></div>
        </div>

        {/* Text skeleton */}
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkeletonLoader;
