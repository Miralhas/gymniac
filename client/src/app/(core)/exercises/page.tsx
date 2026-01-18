import ExerciseList from "@/components/exercises/exercise-list";
import { getExercisesQueryOptions } from "@/service/exercise/query/use-get-exercises";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ExercisesPage = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getExercisesQueryOptions({ size: 50 }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExerciseList />
    </HydrationBoundary>
  )
}

export default ExercisesPage;
