import { ExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { Exercise } from "@/types/exercise";

export const exerciseKeys = {
  all: ["exercise"],
  getExercises: (params: ExerciseParams) => [...exerciseKeys.all, "list", params],
  getExerciseBySlug: (slug: Exercise["slug"]) => [...exerciseKeys.all, "detail", slug]
};