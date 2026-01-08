import { env } from "@/env";
import { SignUpInput } from "@/lib/schemas/signup-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { User } from "@/types/auth";

export const signup = async (data: SignUpInput): Promise<User> => {
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json() as User;
}