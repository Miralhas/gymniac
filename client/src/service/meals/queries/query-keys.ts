import { DailyMacroParams, MealsParams } from "@/lib/schemas/params/meals-params-schema";

export const mealKeys = {
  all: ["meal"],
  getUserMeals: (params: MealsParams) => [...mealKeys.all, "list", params],
  getUserDailyMacros: (params: DailyMacroParams) => [...mealKeys.all, "daily", params]
}