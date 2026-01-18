import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExercise } from "../api/add-exercise";
import { exerciseKeys } from "../queries/query-keys";

export const useAddExercise = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: addExercise,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: exerciseKeys.all });
    }
  });
}