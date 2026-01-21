import WorkoutPlanDetail from "@/components/workout-plan/detail";
import { getWorkoutPlanBySlugQueryOptions } from "@/service/workout-plan/queries/use-get-workout-by-slug";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const WorkoutPlanPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getWorkoutPlanBySlugQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkoutPlanDetail slug={slug} />
    </HydrationBoundary>
  )
}

export default WorkoutPlanPage;
