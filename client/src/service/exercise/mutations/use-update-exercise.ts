import { ExerciseInput } from "@/lib/schemas/exercise-schema";
import { Exercise } from "@/types/exercise";
import { useMutation } from "@tanstack/react-query";
import { updateExercise } from "../api/update-exercise";

export const useUpdateExercise = () => {
  return useMutation({
    mutationFn: ({ id, value }: { value: ExerciseInput, id: Exercise["id"] }) => updateExercise(value, id),
  });
}