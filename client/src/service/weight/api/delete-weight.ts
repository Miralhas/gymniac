import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { Weight } from "@/types/weight";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const deleteWeight = async (id: Weight["id"]): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/infos/weights/${id}`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "delete",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

}