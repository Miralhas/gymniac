import ExerciseList from "@/components/exercises/exercise-list";
import ExercisesFilter from "@/components/exercises/exercises-filter";
import ExercisesSearch from "@/components/exercises/exercises-search";
import { exerciseParamsDefaultValues } from "@/lib/schemas/params/exercise-params-schema";
import { getExercisesQueryOptions } from "@/service/exercise/query/use-get-exercises";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ExercisesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getExercisesQueryOptions(exerciseParamsDefaultValues));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col md:flex-row gap-2.5">
        <ExercisesSearch />
        <ExercisesFilter />
      </div>
      <ExerciseList />
    </HydrationBoundary>
  )
}

export default ExercisesPage;
