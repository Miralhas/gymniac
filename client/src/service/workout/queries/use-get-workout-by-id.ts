import { is404 } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWorkoutById } from "../api/get-workout-by-id";
import { workoutKeys } from "./query-keys";
import { Workout } from "@/types/workout";

export const getWorkoutByIdQueryOptions = (uuidKey: Workout["uuidKey"]) => queryOptions({
  queryFn: () => getWorkoutById(uuidKey),
  queryKey: workoutKeys.getWorkoutById(uuidKey),
  retry: (_, err) => !is404(err),
});

export const useGetWorkoutByID = (uuidKey: Workout["uuidKey"]) => useQuery(getWorkoutByIdQueryOptions(uuidKey));