import { Workout, WorkoutExercise } from "@/types/workout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkoutExercise } from "../api/update-workout-exercise";
import { workoutKeys } from "../queries/query-keys";
import { WorkoutExerciseInput } from "@/lib/schemas/workout-exercise-schema";

type Params = {
  workoutId: Workout["id"];
  workoutExerciseId: WorkoutExercise["id"];
}

export const useUpdateWorkoutExercise = ({ workoutId, workoutExerciseId }: Params) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkoutExerciseInput) => updateWorkoutExercise(workoutId, workoutExerciseId, data),
    onSuccess: () => client.invalidateQueries({queryKey: workoutKeys.getWorkoutById(workoutId)})
  });
}