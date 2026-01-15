import { WorkoutExerciseArrayInput } from "@/lib/schemas/workout-exercise-schema";
import { Workout } from "@/types/workout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWorkoutExercises } from "../api/add-workout-exercise";
import { workoutKeys } from "../queries/query-keys";

export const useAddWorkoutExercises = ({ id }: { id: Workout["id"] }) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkoutExerciseArrayInput) => addWorkoutExercises(id, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutKeys.getWorkoutById(id) });
    }
  });
}