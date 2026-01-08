import { NextRequest, NextResponse } from "next/server";
import { getAuthTokens, refreshTokens } from "./utils/session";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const { hasAccessToken, hasRefreshToken, refreshToken } = await getAuthTokens();

  // Access Token expired and user has the refresh token stored in cookies.
  if (!hasAccessToken && hasRefreshToken) {
    await refreshTokens(refreshToken!);
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}