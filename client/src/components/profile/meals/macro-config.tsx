import { BeefIcon, CookingPot, DropletsIcon, WheatIcon, Zap } from "lucide-react";

export const MACRO_CONFIG = {
  PROTEIN: {
    label: "Protein",
    color: "#10B981",
    textColor: "#34D399",
    icon: BeefIcon,
    suffix: "g"
  },
  FAT: {
    label: "Fat",
    color: "#F59E0B",
    textColor: "#FBBF24",
    icon: DropletsIcon,
    suffix: "g"
  },
  CARBOHYDRATE: {
    label: "Carbs",
    color: "#0EA5E9",
    textColor: "#38BDF8",
    icon: WheatIcon,
    suffix: "g"
  },
  KCAL: {
    label: "Kcal",
    color: "#EF4444",
    textColor: "#F87171",
    icon: Zap,
    suffix: " Kcal"
  },
  MEALS: {
    label: "Meals",
    color: "#64748B",
    textColor: "#94A3B8",
    icon: CookingPot,
    suffix: " Meal(s)"
  }
} as const