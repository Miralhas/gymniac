import { ExerciseParams } from "@/lib/schemas/params/exercise-params-schema";

export const exerciseKeys = {
  all: ["exercise"],
  getExercises: (params: ExerciseParams) => [...exerciseKeys.all, "list", params]
};