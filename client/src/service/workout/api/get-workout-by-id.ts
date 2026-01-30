import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Workout } from "@/types/workout";

export const getWorkoutById = async (uuidKey: Workout["uuidKey"]): Promise<Workout> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workouts/${uuidKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
} 