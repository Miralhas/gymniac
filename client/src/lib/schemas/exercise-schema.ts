import { EMPTY_FILTER } from "@/utils/constants";
import * as z from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(1, "Name must be at least 5 characters."),
  description: z.string().min(1, "Description must be at least 5 characters."),
  videoHowTo: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "Must be a valid URL",
  }),
  muscleGroup: z.string("Must be a valid Muscle Group").refine((val) => val !== EMPTY_FILTER, {
      message:
        "Please select a specific Muscle Group.",
    }),
});

export type ExerciseInput = z.infer<typeof exerciseSchema>; 