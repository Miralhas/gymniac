import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const exerciseParamsSchema = z.object({
  q: z.string().catch("").optional(),
  muscleGroup: z.string().catch("").optional(),
  ...zodPagination,
});

export type ExerciseParams = z.infer<typeof exerciseParamsSchema>;