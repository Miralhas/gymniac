'use client'

import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetWorkoutPlanBySlug } from "@/service/workout-plan/queries/use-get-workout-by-slug";
import { is404 } from "@/utils/common-utils";
import { capitalize } from "@/utils/string-utils";
import { ArrowLeft, CalendarIcon, DumbbellIcon, ScrollText, TargetIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DAYS_OF_WEEK } from "@/utils/date-utils";

const WorkoutPlanDetail = ({ slug }: { slug: string }) => {
  const query = useGetWorkoutPlanBySlug(slug);

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

  return (
    <>
      <Link href="/workout-plans" className="inline-flex gap-1 text-sm text-[15px] text-foreground/80 hover:text-foreground items-center leading-none">
        <ArrowLeft className="size-4.5 mt-px" />
        Back to Workout Plans
      </Link>
      <PageHeader
        title={query.data.name}
        icon={ScrollText}
        description={query.data.description ?? ""}
        titleClassName="text-base md:text-xl lg:text-2xl"
        descriptionClassName="text-sm md:text-base"
        className="items-start"
      />
      <div className="flex gap-3">
        <div className="w-[160px] flex items-center justify-center text-xs text-[13px] rounded-md h-[48px] border border-accent/30 bg-accent/10 text-white">
          <CalendarIcon className="size-4 mr-2 text-accent" /> {totalDays} days per week
        </div>
        <div className="w-[160px] flex items-center justify-center text-xs text-[13px] rounded-md h-[48px] border border-accent/30 bg-accent/10 text-white">
          <DumbbellIcon className="size-4 mr-2 text-accent" /> {totalExercises} exercises
        </div>
        <div className="w-[160px] flex items-center justify-center text-xs text-[13px] rounded-md h-[48px] border border-accent/30 bg-accent/10 text-white">
          <TargetIcon className="size-4 mr-2 text-accent" /> {totalDays} total sets
        </div>
      </div>
      <section className="space-y-4 mt-6">

        <div className="grid md:grid-cols-3 gap-3">
          {query.data.routines.map(routine => (
            <Card key={routine.id} className="col-span-1 pt-3 border border-accent/25 rounded-md gap-y-3">
              <CardHeader className="text-center space-y-0.5">
                <p className="text-accent/90 text-sm text-[13px] font-semibold">{capitalize(routine.desirableDayOfWeek)}</p>
                <CardTitle>{routine.name}</CardTitle>
                {/* <CardDescription>{routine.note}</CardDescription> */}
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableCaption>{capitalize(routine.desirableDayOfWeek)} Exercises</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Exercises</TableHead>
                      <TableHead className="text-right pe-3">
                        <Tooltip delayDuration={400}>
                          <TooltipTrigger>SxR</TooltipTrigger>
                          <TooltipContent>
                            <p>Sets x Repetitions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routine.exercises.map((exercise, index) => (
                      <TableRow key={exercise.id}>
                        <TableCell className="font-medium text-sm text-foreground/80 hover:text-foreground/90">
                          <Link href={`/exercises/${exercise.exercise.slug}`}>{exercise.exercise.name}</Link>
                        </TableCell>
                        <TableCell className="font-medium text-sm text-foreground/80 hover:text-foreground/90 text-right">
                          {exercise.desirableSets}x{exercise.desirableReps}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default WorkoutPlanDetail;
