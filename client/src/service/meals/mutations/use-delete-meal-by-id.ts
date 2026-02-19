import { userKeys } from "@/service/user/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeal } from "../api/delete-meal";
import { mealKeys } from "../queries/query-keys";

export const useDeleteMealById = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: mealKeys.all });
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}