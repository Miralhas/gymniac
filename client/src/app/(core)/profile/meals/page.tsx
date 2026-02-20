import MealList from "@/components/profile/meals/meal-list";
import MealsHeader from "@/components/profile/meals/meals-header";
import { Separator } from "@/components/ui/separator";
import { defaultDailyMacroParams, getUserDailyMacrosQueryOptions } from "@/service/meals/queries/use-get-user-daily-macros";
import { defaultMealsParams, getUserMealsQueryOptions } from "@/service/meals/queries/use-get-user-meals";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/utils/constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Meals"
};

const MealsPage = async () => {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserMealsQueryOptions(accessToken, defaultMealsParams));
  await queryClient.prefetchQuery(getUserDailyMacrosQueryOptions(accessToken, defaultDailyMacroParams));

  return (
    <div className="space-y-4">
      <MealsHeader />
      <Separator />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MealList accessToken={accessToken} />
      </HydrationBoundary>
    </div>
  )
}

export default MealsPage;
