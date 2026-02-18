import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const mealsParamsSchema = z.object({
  from: z.iso.datetime().catch("").optional(),
  ...zodPagination,
});

export type MealsParams = z.infer<typeof mealsParamsSchema>;