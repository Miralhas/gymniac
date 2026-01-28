'use client'

import { useGetUserInfo } from "@/service/user/queries/use-get-user-info";
import { User } from "@/types/auth";

const Username = ({ user }: { user: User }) => {
  const query = useGetUserInfo()
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-white group">{query.data?.username ?? user.username}</h1>
  )
}

export default Username;
