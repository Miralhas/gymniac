import { WorkoutPlan, WorkoutRoutine } from "@/types/workout-plan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoutine } from "../api/delete-routine";
import { workoutPlanKeys } from "../queries/query-keys";

type Props = {
  id: WorkoutRoutine["id"];
}

export const useDeleteRoutine = (slug: WorkoutPlan["slug"]) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: Props) => deleteRoutine(slug, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutPlanKeys.all });
    }
  });
}