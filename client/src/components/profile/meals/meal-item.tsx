import { Meal } from "@/types/meal";
import { formatFullDateBR } from "@/utils/date-utils";
import { FlameIcon } from "lucide-react";
import { MACRO_CONFIG } from "./macro-config";
import MacroBar from "./macro-bar";

const MealItem = ({ meal }: { meal: Meal }) => {
  const totalGrams = meal.macros.reduce((sum, m) => sum + m.grams, 0)

  return (
    <div className="space-y-1 rounded-md bg-card/60 border border-zinc-50/10 p-4">
      <div className="flex items-baseline md:items-start gap-2">
        <p className="font-semibold flex-1">{meal.name}</p>
        <span className="inline-flex gap-1 text-xs md:text-sm items-center text-accent relative top-0.5">
          <FlameIcon className="size-3 shrink-0" strokeWidth={3} />
          {meal.kcal} kcal
        </span>
      </div>

      <p className="text-muted-foreground text-xs">
        {formatFullDateBR(meal.createdAt)}
      </p>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted mt-2">
        <MacroBar macros={meal.macros} totalGrams={totalGrams} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 mt-3">
        {meal.macros.map((macro) => {
          const config = MACRO_CONFIG[macro.nutrient]
          return (
            <div className="flex gap-1.5 items-center" key={macro.id}>
              <div className="rounded-full size-2" style={{ backgroundColor: config.color }} />
              <config.icon className="size-3.5" style={{ color: config.textColor }} />
              <p className="text-xs text-foreground/80">{macro.grams}g{" "}{config.label}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MealItem;
