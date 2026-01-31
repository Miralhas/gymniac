import { User } from "@/types/auth";
import { isApiError } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { workoutKeys } from "./query-keys";
import { getWorkoutsByUser } from "../api/get-user-workouts";
import { WorkoutParams } from "@/lib/schemas/params/workout-params-schema";

export const getUserWorkoutsQueryOptions = (user?: User, params: WorkoutParams = {}) => queryOptions({
  queryFn: () => getWorkoutsByUser(params),
  queryKey: workoutKeys.getUserWorkouts(params),
  retry: (_, err) => !(isApiError(err) && err.status === 403),
  enabled: !!user
});

export const useGetUserWorkouts = (user?: User, params: WorkoutParams = {}) => useQuery(
  getUserWorkoutsQueryOptions(user, params)
);