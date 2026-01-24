import { UserSummary } from "./auth";
import { Exercise } from "./exercise";

export type WorkoutRoutine = {
  id: number;
  name: string;
  desirableDayOfWeek: string;
  note: string | null;
  exercises: RoutineExercise[];
}

export type WorkoutRoutineSummary = Omit<WorkoutRoutine, "exercises" | "note">;

export type RoutineExercise = {
  id: number;
  exercise: Exercise;
  desirableSets: number;
  desirableReps: number;
}

export type WorkoutPlan = {
  id: number;
  name: string;
  createdAt: string;
  slug: string;
  description: string;
  routines: WorkoutRoutine[];
  user: UserSummary;
}

export type WorkoutPlanSummary = Omit<WorkoutPlan, "routines"> & { routines: WorkoutRoutineSummary[] }