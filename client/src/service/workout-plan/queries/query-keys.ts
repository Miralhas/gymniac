import { PaginationParams } from "@/lib/schemas/pagination-schema";

export const workoutPlanKeys = {
  all: ["workout-plan"],
  getWorkoutPlans: (params: PaginationParams) => [...workoutPlanKeys.all, "list", params],
  getWorkoutPlanBySlug: (slug: string) => [...workoutPlanKeys.all, "detail", slug],
}