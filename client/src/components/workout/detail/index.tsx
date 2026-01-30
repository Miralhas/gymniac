'use client'

import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useGetWorkoutByID } from "@/service/workout/queries/use-get-workout-by-id";
import { Workout, WorkoutExercise } from "@/types/workout";
import { is404 } from "@/utils/common-utils";
import { format } from "date-fns";
import { DumbbellIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import AddExerciseForm from "../exercise-form/add-exercise-form";
import EditMode from "./edit-mode";
import ExerciseCard from "./exercise-table";
import { validateAuthorization } from "@/utils/user-utils";
import { useAuthContext } from "@/contexts/auth-context";
import { useDeleteWorkout } from "@/service/workout/mutations/use-delete-workout";
import { toast } from "sonner";
import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import AddNote from "./add-note";

const WorkoutDetail = ({ id }: { id: Workout["uuidKey"] }) => {
  const query = useGetWorkoutByID(id);
  const [editMode, setEditMode] = useState<WorkoutExercise["id"] | undefined>(undefined);
  const [addExercisesMode, setAddExercisesMode] = useState<boolean>(false);
  const { authState } = useAuthContext();
  const deleteMutation = useDeleteWorkout();
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter()

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

  const handleDelete = () => {
    if (!query.data) return;
    deleteMutation.mutate(query.data.id, {
      onSuccess: () => {
        toast.success("Workout Deleted SuccessFully!");
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to delete Workout. Try again later!")
      }
    })
  }

  return (
    query.data && (
      <>
        <section className="space-y-4 pb-24">
          <PageHeader description={format(new Date(query.data.createdAt), "EEEE, MMMM dd, yyyy")} icon={DumbbellIcon} title="Workout Day" />
          <div className="w-full grid grid-cols-2 md:flex gap-3 items-center">
            <InfoCard bold={totalExercises?.toString()} description="Exercises" />
            <InfoCard bold={totalSets?.toString()} description="Total Sets" />
            {validateAuthorization(query.data.user.id, authState?.user) && (
              <Button variant="cool" className="ml-auto w-full col-span-full md:w-auto" onClick={() => setOpenDelete(true)}>
                <TrashIcon className="size-4" />
                Delete
              </Button>
            )}
          </div>

          <div className="my-6">
            {validateAuthorization(query.data.user.id, authState?.user) ? (
              <AddNote note={query.data.note} id={query.data.id} />
            ) : (
              query.data.note ? (
                <div className="border p-4 my-6 text-foreground/80 rounded-xl border-l-primary border-l-3 italic">
                  <p>{query.data.note}</p>
                </div>
              ) : null
            )}
          </div>

          {query.data.exercises.map((workoutExercise, index) => {
            return workoutExercise.id === editMode
              ? <EditMode key={workoutExercise.id} workoutId={query.data.id} index={index} handleMode={handleEditMode} workoutExercise={workoutExercise} />
              : <ExerciseCard key={workoutExercise.id} workoutId={query.data.id} index={index} handleMode={handleEditMode} workoutExercise={workoutExercise} />
          })}

          <div className="w-full border my-6" />
          {addExercisesMode ? (
            <>
              <Button variant="secondary" className="w-full" onClick={handleAddExerciseMode}>
                <XIcon />
                Cancel
              </Button>
              <AddExerciseForm id={query.data.id} handleMode={handleAddExerciseMode} />
            </>
          ) : (
            <Button variant="secondary" className="w-full" onClick={handleAddExerciseMode}>
              <PlusIcon />
              Add Exercises
            </Button>
          )}
        </section>
        <ConfirmDeleteDialog
          onSubmit={handleDelete}
          open={openDelete}
          setOpen={setOpenDelete}
          title="Delete Workout"
          description="Are you sure you want to delete this workout? This action cannot be undone"
        />
      </>
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
