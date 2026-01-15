import { env } from "@/env";
import { WorkoutExerciseArrayInput } from "@/lib/schemas/workout-exercise-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { Workout } from "@/types/workout";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const addWorkoutExercises = async (id: Workout["id"], data: WorkoutExerciseArrayInput): Promise<void> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workouts/${id}/exercises`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

}