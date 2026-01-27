import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import AuthenticatedButton from "@/components/ui/authenticated-button";
import WorkoutPlanList from "@/components/workout-plan/list";
import { defaultWorkoutPlansParams, getWorkoutPlansQueryOptions } from "@/service/workout-plan/queries/use-get-workout-plans";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PlusIcon, ScrollTextIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workout Plans"
};

const WorkoutPlansPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getWorkoutPlansQueryOptions(defaultWorkoutPlansParams));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="p-4 md:py-8 relative space-y-4 min-h-screen">
        <PageHeader
          description="Browse our library of workout plans"
          icon={ScrollTextIcon}
          title="Workout Plans"
          titleClassName="text-lg md:text-2xl lg:text-3xl"
          descriptionClassName="text-sm md:text-lg"
        />

        <div className="w-full flex">
          <AuthenticatedButton variant="cool" asChild>
            <Link href="/workout-plans/new" className="w-full md:w-[200px] ml-auto">
              <PlusIcon className="size-4 text-white" strokeWidth={3} />
              Add Workout Plan
            </Link>
          </AuthenticatedButton>
        </div>
        <WorkoutPlanList />
      </Container>
    </HydrationBoundary>
  )
}

export default WorkoutPlansPage;
