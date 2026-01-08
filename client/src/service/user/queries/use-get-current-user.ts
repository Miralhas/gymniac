import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAuthState } from "../api/get-auth-state";
import { userKeys } from "./query-keys";

const getCurrentUserQueryOptions = () => queryOptions({
  queryFn: getAuthState,
  queryKey: userKeys.all,
  refetchOnWindowFocus: false,
});

export const useGetAuthState = () => useQuery(getCurrentUserQueryOptions());