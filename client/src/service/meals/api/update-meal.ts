import { env } from "@/env";
import { MealInput } from "@/lib/schemas/meal-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { Meal } from "@/types/meal";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateMeal = async (data: MealInput, id: Meal["id"]): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/meals/${id}`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

}