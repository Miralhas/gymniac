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

export type DailyMacros = {
  meals: number;
  kcal: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}