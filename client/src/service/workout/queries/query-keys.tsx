
export const workoutKeys = {
  all: ["workout"],
  getWorkoutById: (id: number) => [...workoutKeys.all, "detail", id],
}