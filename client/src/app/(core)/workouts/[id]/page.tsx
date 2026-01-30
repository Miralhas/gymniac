import WorkoutDetail from "@/components/workout/detail";
import { getWorkoutByIdQueryOptions } from "@/service/workout/queries/use-get-workout-by-id";
import { Workout } from "@/types/workout";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workout"
};

const WorkoutPage = async ({ params }: { params: Promise<{ id: Workout["uuidKey"] }> }) => {
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
