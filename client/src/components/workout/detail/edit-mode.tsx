import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Workout, WorkoutExercise } from "@/types/workout";
import { XIcon } from "lucide-react";
import UpdateExerciseForm from "../exercise-form/update-form";

type Props = {
  handleMode: (id: WorkoutExercise["id"] | undefined) => void;
  workoutExercise: WorkoutExercise;
  workoutId: Workout["id"]
  index: number;
}

const EditMode = ({ handleMode, workoutExercise, index, workoutId }: Props) => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 text-foreground/90 items-center justify-center rounded-full bg-primary/30 border border-primary/80 text-sm font-bold">
              {index + 1}
            </span>
            <h2 className="text-xl font-bold text-foreground inline-flex flex-col">Update - {workoutExercise.exercise.name}</h2>
          </div>
        </CardTitle >
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground"
            onClick={() => handleMode(undefined)}
          >
            <XIcon className="size-6" />
          </Button>
        </CardAction>
      </CardHeader >
      <CardContent className="p-4">
        <UpdateExerciseForm
          workoutId={workoutId}
          workoutExerciseId={workoutExercise.id}
          defaultValues={{ sets: workoutExercise.sets, slug: workoutExercise.exercise.slug }}
          handleMode={handleMode}
        />
      </CardContent>
      <CardFooter className="mt-4">
        <p className="text-sm text-foreground/80"> <span className="font-semibold text-foreground/90">{workoutExercise.sets.length} sets</span> completed</p>
      </CardFooter>
    </Card>
  )
}

export default EditMode;
