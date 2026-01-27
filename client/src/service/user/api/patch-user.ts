import { env } from "@/env";
import { UpdateUserInput } from "@/lib/schemas/update-profile-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const patchUser = async (data: UpdateUserInput): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/users`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    console.log(data);
    throw new ApiError(data);
  }

}