import { Workout } from "@/types/workout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkoutNote } from "../api/update-workout-note";
import { workoutKeys } from "../queries/query-keys";

export const useUpdateWorkoutNote = (id: Workout["id"]) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (note: string) => updateWorkoutNote(id, note),
    onSuccess: () => client.invalidateQueries({ queryKey: workoutKeys.all })
  });
}