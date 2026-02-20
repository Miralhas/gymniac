import { env } from "@/env";
import { DailyMacroParams, mealsParamsSchema } from "@/lib/schemas/params/meals-params-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { DailyMacros } from "@/types/meal";
import { buildQueryString } from "@/utils/string-utils";

export const getUserDailyMacros = async (params: DailyMacroParams, accessToken: string): Promise<DailyMacros> => {
  const parsed = mealsParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/meals/macros${queryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json();
}