import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoute = ["/", "/signin", "public"];
const guestAllowedRoutes = ["/home", "/favorites", "/profile", "/recipe"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    publicRoute.includes(pathname) ||
    pathname.match(/\.(.*)$/) // Any request with a file extension
  ) {
    return NextResponse.next();
  }

  const isGuestRoute = guestAllowedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isGuestRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
