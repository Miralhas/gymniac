'server-only'

import { ApiError } from "@/service/api-error";
import { refreshTokenRequest } from "@/service/authentication/api/refresh-token";
import { LoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "./constants";
import { decryptUser } from "./decrypt-jwt";
import { cache } from "react";

type Tokens = {
  accessToken?: string;
  refreshToken?: string;
  hasRefreshToken: boolean;
  hasAccessToken: boolean;
}

export const getAuthTokens = async (): Promise<Tokens> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const hasAccessToken = !!accessToken;
  const hasRefreshToken = !!refreshToken;
  return { accessToken, refreshToken, hasAccessToken, hasRefreshToken };
}

export const createSession = async (data: LoginResponse) => {
  const cookieStore = await cookies();

  const accessTokenExpiresAt = new Date(Date.now() + (data.accessTokenExpiresIn * 1000));
  const refreshTokenExpiresAt = new Date(Date.now() + (data.refreshTokenExpiresIn * 1000));

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, data.accessToken, {
    httpOnly: false,
    secure: true,
    expires: accessTokenExpiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, data.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshTokenExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export const refreshTokens = async (refreshToken: string) => {
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

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const user = decryptUser(accessToken);
  return user
})