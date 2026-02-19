import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/service/user/queries/query-keys";
import { mealKeys } from "../queries/query-keys";
import { postMeal } from "../api/post-meal";

export const useAddMeal = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postMeal,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: mealKeys.all });
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}