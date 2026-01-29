import * as z from "zod";
import { workoutExerciseSchema } from "./workout-exercise-schema";

export const workoutSchema = z.object({
  note: z.string(),
  exercises: z.array(workoutExerciseSchema).min(1, { error: "Must have at least one exercise" }),
  createdAt: z.iso.datetime({ error: "Must have a Workout Date" })
});

export type WorkoutInput = z.infer<typeof workoutSchema>;