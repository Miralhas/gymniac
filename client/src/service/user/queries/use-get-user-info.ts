import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/get-user-info";
import { userKeys } from "./query-keys";

export const getUserInfoQueryOptions = (accessToken?: string) => queryOptions({
  queryFn: () => getUserInfo(accessToken),
  queryKey: userKeys.userInfo(),
});

export const useGetUserInfo = (accessToken?: string) => useQuery(getUserInfoQueryOptions(accessToken));