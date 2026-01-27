import { env } from "@/env";
import { PaginationParams, paginationParamsSchema } from "@/lib/schemas/pagination-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { PaginatedQuery } from "@/types/paginated-query";
import { Weight } from "@/types/weight";
import { buildQueryString } from "@/utils/string-utils";

export const getUserWeights = async (params: PaginationParams, accessToken: string): Promise<PaginatedQuery<Weight[]>> => {
  const parsed = paginationParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/infos/weights${queryString}`;

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