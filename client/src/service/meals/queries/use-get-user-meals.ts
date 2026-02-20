import { MealsParams } from "@/lib/schemas/params/meals-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getUserMeals } from "../api/get-user-meals";
import { mealKeys } from "./query-keys";

export const getUserMealsQueryOptions = (accessToken: string, params: MealsParams = {}) => queryOptions({
  queryFn: () => getUserMeals(params, accessToken),
  queryKey: mealKeys.getUserMeals(params),
});

export const useGetUserMeals = (accessToken: string, params: MealsParams = {}) => useQuery(
  getUserMealsQueryOptions(accessToken, params)
);

export const defaultMealsParams: MealsParams = { page: 0, size: 10, from: format(new Date(), "yyyy-MM-dd"), zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone }; 