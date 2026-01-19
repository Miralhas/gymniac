import { Exercise } from "@/types/exercise";
import { is404 } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getExerciseBySlug } from "../api/get-exercise-by-slug";
import { exerciseKeys } from "./query-keys";

export const getExerciseBySlugQueryOptions = (slug: Exercise["slug"]) => queryOptions({
  queryFn: () => getExerciseBySlug(slug),
  queryKey: exerciseKeys.getExerciseBySlug(slug),
  retry: (_, err) => !is404(err),
});

export const useGetExerciseBySlug = (slug: string) => useQuery(getExerciseBySlugQueryOptions(slug));