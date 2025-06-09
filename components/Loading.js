import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[82vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-70"></div>
      </div>
    </div>
  );
};

export default Loading;
