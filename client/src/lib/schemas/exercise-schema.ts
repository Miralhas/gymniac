import * as z from "zod";

export const setSchema = z.object({
  reps: z.number("Reps must be a number").positive("Reps must be a positive number").int("Reps must be an integer number"),
  kg: z.number("Weight must be a number").positive("Weight must be a positive number"),
});

export const exerciseSchema = z.object({
  slug: z
    .string("Must be a valid exercise")
    .min(1, { message: "Exercise is required" }),
  sets: z.array(setSchema).min(1, { error: "Must have at least one set" })
});

export type SetInput = z.infer<typeof setSchema>;
export type ExerciseInput = z.infer<typeof exerciseSchema>;