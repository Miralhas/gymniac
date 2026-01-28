import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { UserInfo } from "@/types/auth";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const getUserInfo = async (accessToken?: string): Promise<UserInfo> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/infos`

  if (!accessToken) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}