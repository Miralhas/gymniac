import { env } from "@/env";
import { ExerciseInput } from "@/lib/schemas/exercise-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { Exercise } from "@/types/exercise";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateExercise = async (data: ExerciseInput, id: Exercise["id"]): Promise<Exercise> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/exercises/${id}`;

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
    throw new ApiError(data);
  }

  return await res.json()
}