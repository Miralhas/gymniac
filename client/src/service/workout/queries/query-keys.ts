import { WorkoutParams } from "@/lib/schemas/params/workout-params-schema";
import { Workout } from "@/types/workout";

export const workoutKeys = {
  all: ["workout"],
  getWorkoutById: (id: Workout["uuidKey"]) => [...workoutKeys.all, "detail", id],
  getUserWorkouts: (params: WorkoutParams) => [...workoutKeys.all, "list", params]
}