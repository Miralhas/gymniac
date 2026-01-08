import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./service/api-error";
import { refreshTokenRequest } from "./service/authentication/api/refresh-token";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "./utils/constants";
import { createSession, deleteSession } from "./utils/session";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  const hasAccessToken = !!accessToken;
  const hasRefreshToken = !!refreshToken;

  if (!hasAccessToken && hasRefreshToken) {
    // Needs to refresh accessToken
    try {
      const response = await refreshTokenRequest(refreshToken);
      await deleteSession();
      await createSession(response);
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(err.detail);
      }
      await deleteSession();
    }
  }

  return NextResponse.next()

}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}