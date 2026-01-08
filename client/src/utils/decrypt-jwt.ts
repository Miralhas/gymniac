import { CustomJwtPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const decryptJwt = (token?: string) => {
  if (!token) return null;
  const decoded = jwtDecode(token) as CustomJwtPayload;
  return decoded;
}

export const decryptUser = (token?: string) => {
  const decoded = decryptJwt(token);
  if (!decoded?.user) return null;
  return decoded.user;
}