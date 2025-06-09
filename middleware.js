import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoute = ["/", "public"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    publicRoute.includes(pathname) ||
    pathname.match(/\.(.*)$/) // Any request with a file extension
  ) {
    // these paths are good to go, don't redirect here - pass
    return NextResponse.next();
  }
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no token, redirect to "/"

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
