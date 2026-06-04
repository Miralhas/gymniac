import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { getAuthState } from "./get-auth-state";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { Image } from "@/types/image";

export const putUserImage = async (userId: number, formData: FormData): Promise<Image> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/users/${userId}/images`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);

  const res = await fetch(url, {
    headers: myHeaders,
    body: formData,
    method: "PUT"
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return res.json() as Promise<Image>;
}