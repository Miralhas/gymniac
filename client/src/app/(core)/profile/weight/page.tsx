import WeightHeader from "@/components/profile/weight/weight-header";
import WeightList from "@/components/profile/weight/weight-list";
import { Separator } from "@/components/ui/separator";
import { defaultWeightsParams, getUserWeightsQueryOptions } from "@/service/weight/queries/use-get-user-weights";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Weighings"
};

const WeightPage = async () => {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserWeightsQueryOptions(defaultWeightsParams, accessToken));

  return (
    <div className="space-y-4">
      <WeightHeader />
      <Separator />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeightList accessToken={accessToken} />
      </HydrationBoundary>
    </div>
  )
}

export default WeightPage;
