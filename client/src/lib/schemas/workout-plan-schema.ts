import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import * as z from "zod";

export const routineExerciseSchema = z.object({
  slug: z
    .string("Must be a valid exercise")
    .min(1, { message: "Exercise is required" }),

  desirableSets: z.number("Sets must be a number")
    .positive("Sets must be a positive number")
    .int("Sets must be an integer number"),

  desirableReps: z.number("Reps must be a number")
    .positive("Reps must be a positive number")
    .int("Reps must be an integer number"),
});

export const workoutRoutineSchema = z.object({
  name: z.string("Routine Day must have a name").min(1, "Routine Day must have a name"),
  desirableDayOfWeek: z.string("Must have a desirable day of the week").refine((val) => val !== EMPTY_DEFAULT_SELECT, {
    message:
      "Please select a specific Day of the Week.",
  }),
  exercises: z.array(routineExerciseSchema).min(1, { error: "Must have at least one exercise" })
});

export const workoutPlanSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" }),
  description: z.string().optional(),
  routines: z.array(workoutRoutineSchema).min(1, { error: "Must have at least one day" })
});

export type WorkoutPlanInput = z.infer<typeof workoutPlanSchema>;