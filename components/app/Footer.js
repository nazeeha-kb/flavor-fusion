import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t-1 border-gray-300">
    <div className="flex sm:flex-row sm:gap-0 gap-2 sm:items-baseline items-center flex-col justify-between  p-4 text-sm text-gray-600 mx-auto max-w-7xl">
      <div className="cursor-pointer hover:text-gray-900">&copy; 2025 . FlavorFusion . All rights reserved</div>
      <div className="flex gap-2 cursor-pointer">
        <div className="hover:text-gray-900">Privacy Policy</div>
        <div className="hover:text-gray-900">Terms of Service</div>
        <div className="hover:text-gray-900">
          <Link href={"/home"}>Contact Us</Link></div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
