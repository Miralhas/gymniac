import { BeefIcon, DropletsIcon, WheatIcon } from "lucide-react";

export const MACRO_CONFIG = {
  PROTEIN: {
    label: "Protein",
    color: "#10B981",
    textColor: "#34D399",
    icon: BeefIcon,
  },
  FAT: {
    label: "Fat",
    color: "#F59E0B",
    textColor: "#FBBF24",
    icon: DropletsIcon,
  },
  CARBOHYDRATE: {
    label: "Carbs",
    color: "#0EA5E9",
    textColor: "#38BDF8",
    icon: WheatIcon,
  },
} as const