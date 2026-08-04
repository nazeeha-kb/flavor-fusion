"use client";

import { SessionProvider } from "next-auth/react";
import { GuestSessionProvider } from "@/components/guestSessionContext";

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      <GuestSessionProvider>{children}</GuestSessionProvider>
    </SessionProvider>
  );
}
