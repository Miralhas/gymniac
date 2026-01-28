import { Weight } from "@/types/weight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putWeight } from "../api/update-weight";
import { weightKeys } from "../queries/query-key";
import { userKeys } from "@/service/user/queries/query-keys";

export const useUpdateWeightById = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: { kg: number }, id: Weight["id"] }) => putWeight(data, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: weightKeys.all });
      client.invalidateQueries({ queryKey: userKeys.all });
    }
  });
}