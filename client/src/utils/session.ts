import { LoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "./constants";

type Tokens = {
  accessToken?: string;
  refreshToken?: string;
}

export const getAuthTokens = async (): Promise<Tokens> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  return { accessToken, refreshToken };
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