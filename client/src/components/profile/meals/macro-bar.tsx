import { Macronutrient } from "@/types/meal";
import { MACRO_CONFIG } from "./macro-config";

const MacroBar = ({ macros, totalGrams }: { macros: Macronutrient[]; totalGrams: number; }) => {
  return (
    <>
      {macros.map((macro) => {
        const percentage = (macro.grams / totalGrams) * 100
        const config = MACRO_CONFIG[macro.nutrient]
        return (
          <div
            key={macro.id}
            className='transition-all opacity-70'
            style={{ width: `${percentage}%`, backgroundColor: config.color }}
          />
        )
      })}
    </>
  )
}

export default MacroBar;
