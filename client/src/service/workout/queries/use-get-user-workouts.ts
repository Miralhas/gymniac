import { User } from "@/types/auth";
import { isApiError } from "@/utils/common-utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { workoutKeys } from "./query-keys";
import { getWorkoutsByUser } from "../api/get-user-workouts";

export const getUserWorkoutsQueryOptions = (user?: User ) => queryOptions({
  queryFn: getWorkoutsByUser,
  queryKey: workoutKeys.all,
  retry: (_, err) => !(isApiError(err) && err.status === 403),
  enabled: !!user
});

export const useGetUserWorkouts = (user?: User) => useQuery(getUserWorkoutsQueryOptions(user));