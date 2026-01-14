import * as z from "zod"
import { exerciseSchema } from "./exercise-schema"

export const workoutSchema = z.object({
  note: z.string(),
  exercises: z.array(exerciseSchema).min(1, { error: "Must have at least one exercise" })
});

export type WorkoutInput = z.infer<typeof workoutSchema>;