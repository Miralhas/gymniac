import { Workout } from "@/types/workout";

export const workoutKeys = {
  all: ["workout"],
  getWorkoutById: (id: Workout["uuidKey"]) => [...workoutKeys.all, "detail", id],
}