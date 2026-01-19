import { ExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getExercises } from "../api/get-exercises";
import { exerciseKeys } from "./query-keys";

export const getExercisesQueryOptions = (params: ExerciseParams = {}) => queryOptions({
  queryFn: () => getExercises(params),
  queryKey: exerciseKeys.getExercises(params),
});

export const useGetExercises = (params: ExerciseParams = {}) => useQuery(getExercisesQueryOptions(params));