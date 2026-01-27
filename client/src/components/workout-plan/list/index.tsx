'use client'

import GenericPagination from "@/components/generic-pagination";
import { nuqsPaginationParams } from "@/lib/schemas/pagination-schema";
import { defaultWorkoutPlansParams, useGetWorkoutPlans } from "@/service/workout-plan/queries/use-get-workout-plans";
import { DumbbellIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import WorkoutPlanCard from "./workout-plan-card";

const WorkoutPlanList = () => {
  const [params, setParams] = useQueryStates(nuqsPaginationParams);
  const query = useGetWorkoutPlans({
    ...defaultWorkoutPlansParams,
    page: params.page, size: params.size
  });

  if (query.isLoading) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <DumbbellIcon className="text-muted-foreground size-20 animate-spin" />
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
        {query.data?.results.map(workoutPlan => (
          <WorkoutPlanCard key={workoutPlan.id} workoutPlan={workoutPlan} />
        ))}
      </div>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination
          query={query.data}
          handlePage={(page) => setParams({ page })}
          className="mt-12"
        />
      ) : null}
    </>
  )
}

export default WorkoutPlanList;
