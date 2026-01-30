import { useMutation } from "@tanstack/react-query";
import { deleteWorkout } from "../api/delete-workout";

export const useDeleteWorkout = () => {
  return useMutation({
    mutationFn: deleteWorkout,
  });
}