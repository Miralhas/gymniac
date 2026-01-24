import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { PaginatedQuery } from "@/types/paginated-query";
import { WorkoutPlanSummary } from "@/types/workout-plan";

export const getWorkoutPlans = async (): Promise<PaginatedQuery<WorkoutPlanSummary[]>> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workout-plans`
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}