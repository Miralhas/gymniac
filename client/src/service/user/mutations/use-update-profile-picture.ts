import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putProfilePicture } from "../api/put-profile-picture";
import { userKeys } from "../queries/query-keys";

export const useUpdateProfilePicture = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: putProfilePicture,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}