import { Exercise } from "@/types/exercise";
import { is404 } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWorkoutPlanBySlug } from "../api/get-workout-plan-by-slug";
import { workoutPlanKeys } from "./query-keys";

export const getWorkoutPlanBySlugQueryOptions = (slug: Exercise["slug"]) => queryOptions({
  queryFn: () => getWorkoutPlanBySlug(slug),
  queryKey: workoutPlanKeys.getWorkoutPlanBySlug(slug),
  retry: (_, err) => !is404(err),
});

export const useGetWorkoutPlanBySlug = (slug: string) => useQuery(getWorkoutPlanBySlugQueryOptions(slug));