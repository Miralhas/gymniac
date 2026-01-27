import AddWeight from "@/components/profile/weight/add-weight";
import WeightHeader from "@/components/profile/weight/weight-header";
import WeightList from "@/components/profile/weight/weight-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { defaultWeightsParams, getUserWeightsQueryOptions } from "@/service/weight/queries/use-get-user-weights";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
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
      <div className="w-full flex justify-end">
        <AddWeight>
          <Button variant="cool" size="sm" className="rounded-sm w-full md:w-auto">
            <PlusIcon className="size-3.5" strokeWidth={3} />
            Add Weight
          </Button>
        </AddWeight>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeightList accessToken={accessToken} />
      </HydrationBoundary>
    </div>
  )
}

export default WeightPage;
