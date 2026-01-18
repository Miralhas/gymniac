import { queryOptions, useQuery } from "@tanstack/react-query";
import { getMuscleGroups } from "../api/get-muscle-groups";
import { muscleGroupKeys } from "./query-keys";

export const getMuscleGroupsQueryOptions = () => queryOptions({
  queryFn: getMuscleGroups,
  queryKey: muscleGroupKeys.getMuscleGroups(),
});

export const useGetMuscleGroups = () => useQuery(getMuscleGroupsQueryOptions());