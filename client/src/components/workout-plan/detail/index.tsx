'use client'

import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import { useDeleteRoutine } from "@/service/workout-plan/mutations/use-delete-routine";
import { useGetWorkoutPlanBySlug } from "@/service/workout-plan/queries/use-get-workout-by-slug";
import { WorkoutRoutine } from "@/types/workout-plan";
import { cn, is404 } from "@/utils/common-utils";
import { ArrowLeft, CalendarIcon, DumbbellIcon, LayersIcon, PlusIcon, ScrollText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import PdfModal from "../pdf/pdf-modal";
import RoutineCard from "./routine-card";
import UpdateRoutineForm from "./update-routine-form";
import { Button } from "@/components/ui/button";

const WorkoutPlanDetail = ({ slug }: { slug: string }) => {
  const query = useGetWorkoutPlanBySlug(slug);
  const [editMode, setEditMode] = useState<WorkoutRoutine | undefined>(undefined);

  const deleteMutation = useDeleteRoutine(slug);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<WorkoutRoutine["id"] | undefined>(undefined);

  if (is404(query.error)) {
    notFound();
  }

  if (query.isLoading || query.isError) {
    return <DefaultLoading />
  }

  if (!query.data) return null;

  const totalDays = query.data.routines.length;
  const totalExercises = query.data.routines.reduce((acc, curr) => acc + curr.exercises.length, 0);
  const totalSets = query.data.routines.reduce((acc, curr) => acc + curr.exercises.reduce((acc2, curr2) => acc2 + curr2.desirableSets, 0), 0);

  const handleSubmit = (id: WorkoutRoutine["id"]) => {
    deleteMutation.mutate({ id }, {
      onSuccess: () => toast.success("Routine deleted successfully!"),
      onError: () => toast.error("Failed to delete routine. Try again later!")
    })
  }

  return (
    <>
      <Link href="/workout-plans" className="inline-flex gap-1 text-sm text-[15px] text-foreground/80 hover:text-foreground items-center leading-none">
        <ArrowLeft className="size-4.5 mt-px" />
        Back to Workout Plans
      </Link>
      <PageHeader
        title={query.data.name}
        icon={ScrollText}
        description={`Submitted by: ${query.data.user.username}`}
        titleClassName="text-base md:text-xl lg:text-2xl"
        descriptionClassName="text-sm md:text-base"
        className="items-start"
      />
      <div className="flex flex-col md:flex-row gap-3">
        <LittleCard>
          <CalendarIcon className="size-4 mr-2 text-accent shrink-0" /> {totalDays} days per week
        </LittleCard>
        <LittleCard>
          <DumbbellIcon className="size-4 mr-2 text-accent shrink-0" /> {totalExercises} exercises
        </LittleCard>
        <LittleCard>
          <LayersIcon className="size-4 mr-2 text-accent shrink-0" /> {totalSets} total sets
        </LittleCard>
        <PdfModal workoutPlan={query.data} />
      </div>
      <section className="space-y-6">
        <div className="w-full text-base border border-zind-50/15 p-4 text-foreground/80 bg-card/40 rounded-xl border-l-primary border-l-3 italic mt-5">
          {query.data.description}
        </div>
        <div className={cn("grid md:grid-cols-3 gap-3", editMode && "md:grid-cols-1")}>
          {query.data.routines.map(routine => {
            return routine.id !== editMode?.id ? (
              <RoutineCard
                key={routine.id}
                owner={query.data.user}
                routine={routine}
                setDeleteId={setDeleteId}
                setEditMode={setEditMode}
                setOpenDelete={setOpenDelete}
              />
            ) : (
              <div key={routine.id}>
                <UpdateRoutineForm
                  planSlug={query.data.slug}
                  routine={routine}
                  handleEditMode={() => setEditMode(undefined)}
                />
              </div>
            )
          })}
        </div>
        <div className="flex justify-center mt-12">
          <Button variant="secondary" className="w-full max-w-[992px]">
            <PlusIcon className="size-4" />
            Add Routine
          </Button>
        </div>
      </section>
      {deleteId && (
        <ConfirmDeleteDialog
          onSubmit={() => handleSubmit(deleteId)}
          open={openDelete}
          setOpen={setOpenDelete}
          title="Delete Routine"
          description="Are you sure you want to delete this routine? This action cannot be undone"
        />
      )}
    </>
  )
}

const LittleCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="md:w-[160px] flex items-center justify-center text-xs text-[13px] rounded-md h-[48px] border border-accent/30 bg-accent/10 text-white">
      {children}
    </div>
  )
}

export default WorkoutPlanDetail;
