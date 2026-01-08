import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { decrypt } from "@/utils/decrypt-jwt";
import { cookies } from "next/headers"

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const user = decrypt(accessToken);
  return user
}