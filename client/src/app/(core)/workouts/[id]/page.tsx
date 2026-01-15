import WorkoutDetail from "@/components/workout/detail";
import { getWorkoutByIdQueryOptions } from "@/service/workout/queries/use-get-workout-by-id";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const WorkoutPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getWorkoutByIdQueryOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkoutDetail id={id} />
    </HydrationBoundary>
  )
}

export default WorkoutPage;
