import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const workoutParamsSchema = z.object({
  from: z.iso.datetime().catch("").optional(),
  to: z.iso.datetime().catch("").optional(),
  ...zodPagination,
});

export type WorkoutParams = z.infer<typeof workoutParamsSchema>;