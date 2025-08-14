"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, status } from "next-auth/react";
import { useRouter } from "next/navigation";
import react from "react";
import Loading from "@/components/Loading";
import { Analytics } from "@vercel/analytics/next"

export default function Landing() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session, router]);

  if (status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );

  // For the sign in
  const handleLogin = async (e) => {
    // This prevents the default behaviour (relaoding of the page) and we're using it since I'm calling an API here.
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email:inputEmail,
      password:inputPassword,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="bg-gray-50 h-[84vh] overflow-hidden">
      <div className="lg:flex block">
        <div className="w-[50%] h-[84vh] hidden lg:block relative text-center">
          <h2 className="text-white absolute top-[28vh] left-4 text-6xl font-bold ">
            Discover Amazing Recipes
          </h2>
          <h4 className="top-[48vh] left-4 text-3xl font-semibold text-white absolute">
            Turn your ingredients into delicious meals with FlavorFusion
          </h4>
          <img
            src="/food-image.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="lg:w-[50%] w-full">
          <div className=" flex flex-col justify-center py-14 px-10 sm:px-6 items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 max-w">
                Enter your email and password to access your account
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-[80vw] shadow-lg">
              <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                <form
                  className="space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={handleLogin}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your email address"
                        onChange={(e) => setInputEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your password"
                        onChange={(e) => setInputPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-100 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex">
                    <button
                      className="cursor-pointer inline-flex h-10 rounded-lg w-full items-center justify-center gap-2 border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-sm"
                      onClick={() => {
                        signIn("google");
                      }}
                    >
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-[18px] w-[18px]"
                      />
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
