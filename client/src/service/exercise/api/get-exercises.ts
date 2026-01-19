import { env } from "@/env";
import { ExerciseParams, exerciseParamsSchema } from "@/lib/schemas/params/exercise-params-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Exercise } from "@/types/exercise";
import { PaginatedQuery } from "@/types/paginated-query";
import { buildQueryString } from "@/utils/string-utils";

export const getExercises = async (params: ExerciseParams): Promise<PaginatedQuery<Exercise[]>> => {
  const parsed = exerciseParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/exercises${queryString}`
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}