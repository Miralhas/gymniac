import { inferParserType, parseAsIndex, parseAsString } from 'nuqs/server';

import * as z from "zod";
import { zodPagination } from "../pagination-schema";

export const exerciseParamsSchema = z.object({
  q: z.string().catch("").optional(),
  muscleGroup: z.string().catch("").optional(),
  ...zodPagination,
});

export const nuqsExerciseParams = {
  q: parseAsString.withDefault("").withOptions({ clearOnDefault: true, }),
  page: parseAsIndex.withDefault(0).withOptions({ clearOnDefault: true, history: "push", scroll: true }),
  muscle: parseAsString.withDefault("").withOptions({ clearOnDefault: true, })
}

export type ExerciseParams = z.infer<typeof exerciseParamsSchema>;
export type NuqsExerciseParams = inferParserType<typeof nuqsExerciseParams>;