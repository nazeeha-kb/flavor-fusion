"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProfileChart from "@/components/chart/ProfileChart";
import { useGuestSession } from "@/components/guestSessionContext";
import { getRecipes } from "@/lib/storage/recipeRepository";

const Profile = () => {
  const [favs, setFavs] = useState([]);
  const [date, setDate] = useState("");
  const [lastGenerated, setLastGenerated] = useState(null);
  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState("");
  const { isGuest, isAuthenticated } = useGuestSession();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getRecipes({ isGuest });
        setFavs(data || []);
      } catch (error) {
        console.error("failed to fetch favs", error);
      }
    };

    fetchFavorites();
  }, [isGuest]);

  useEffect(() => {
    if (!isAuthenticated) {
      setDate(isGuest ? "Guest" : "");
      setLastGenerated(null);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("Failed to fetch user profile data");
        }

        const data = await res.json();
        const formattedDate = new Date(data?.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        setDate(formattedDate);
        setLastGenerated(data?.lastGeneratedAt ? new Date(data.lastGeneratedAt) : null);
      } catch (error) {
        console.error("failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, isGuest]);

  useEffect(() => {
    if (!isAuthenticated || isGuest) {
      setActivity([]);
      setActivityError("");
      return;
    }

    const fetchActivity = async () => {
      setActivityLoading(true);
      setActivityError("");

      try {
        const res = await fetch("/api/activity");

        if (!res.ok) {
          throw new Error("Unable to load activity data");
        }

        const data = await res.json();
        setActivity(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("failed to fetch activity", error);
        setActivity([]);
        setActivityError("We couldn’t load your generation activity right now.");
      } finally {
        setActivityLoading(false);
      }
    };

    fetchActivity();
  }, [isAuthenticated, isGuest]);

  const lastGeneratedLabel = useMemo(() => {
    if (!lastGenerated) {
      return "No generations yet";
    }

    const differenceMs = Date.now() - lastGenerated.getTime();
    const days = Math.max(0, Math.floor(differenceMs / (1000 * 60 * 60 * 24)));

    if (days === 0) {
      return "Today";
    }

    return `${days} day${days === 1 ? "" : "s"} ago`;
  }, [lastGenerated]);

  return (
    <div className="bg-gray-50 px-6 min-h-[83vh]">
      <div className="max-w-7xl flex flex-col justify-center items-center w-full mx-auto">
        <h1 className="font-bold text-3xl mt-10 mb-4">Your Profile</h1>
        <div className="text-gray-600 text-[18px]">
          {isGuest ? "Guest mode" : isAuthenticated ? `Member since ${date}` : "Sign in to see your profile"}
        </div>

        <section className="w-full mt-4">
          <div className="flex justify-between gap-6 md:flex-row flex-col mx-6">
            <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex justify-between">
              <div>
                <div className="title pb-2 font-semibold text-sm">
                  Favorite Recipes
                </div>
                <div className="font-semibold text-3xl">{favs.length}</div>
              </div>
              <div className="icon">
                <span className="material-symbols-outlined text-gray-500">
                  favorite
                </span>
              </div>
            </div>

            <div className="bg-white border-1 border-gray-300 rounded-xl grow-1 p-8 flex justify-between">
              <div>
                <div className="title pb-2 font-semibold text-sm">
                  Last Recipe Generation
                </div>
                <div className="font-semibold text-3xl">{lastGeneratedLabel}</div>
              </div>
              <div className="icon">
                <span className="material-symbols-outlined text-gray-500">
                  search
                </span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ProfileChart data={activity} loading={activityLoading} error={activityError} />
        </section>
      </div>
    </div>
  );
};

export default Profile;
