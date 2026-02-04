import { env } from "@/env";
import { WorkoutRoutineInput } from "@/lib/schemas/workout-plan-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { WorkoutPlan, WorkoutRoutine } from "@/types/workout-plan";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";

export const updateRoutine = async (data: WorkoutRoutineInput, slug: string, id: WorkoutRoutine["id"]): Promise<WorkoutPlan> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workout-plans/${slug}/routines/${id}`;

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

  return await res.json();
}