import { env } from "@/env";
import { WorkoutParams, workoutParamsSchema } from "@/lib/schemas/params/workout-params-schema";
import { ApiError } from "@/service/api-error";
import { getAuthState } from "@/service/user/api/get-auth-state";
import { ApiResponseError } from "@/types/api";
import { PaginatedQuery } from "@/types/paginated-query";
import { WorkoutSummary } from "@/types/workout";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { buildQueryString } from "@/utils/string-utils";

export const getWorkoutsByUser = async (params: WorkoutParams): Promise<PaginatedQuery<WorkoutSummary[]>> => {
  const parsed = workoutParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workouts${queryString}`;

  const authState = await getAuthState();
  if (!authState) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
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