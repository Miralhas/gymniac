import { CustomJwtPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { cache } from "react";

const decodeJwt = (token?: string) => {
  if (!token) return null;
  const decoded = jwtDecode(token) as CustomJwtPayload;
  if (!decoded.user) return null;
  return decoded.user;
}

export const decrypt = cache(decodeJwt)

