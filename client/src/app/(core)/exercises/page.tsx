import ExerciseList from "@/components/exercises/exercise-list";
import { exerciseParamsDefaultValues } from "@/lib/schemas/params/exercise-params-schema";
import { getExercisesQueryOptions } from "@/service/exercise/query/use-get-exercises";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ExercisesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getExercisesQueryOptions(exerciseParamsDefaultValues));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExerciseList />
    </HydrationBoundary>
  )
}

export default ExercisesPage;
