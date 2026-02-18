export const NUTRIENTS = ["PROTEIN", "FAT", "CARBOHYDRATE"] as const;

export type Macronutrient = {
  id: number;
  nutrient: typeof NUTRIENTS[number];
  grams: number;
}

export type Meal = {
  id: number;
  name: string;
  kcal: number;
  macros: Macronutrient[];
  createdAt: string;
}