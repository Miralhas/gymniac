import ProfileInfoGrid from "@/components/profile/info";
import { getUserInfoQueryOptions } from "@/service/user/queries/use-get-user-info";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { getCurrentUser } from "@/utils/session";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Profile"
};

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!user) redirect("/login");
  if (!accessToken) redirect("/login");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserInfoQueryOptions(accessToken));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileInfoGrid user={user} />
    </HydrationBoundary>
  )
}

export default ProfilePage;
