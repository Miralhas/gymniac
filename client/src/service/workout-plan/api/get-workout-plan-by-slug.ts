import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { WorkoutPlan } from "@/types/workout-plan";

export const getWorkoutPlanBySlug = async (slug: WorkoutPlan["slug"]): Promise<WorkoutPlan> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workout-plans/${slug}`
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}