import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWeight } from "../api/post-weight";
import { weightKeys } from "../queries/query-key";

export const useAddWeight = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postWeight,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: weightKeys.all });
    }
  });
}