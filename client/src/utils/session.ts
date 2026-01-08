import { env } from "@/env";
import { LoginResponse, User } from "@/types/auth";
import { importSPKI, jwtVerify, JWTVerifyResult } from 'jose';
import { cookies } from "next/headers";
import { cache } from "react";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME, SESSION_ENCRYPTION_ALGORITHM } from "./constants";

type Tokens = {
  accessToken?: string;
  refreshToken?: string;
}

type CustomJwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  jti?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  user?: User;
}

const pubKey = env.PUBLIC_KEY.replace(/\\n/g, '\n');
const publicKeyPromise = importSPKI(pubKey, SESSION_ENCRYPTION_ALGORITHM);

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

export const decrypt = cache(async (accessToken: string | undefined = '') => {
  if (!accessToken) return undefined;
  try {
    const publicKey = await publicKeyPromise;

    const { payload } = await jwtVerify(accessToken, publicKey, {
      issuer: "gymniac-server"
    }) as JWTVerifyResult & { payload: CustomJwtPayload };

    return payload;
    // eslint-disable-next-line
  } catch (error) {
    console.log('Failed to verify session');
    return undefined;
  }
});