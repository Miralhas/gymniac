import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWeight } from "../api/delete-weight";
import { weightKeys } from "../queries/query-key";

export const useDeleteWeight = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteWeight,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: weightKeys.all });
    }
  });
}