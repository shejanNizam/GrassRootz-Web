// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// const middleware = (req: NextRequest) => {
//   const cookieStore = cookies();
//   const jwt = cookieStore.get("accesstoken")?.value;

//   // console.log("JWT Cookie:", jwt);

//   const url = req.nextUrl;

//   // If the user has a valid JWT and is trying to access `/login`, redirect to `/`
//   if (jwt && url.pathname === "/login") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // If the user does not have a JWT and is trying to access `/`, redirect to `/login`
//   if (!jwt && url.pathname === "/") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Allow all other routes to proceed
//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/", "/login"],
// };

// export default middleware;

// src/middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 1. Base protected paths
const protectedPaths = [
  "/dashboard",
  "/order-history",
  "/cart-list",
  "/wish-list",
];

// 2. Public paths that might exist under protected parents
const publicExceptions = [
  "/profile/public-info", // Example of public route under /profile
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public exceptions
  if (publicExceptions.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if current path is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  const token = request.cookies.get("authToken")?.value;

  if (isProtected && !token) {
    // Store attempted URL for redirect after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
