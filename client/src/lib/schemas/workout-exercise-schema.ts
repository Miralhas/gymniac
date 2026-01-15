import * as z from "zod";

export const setSchema = z.object({
  reps: z.number("Reps must be a number").positive("Reps must be a positive number").int("Reps must be an integer number"),
  kg: z.number("Weight must be a number").positive("Weight must be a positive number"),
});

export const workoutExerciseSchema = z.object({
  slug: z
    .string("Must be a valid exercise")
    .min(1, { message: "Exercise is required" }),
  sets: z.array(setSchema).min(1, { error: "Must have at least one set" })
});

export const workoutExerciseSchemaArray = z.object({
  exercises: z.array(workoutExerciseSchema).min(1, "Must have at least one exercise")
})

export type WorkoutExerciseArrayInput = z.infer<typeof workoutExerciseSchemaArray>;
export type SetInput = z.infer<typeof setSchema>;
export type WorkoutExerciseInput = z.infer<typeof workoutExerciseSchema>;