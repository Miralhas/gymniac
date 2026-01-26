import { PaginationParams } from "@/lib/schemas/pagination-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWorkoutPlans } from "../api/get-workout-plans";
import { workoutPlanKeys } from "./query-keys";

export const getWorkoutPlansQueryOptions = (params: PaginationParams = {}) => queryOptions({
  queryFn: () => getWorkoutPlans(),
  queryKey: workoutPlanKeys.getWorkoutPlans(params),
});

export const useGetWorkoutPlans = (params: PaginationParams = {}) => (
  useQuery(getWorkoutPlansQueryOptions(params))
);

export const defaultWorkoutPlansParams: PaginationParams = {page: 0, size: 12}