'use client'

import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useGetWorkoutByID } from "@/service/workout/queries/use-get-workout-by-id";
import { format } from "date-fns";
import { DumbbellIcon } from "lucide-react";

const WorkoutDetail = ({ id }: { id: number }) => {
  const query = useGetWorkoutByID(id);

  if (query.isLoading || query.isError) {
    return <DefaultLoading />
  }

  const totalSets = query.data?.exercises.reduce((acc, curr) => acc + curr.sets.length, 0);
  const totalExercises = query.data?.exercises.length;

  return (
    query.data && (
      <section className="space-y-4">
        <PageHeader description={format(new Date(query.data.createdAt), "EEEE, MMMM dd, yyyy")} icon={DumbbellIcon} title="Workout Day" />
        <div className="w-full flex gap-3">
          <InfoCard bold={totalExercises?.toString()} description="Exercises" />
          <InfoCard bold={totalSets?.toString()} description="Total Sets" />
        </div>
        {query.data.note ? (
          <div className="border p-4 my-6 text-foreground/80 rounded-xl bg-secondary/25 border-l-primary border-l-3 italic">
            <p>{query.data.note}</p>
          </div>
        ) : null}
        {query.data.exercises.map((workoutExercise, index) => (
          <Card key={workoutExercise.id} className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 text-foreground/90 items-center justify-center rounded-full bg-primary/30 border border-primary/80 text-sm font-bold">
                    {index + 1}
                  </span>
                  <h2 className="text-xl font-bold text-foreground inline-flex flex-col">{workoutExercise.exercise.name}</h2>
                </div>
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent className="p-4">
              <Table className="">
                <TableHeader className="bg-secondary/40">
                  <TableRow>
                    <TableHead className="px-6 py-4">SET</TableHead>
                    <TableHead className="px-6 py-4">WEIGHT</TableHead>
                    <TableHead className="px-6 py-4">REPS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workoutExercise.sets.map((set, setIndex) => (
                    <TableRow key={set.id}>
                      <TableCell className="px-8 py-4 font-bold text-lg">{setIndex + 1}</TableCell>
                      <TableCell className="px-7 py-4 font-bold text-lg">{set.kg} <span className="font-light text-sm text-muted-foreground">reps</span></TableCell>
                      <TableCell className="px-7 py-4 font-bold text-lg">{set.reps} <span className="font-light text-sm text-muted-foreground">reps</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="mt-4">
              <p className="text-sm text-foreground/80"> <span className="font-semibold text-foreground/90">{workoutExercise.sets.length} sets</span> completed</p>
            </CardFooter>
          </Card>
        ))}
      </section>
    )
  )
}

const InfoCard = ({ bold, description }: { bold?: string, description?: string }) => {
  return (
    <div className="flex items-center justify-center px-4 w-full md:max-w-34 min-h-14 border bg-secondary/30 rounded-lg">
      <p className="text-lg"><span className="font-bold text-xl">{bold}</span> <span className="text-foreground/70 text-sm text-[15px] relative bottom-px">{description}</span></p>
    </div>
  )
}

export default WorkoutDetail;
