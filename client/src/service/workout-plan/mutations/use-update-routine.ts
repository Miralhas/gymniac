import { WorkoutRoutineInput } from "@/lib/schemas/workout-plan-schema";
import { WorkoutPlan, WorkoutRoutine } from "@/types/workout-plan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoutine } from "../api/update-routine";
import { workoutPlanKeys } from "../queries/query-keys";

type Props = {
  slug: WorkoutPlan["slug"];
  id: WorkoutRoutine["id"];
  data: WorkoutRoutineInput;
}

export const useUpdateRoutine = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({data, id, slug}: Props) => updateRoutine(data, slug, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workoutPlanKeys.all });
    }
  });
}