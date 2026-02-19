import { MealsParams } from "@/lib/schemas/params/meals-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserMeals } from "../api/get-user-meals";
import { mealKeys } from "./query-keys";
import { startOfToday } from "date-fns";

export const getUserMealsQueryOptions = (accessToken: string, params: MealsParams = {}) => queryOptions({
  queryFn: () => getUserMeals(params, accessToken),
  queryKey: mealKeys.getUserMeals(params),
});

export const useGetUserMeals = (accessToken: string, params: MealsParams = {}) => useQuery(
  getUserMealsQueryOptions(accessToken, params)
);

export const defaultMealsParams: MealsParams = { page: 0, size: 10, from: startOfToday().toISOString(), zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone }; 