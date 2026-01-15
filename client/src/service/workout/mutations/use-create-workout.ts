import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkout } from "../api/create-workout";
import { workoutKeys } from "../queries/query-keys";

export const useCreateWorkout = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createWorkout,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutKeys.all });
    }
  });
}