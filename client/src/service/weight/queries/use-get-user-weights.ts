import { PaginationParams } from "@/lib/schemas/pagination-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserWeights } from "../api/get-user-weights";
import { weightKeys } from "./query-key";

export const getUserWeightsQueryOptions = (params: PaginationParams, accessToken: string) => queryOptions({
  queryFn: () => getUserWeights(params, accessToken),
  queryKey: weightKeys.all,
});

export const useGetUserWeights = (params: PaginationParams, accessToken: string) => useQuery(
  getUserWeightsQueryOptions(params, accessToken)
);

export const defaultWeightsParams: PaginationParams = { page: 0, size: 10 }; 