import React from "react";

const Footer = () => {
  return (
    <div className="border-t-1 border-gray-300">
    <div className="flex justify-between  p-4 text-sm text-gray-600 mx-auto max-w-7xl">
      <div className="cursor-pointer hover:text-gray-900">&copy; 2025 . FlavorFusion . All rights reserved</div>
      <div className="flex gap-2 cursor-pointer">
        <div className="hover:text-gray-900">Privacy Policy</div>
        <div className="hover:text-gray-900">Terms of Service</div>
        <div className="hover:text-gray-900">Contact Us</div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
