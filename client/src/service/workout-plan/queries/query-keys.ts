export const workoutPlanKeys = {
  all: ["workout-plan"],
  getWorkoutPlanById: (id: number) => [...workoutPlanKeys.all, "detail", id],
}