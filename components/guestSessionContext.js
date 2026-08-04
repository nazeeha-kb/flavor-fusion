"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

const GuestSessionContext = createContext(null);
const GUEST_SESSION_STORAGE_KEY = "flavor-fusion:guest-session";

const defaultGuestUser = {
  id: "guest",
  name: "Guest User",
  email: "guest@flavor-fusion.local",
};

function readStoredGuestSession() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(GUEST_SESSION_STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    console.warn("Unable to read guest session", error);
    return null;
  }
}

function persistGuestSession(value) {
  if (typeof window === "undefined") return;

  try {
    if (!value) {
      window.localStorage.removeItem(GUEST_SESSION_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(GUEST_SESSION_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn("Unable to persist guest session", error);
  }
}

export function GuestSessionProvider({ children }) {
  const { data: session, status } = useSession();
  const [guestMode, setGuestMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredGuestSession();
    if (stored?.enabled) {
      setGuestMode(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    persistGuestSession(guestMode ? { enabled: true, user: defaultGuestUser } : null);
  }, [guestMode, hydrated]);

  const enterGuestMode = () => {
    setGuestMode(true);
  };

  const exitGuestMode = () => {
    setGuestMode(false);
  };

  const isAuthenticated = Boolean(session?.user) && !guestMode;
  const isGuest = guestMode;

  const user = useMemo(() => {
    if (isGuest) return defaultGuestUser;
    if (session?.user) return session.user;
    return null;
  }, [isGuest, session?.user]);

  const loading = status === "loading" || !hydrated;

  const value = useMemo(
    () => ({
      isAuthenticated,
      isGuest,
      user,
      loading,
      guestMode,
      enterGuestMode,
      exitGuestMode,
    }),
    [guestMode, isAuthenticated, isGuest, loading, user]
  );

  return (
    <GuestSessionContext.Provider value={value}>
      {children}
    </GuestSessionContext.Provider>
  );
}

export function useGuestSession() {
  const context = useContext(GuestSessionContext);
  if (!context) {
    throw new Error("useGuestSession must be used within GuestSessionProvider");
  }

  return context;
}
