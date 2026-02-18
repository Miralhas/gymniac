import { MealsParams } from "@/lib/schemas/params/meals-params-schema";

export const mealKeys = {
  all: ["meal"],
  getUserMeals: (params: MealsParams) => [...mealKeys.all, "list", params]
}