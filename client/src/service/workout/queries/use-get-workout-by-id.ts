import { isApiError } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWorkoutById } from "../api/get-workout-by-id";
import { workoutKeys } from "./query-keys";

export const getWorkoutByIdQueryOptions = (id: number) => queryOptions({
  queryFn: () => getWorkoutById(id),
  queryKey: workoutKeys.getWorkoutById(id),
  retry: (_, err) => !(isApiError(err) && err.status === 404),
});

export const useGetWorkoutByID = (id: number) => useQuery(getWorkoutByIdQueryOptions(id));