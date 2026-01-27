import AddExerciseModal from "@/components/exercises/add-exercise";
import ExerciseList from "@/components/exercises/exercise-list";
import ExercisesFilter from "@/components/exercises/exercises-filter";
import ExercisesSearch from "@/components/exercises/exercises-search";
import PageHeader from "@/components/page-header";
import { exerciseParamsDefaultValues } from "@/lib/schemas/params/exercise-params-schema";
import { getExercisesQueryOptions } from "@/service/exercise/queries/use-get-exercises";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DumbbellIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercises"
};

const ExercisesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getExercisesQueryOptions(exerciseParamsDefaultValues));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader
        description="Browse our library of exercises"
        icon={DumbbellIcon}
        title="Exercises"
        titleClassName="text-lg md:text-2xl lg:text-3xl"
        descriptionClassName="text-sm md:text-lg"
      />
      <div className="w-full flex flex-col md:flex-row gap-2.5">
        <ExercisesSearch />
        <ExercisesFilter />
        <AddExerciseModal />
      </div>
      <ExerciseList />
    </HydrationBoundary>
  )
}

export default ExercisesPage;
