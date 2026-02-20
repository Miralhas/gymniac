import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const mealsParamsSchema = z.object({
  from: z.string().catch("").optional(),
  zoneId: z.string().catch("").optional(),
  ...zodPagination,
});

export type MealsParams = z.infer<typeof mealsParamsSchema>;
export type DailyMacroParams = Pick<Required<MealsParams>, "from" | "zoneId">;