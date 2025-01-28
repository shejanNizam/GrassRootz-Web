import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("accesstoken")?.value;

  console.log("JWT Cookie:", jwt);

  const url = req.nextUrl;

  // If the user has a valid JWT and is trying to access `/login`, redirect to `/`
  if (jwt && url.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user does not have a JWT and is trying to access `/`, redirect to `/login`
  if (!jwt && url.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow all other routes to proceed
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/login"], // Match `/` and `/login`
};

export default middleware;
