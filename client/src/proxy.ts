import { NextRequest, NextResponse } from "next/server";
import { getAuthTokens, getCurrentUser, refreshTokens } from "./utils/session";
import { adminCheck } from "./utils/user-utils";

// Only unauthenticated users can access.
const unauthenticatedOnly = [
  "/login",
  "/signup",
];

const adminRoutes = [
  "/admin"
];

const protectedDynamicRoutes = [
  "/workouts"
]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = adminRoutes.includes(path);
  const isUnauthenticatedOnly = unauthenticatedOnly.includes(path);
  const isProtectedDynamicRoute = protectedDynamicRoutes.some(r => path.includes(r))


  const { hasAccessToken, hasRefreshToken, refreshToken } = await getAuthTokens();
  const user = await getCurrentUser();

  if (isAdminRoute && !adminCheck(user)) {
    if (!user) return NextResponse.redirect(new URL('/login', req.nextUrl));
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (user && isUnauthenticatedOnly) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (!user && isProtectedDynamicRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Access Token expired and user has the refresh token stored in cookies.
  if (!hasAccessToken && hasRefreshToken) {
    await refreshTokens(refreshToken!);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}