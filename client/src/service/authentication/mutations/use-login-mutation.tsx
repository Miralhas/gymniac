import { useMutation } from "@tanstack/react-query";
import { signin } from "../api/login";

export const useLoginMutation = () => useMutation({
  mutationFn: signin
});