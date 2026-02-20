import { DailyMacroParams } from "@/lib/schemas/params/meals-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getUserDailyMacros } from "../api/get-daily-macros";
import { mealKeys } from "./query-keys";

export const getUserDailyMacrosQueryOptions = (accessToken: string, params: DailyMacroParams) => queryOptions({
  queryFn: () => getUserDailyMacros(params, accessToken),
  queryKey: mealKeys.getUserDailyMacros(params),
});

export const useGetUserDailyMacros = (accessToken: string, params: DailyMacroParams) => useQuery(
  getUserDailyMacrosQueryOptions(accessToken, params)
);

export const defaultDailyMacroParams: DailyMacroParams = { from: format(new Date(), "yyyy-MM-dd"), zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone }; 