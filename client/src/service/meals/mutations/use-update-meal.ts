import { MealInput } from "@/lib/schemas/meal-schema";
import { userKeys } from "@/service/user/queries/query-keys";
import { Meal } from "@/types/meal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeal } from "../api/update-meal";
import { mealKeys } from "../queries/query-keys";

export const useUpdateMeal = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: MealInput, id: Meal["id"] }) => updateMeal(data, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: mealKeys.all });
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}