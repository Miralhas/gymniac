import { useMutation } from "@tanstack/react-query";
import { putUserImage } from "../api/put-user-image";

type Args = { userId: number, formData: FormData };

export const useUpdateUserImage = () => {
  return useMutation({
    mutationFn: ({ formData, userId }: Args) => putUserImage(userId, formData),
  });
}