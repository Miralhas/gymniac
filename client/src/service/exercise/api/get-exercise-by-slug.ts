import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Exercise } from "@/types/exercise";

export const getExerciseBySlug = async (slug: Exercise["slug"]): Promise<Exercise> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/exercises/${slug}`
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}