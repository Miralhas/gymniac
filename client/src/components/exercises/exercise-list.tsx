'use client'

import { exerciseParamsDefaultValues, mapMuscleFilter, nuqsExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { useGetExercises } from "@/service/exercise/queries/use-get-exercises";
import { DumbbellIcon } from "lucide-react";
import { useQueryStates } from 'nuqs';
import GenericPagination from "../generic-pagination";
import ExerciseCard from "./exercise-card";

const ExerciseList = () => {
  const [params, setParams] = useQueryStates(nuqsExerciseParams);

  const query = useGetExercises({
    ...exerciseParamsDefaultValues,
    page: params.page,
    muscleGroup: mapMuscleFilter(params.muscle),
    q: params.q
  });

  if (query.isLoading) {
    return (
      <div className="min-h-[60vh] border w-full flex items-center justify-center">
        <DumbbellIcon className="text-muted-foreground size-12 animate-spin" />
      </div>
    );
  }

  if (!query.data?.results.length) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-secondary/20 border">
        <div className="text-center">
          <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
            <DumbbellIcon className="size-9 text-accent/90" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg md:text-xl">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8">
        {query.data?.results.map((exercise, index) => (
          <ExerciseCard index={index} key={exercise.id} exercise={exercise} />
        ))}
      </div>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data} handlePage={(page) => setParams({ page })} className="mt-12" />
      ) : null}
    </>
  )
}

export default ExerciseList;
