import React from "react";

const Generating = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-2 text-green-700 md:mt-26 mt-22">
        Your recipe is underway! please wait... could take around 2 mins
      </div>
      <div className="border-2 border-gray-300 h-[20vh] lg:w-[20vw] md:w-[30vw] w-[40vw] flex flex-col items-center justify-center rounded-2xl shadow-md bg-green-200 mx-4  py-2">
        <div className="border-t-4 border-green-600 m-2 w-10 h-10 animate-spin rounded-full"></div>
        <div className="font-semibold text-lg text-green-800">
          Generating...
        </div>
      </div>
    </div>
  );
};

export default Generating;
