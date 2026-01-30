import { UserSummary } from "./auth";

export type WorkoutExercise = {
  id: number;
  exercise: Exercise;
  sets: WorkoutExerciseSet[];
}

export type Exercise = {
  id: number;
  slug: string;
  name: string;
  muscleGroup: string;
}

export type WorkoutExerciseSet = {
  id: number;
  kg: number;
  reps: number;
  createdAt: string;
}

export type Workout = {
  id: number;
  uuidKey: string;
  createdAt: string;
  updatedAt: string;
  exercises: WorkoutExercise[];
  note?: string;
}

export type WorkoutSummary = Omit<Workout, "note" | "exercises"> & {
  user: UserSummary;
}