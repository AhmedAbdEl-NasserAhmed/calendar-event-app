import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/", "/login", "/register"]);
const isUserAuthenticatedRoute = createRouteMatcher(["/events"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated && isUserAuthenticatedRoute(req)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/events", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
