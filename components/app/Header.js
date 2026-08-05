"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useGuestSession } from "@/components/guestSessionContext";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isGuest, isAuthenticated, exitGuestMode } = useGuestSession();
  const isSignedIn = isAuthenticated || isGuest;

  const handleSignOut = () => {
    if (isGuest) {
      exitGuestMode();
      router.push("/signin");
      return;
    }

    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div>
      <nav className=" border-b-1 border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo
            href={isSignedIn ? "/home" : "/"}
            action={
              isGuest && (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                  Guest
                </span>
              )
            }
          />
          {isSignedIn && (
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
                className={`${isOpen ? "block" : "hidden"
                  } w-full md:block md:w-auto`}
              >
                <ul className="font-medium flex flex-col md:p-0 border border-gray-100 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 mt-6 md:bg-transparent bg-white">
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
                      onClick={handleSignOut}
                      className="block py-2 px-3 rounded-xl md:border-0 text-black  hover:bg-emerald-300 transition cursor-pointer"
                    >
                      <div className="flex gap-2">
                        <img
                          src="/signin.svg"
                          alt=""
                          className="w-4 text-gray-200"
                        />
                        <span>{isGuest ? "Exit Guest" : "Sign Out"}</span>
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

export default Header;
