export const workoutPlanKeys = {
  all: ["workout-plan"],
  getWorkoutPlanBySlug: (slug: string) => [...workoutPlanKeys.all, "detail", slug],
}