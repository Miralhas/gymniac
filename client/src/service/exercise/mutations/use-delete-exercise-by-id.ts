import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteExerciseById } from "../api/delete-exercise-by-id";

export const useDeleteExerciseById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteExerciseById,
    onSuccess: () => {
      router.push("/exercises");
    }
  });
}