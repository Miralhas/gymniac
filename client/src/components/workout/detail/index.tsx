'use client'

import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useGetWorkoutByID } from "@/service/workout/queries/use-get-workout-by-id";
import { WorkoutExercise } from "@/types/workout";
import { is404 } from "@/utils/common-utils";
import { format } from "date-fns";
import { DumbbellIcon, PlusIcon, XIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import AddExerciseForm from "../exercise-form/add-exercise-form";
import EditMode from "./edit-mode";
import ExerciseCard from "./exercise-card";

const WorkoutDetail = ({ id }: { id: number }) => {
  const query = useGetWorkoutByID(id);
  const [editMode, setEditMode] = useState<WorkoutExercise["id"] | undefined>(undefined);
  const [addExercisesMode, setAddExercisesMode] = useState<boolean>(false);

  if (is404(query.error)) {
    notFound();
  }

  if (query.isLoading || query.isError) {
    return <DefaultLoading />
  }

  const totalSets = query.data?.exercises.reduce((acc, curr) => acc + curr.sets.length, 0);
  const totalExercises = query.data?.exercises.length;

  const handleEditMode = (id: WorkoutExercise["id"] | undefined) => {
    return editMode === id ? setEditMode(undefined) : setEditMode(id);
  };

  const handleAddExerciseMode = () => setAddExercisesMode(prev => !prev);

  return (
    query.data && (
      <section className="space-y-4">
        <PageHeader description={format(new Date(query.data.createdAt), "EEEE, MMMM dd, yyyy")} icon={DumbbellIcon} title="Workout Day" />
        <div className="w-full flex gap-3">
          <InfoCard bold={totalExercises?.toString()} description="Exercises" />
          <InfoCard bold={totalSets?.toString()} description="Total Sets" />
        </div>
        {query.data.note ? (
          <div className="border p-4 my-6 text-foreground/80 rounded-xl bg-secondary/25npm border-l-primary border-l-3 italic">
            <p>{query.data.note}</p>
          </div>
        ) : null}
        {query.data.exercises.map((workoutExercise, index) => {
          return workoutExercise.id === editMode
            ? <EditMode key={workoutExercise.id} workoutId={id} index={index} handleMode={handleEditMode} workoutExercise={workoutExercise} />
            : <ExerciseCard key={workoutExercise.id} workoutId={id} index={index} handleMode={handleEditMode} workoutExercise={workoutExercise} />
        })}

        <div className="w-full border my-6" />
        {addExercisesMode ? (
          <>
            <Button variant="secondary" className="w-full" onClick={handleAddExerciseMode}>
              <XIcon />
              Cancel
            </Button>
            <AddExerciseForm id={id} handleMode={handleAddExerciseMode} />
          </>
        ) : (
          <Button variant="secondary" className="w-full" onClick={handleAddExerciseMode}>
            <PlusIcon />
            Add Exercises
          </Button>
        )}
      </section>
    )
  )
}

const InfoCard = ({ bold, description }: { bold?: string, description?: string }) => {
  return (
    <div className="flex items-center justify-center px-4 w-full md:max-w-34 min-h-14 border bg-secondary/30 rounded-lg">
      <p className="text-lg">
        <span className="font-bold text-xl">{bold}</span>
        {" "}
        <span className="text-foreground/70 text-sm text-[15px] relative bottom-px">{description}</span>
      </p>
    </div>
  )
}

export default WorkoutDetail;
