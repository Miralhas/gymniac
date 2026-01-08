import { env } from "@/env";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { LoginResponse } from "@/types/auth";

export const signin = async (data: { email: string, password: string }): Promise<LoginResponse> => {
  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + "/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json() as LoginResponse;
}