import { UserSummary } from "./auth";
import { Exercise } from "./exercise";

export type WorkoutPlan = {
  id: number;
  name: string;
  createdAt: string;
  slug: string;
  description: string;
  routines: WorkoutRoutine[];
  user: UserSummary;
}

export type WorkoutRoutine = {
  id: number;
  name: string;
  desirableDayOfWeek: string;
  note: string | null;
  exercises: RoutineExercise[];
}

export type RoutineExercise = {
  id: number;
  exercise: Exercise;
  desirableSets: number;
  desirableReps: number;
}