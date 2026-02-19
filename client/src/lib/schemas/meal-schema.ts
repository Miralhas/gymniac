import { NUTRIENTS } from "@/types/meal";
import * as z from "zod";

export const macronutrientSchema = z.object({
  nutrient: z.enum(NUTRIENTS, {error: "Must be a valid nutrient"}),
  grams: z.number().positive({ error: "Must be a positive number" })
})

export const mealSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  kcal: z.number().positive({ error: "Must be a positive number" }),
  macros: z.array(macronutrientSchema).min(1, { error: "Must have at least one macronutrient" }),
});

export type MacronutrientInput = z.infer<typeof macronutrientSchema>;
export type MealInput = z.infer<typeof mealSchema>;