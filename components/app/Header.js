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
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 md:hidden"
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
                  } w-full md:block md:w-auto mt-3 md:mt-0`}
              >
                <ul className="font-medium flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm md:flex-row md:space-x-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:mt-0 mt-0">
                  <li>
                    <Link
                      href={"/home"}
                      className={
                        pathname === "/home"
                          ? "block rounded-xl bg-green-600 px-3 py-2.5 text-white"
                          : "block rounded-xl px-3 py-2.5 text-gray-700 transition hover:bg-gray-100 md:bg-transparent md:text-black"
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
                          ? "block rounded-xl bg-green-600 px-3 py-2.5 text-white"
                          : "block rounded-xl px-3 py-2.5 text-gray-700 transition hover:bg-gray-100 md:bg-transparent md:text-black"
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
                          ? "block rounded-xl bg-green-600 px-3 py-2.5 text-white"
                          : "block rounded-xl px-3 py-2.5 text-gray-700 transition hover:bg-gray-100 md:bg-transparent md:text-black"
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
                      className="block w-full rounded-xl px-3 py-2.5 text-left text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 md:border-0 md:text-black"
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
