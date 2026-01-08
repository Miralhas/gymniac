import { CustomJwtPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { cache } from "react";

const decodeJwt = (token?: string) => {
  if (!token) return undefined;
  const decoded = jwtDecode(token) as CustomJwtPayload;
  return decoded.user;
}

export const decrypt = cache(decodeJwt)

