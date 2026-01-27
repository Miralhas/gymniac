import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
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
import { useDeleteWorkoutExerciseById } from "@/service/workout/mutations/use-delete-workout-exercise-by-id";
import { Workout, WorkoutExercise } from "@/types/workout";
import { cn } from "@/utils/common-utils";
import { EditIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  index: number;
  workoutExercise: WorkoutExercise;
  handleMode: (id: WorkoutExercise["id"] | undefined) => void;
  workoutId: Workout["id"];
}

const ExerciseCard = ({ handleMode, index, workoutExercise, workoutId }: Props) => {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteWorkoutExerciseById({ workoutId, workoutExerciseId: workoutExercise.id });

  const handleSubmit = () => {
    mutation.mutate(undefined, {
      onSuccess: () => toast.success("Workout Exercise deleted successfully!"),
      onError: () => toast.error("Failed to delete workout exercise. Try again later!")
    })
  }

  const { isPending } = mutation;

  return (
    <>
      <Card className={cn("gap-0", isPending && "animate-pulse")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 text-foreground/90 items-center justify-center rounded-full bg-primary/30 border border-primary/80 text-sm font-bold">
                {index + 1}
              </span>
              <h2 className="text-xl font-bold text-foreground inline-flex flex-col">{workoutExercise.exercise.name}</h2>
            </div>
          </CardTitle>
          <CardAction>
            <Button
              variant="ghost"
              disabled={isPending}
              size="icon"
              className="text-foreground/70 hover:text-foreground"
              onClick={() => handleMode(workoutExercise.id)}
            >
              <EditIcon />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              className="text-foreground/70 hover:text-foreground"
              onClick={() => setOpen(true)}
            >
              <Trash2 />
            </Button>
          </CardAction>
        </CardHeader >
        <CardContent className="p-4">
          <Table className="">
            <TableHeader className="bg-secondary/40">
              <TableRow>
                <TableHead className="px-3 md:px-6 py-4 font-semibold">SET</TableHead>
                <TableHead className="px-3 md:px-6 py-4 font-semibold">WEIGHT</TableHead>
                <TableHead className="px-3 md:px-6 py-4 font-semibold">REPS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workoutExercise.sets.map((set, setIndex) => (
                <TableRow key={set.id}>
                  <TableCell className="px-5 md:px-8 py-4 font-bold md:text-lg">{setIndex + 1}</TableCell>
                  <TableCell className="px-4 md:px-7 py-4 font-bold md:text-lg">{set.kg} <span className="font-light text-sm text-muted-foreground">Kg</span></TableCell>
                  <TableCell className="px-4 md:px-7 py-4 font-bold md:text-lg">{set.reps} <span className="font-light text-sm text-muted-foreground">reps</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="mt-4">
          <p className="text-sm text-foreground/80"> <span className="font-semibold text-foreground/90">{workoutExercise.sets.length} sets</span> completed</p>
        </CardFooter>
      </Card >
      <ConfirmDeleteDialog
        onSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
        description="This action cannot be undone. This will permanently delete the exercise from your workout."
        title="Are you absolutely sure?"
      />
    </>
  )
}

export default ExerciseCard;
