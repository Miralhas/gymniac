'use client'

import { useGetExercises } from "@/service/exercise/query/use-get-exercises";
import DefaultLoading from "../default-loading";
import ExerciseCard from "./exercise-card";

const ExerciseList = () => {
  const query = useGetExercises({ size: 50 });

  if (query.isLoading) {
    return <DefaultLoading />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8">
      {query.data?.results.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseList;
