import { CustomJwtPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const decrypt = (token?: string) => {
  if (!token) return null;
  const decoded = jwtDecode(token) as CustomJwtPayload;
  if (!decoded.user) return null;
  return decoded.user;
}

