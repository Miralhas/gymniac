import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkoutPlan } from "../api/create-workout-plan";
import { workoutPlanKeys } from "../queries/query-keys";

export const useCreateWorkoutPlan = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createWorkoutPlan,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutPlanKeys.all });
    }
  });
}