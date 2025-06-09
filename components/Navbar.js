"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut, status } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <div>
      <nav className=" border-b-1 border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {session && (
            <Link
              href={"/home"}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
                <img src="/utensils.svg" className="w-5 text-white" alt="" />
              </div>
              <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-700">
                FlavorFusion
              </span>
            </Link>
          )}
          {!session && (
            <Link
              href={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
                <img src="/utensils.svg" className="w-5 text-white" alt="" />
              </div>
              <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-700">
                FlavorFusion
              </span>
            </Link>
          )}
          {session && (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } w-full md:block md:w-auto`}
              >
                <ul className="font-medium flex flex-col md:p-0 border border-gray-100 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-whitedark:border-gray-700 mt-6 bg-green-50 md:bg-white">
                  <li>
                    <Link
                      href={"/home"}
                      className={
                        pathname === "/home"
                          ? "text-white block py-2 px-3 rounded-xl bg-green-600"
                          : "block py-2 px-3 text-black rounded-xl md:bg-transparent md:dark:text hover:bg-gray-200"
                      }
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/favorites"}
                      className={
                        pathname === "/favorites"
                          ? "text-white block py-2 px-3 rounded-xl bg-green-600"
                          : "block py-2 px-3 text-black rounded-xl md:bg-transparent md:dark:text hover:bg-gray-200"
                      }
                    >
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/profile"}
                      className={
                        pathname === "/profile"
                          ? "text-white block py-2 px-3 rounded-xl bg-green-600"
                          : "block py-2 px-3 text-black rounded-xl md:bg-transparent md:dark:text hover:bg-gray-200"
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className={
                      pathname == "/"
                        ? "hidden"
                        : "border-1 border-gray-200 rounded-xl"
                    }
                  >
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block py-2 px-3 rounded-xl md:border-0 text-black  hover:bg-emerald-300 transition cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <img
                          src="/signin.svg"
                          alt=""
                          className="w-4 text-gray-200"
                        />
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
