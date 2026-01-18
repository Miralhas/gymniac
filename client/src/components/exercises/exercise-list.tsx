'use client'

import { useGetExercises } from "@/service/exercise/query/use-get-exercises";
import { parseAsIndex, useQueryState } from 'nuqs';
import DefaultLoading from "../default-loading";
import GenericPagination from "../pagination";
import ExerciseCard from "./exercise-card";
import { DumbbellIcon } from "lucide-react";

const ExerciseList = () => {
  const [page, setPage] = useQueryState('page', parseAsIndex.withDefault(0).withOptions({ scroll: true }));
  const query = useGetExercises({ size: 12, page });

  if (query.isLoading) {
    return <DefaultLoading />
  }

  if (!query.data?.results.length) {
    return (
      <div className="grid min-h-[40vh] place-items-center bg-secondary/20 border">
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
        {query.data?.results.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data} handlePage={(pg) => setPage(pg)} className="mt-12" />
      ) : null}
    </>
  )
}

export default ExerciseList;
