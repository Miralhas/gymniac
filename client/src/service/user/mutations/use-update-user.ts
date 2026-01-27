import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../api/patch-user";
import { userKeys } from "../queries/query-keys";

export const useUpdateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}