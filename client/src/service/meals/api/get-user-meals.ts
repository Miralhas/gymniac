import { env } from "@/env";
import { MealsParams, mealsParamsSchema } from "@/lib/schemas/params/meals-params-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Meal } from "@/types/meal";
import { PaginatedQuery } from "@/types/paginated-query";
import { buildQueryString } from "@/utils/string-utils";

export const getUserMeals = async (params: MealsParams, accessToken: string): Promise<PaginatedQuery<Meal[]>> => {
  const parsed = mealsParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/meals${queryString}`;

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