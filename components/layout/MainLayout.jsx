"use client"

import { usePathname } from "next/navigation";
import AppHeader from "@/components/app/Header";
import LandingHeader from "@/components/landing/SiteHeader";
import Footer from "@/components/app/Footer";

export default function MainLayout({ children }) {

    const pathname = usePathname();
    const isLanding = pathname === "/";

    return (
        <>
            {isLanding ? <LandingHeader /> : <AppHeader />}
            <div className="min-h-[83vh]">{children}</div>
            <Footer />
        </>
    )
}