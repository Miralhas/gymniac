import { ExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getExericses } from "../api/get-exercises";
import { exerciseKeys } from "./query-keys";

export const getExercisesQueryOptions = (params: ExerciseParams = {}) => queryOptions({
  queryFn: () => getExericses(params),
  queryKey: exerciseKeys.getExercises(params),
});

export const useGetExercises = (params: ExerciseParams = {}) => useQuery(getExercisesQueryOptions(params));