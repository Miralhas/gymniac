import { Workout, WorkoutExercise } from "@/types/workout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkoutExerciseById } from "../api/delete-workout-exercise-by-id";
import { workoutKeys } from "../queries/query-keys";


type Params = {
  workoutId: Workout["id"],
  workoutExerciseId: WorkoutExercise["id"]
}

export const useDeleteWorkoutExerciseById = ({ workoutId, workoutExerciseId }: Params) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => deleteWorkoutExerciseById(workoutId, workoutExerciseId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutKeys.getWorkoutById(workoutId) });
    }
  });
}