import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Meal } from "@/types/meal";
import { formatFullDateBR } from "@/utils/date-utils";
import { EditIcon, EllipsisIcon, FlameIcon, TrashIcon } from "lucide-react";
import MacroBar from "./macro-bar";
import { MACRO_CONFIG } from "./macro-config";
import { useState } from "react";
import { useDeleteMealById } from "@/service/meals/mutations/use-delete-meal-by-id";
import { toast } from "sonner";
import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import MealModal from "./meal-modal";

const MealItem = ({ meal, handleDateReset }: { meal: Meal; handleDateReset: () => void; }) => {
  const totalGrams = meal.macros.reduce((sum, m) => sum + m.grams, 0);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteMutation = useDeleteMealById();

  const onDelete = () => {
    deleteMutation.mutate(meal.id, {
      onSuccess: () => toast.success("Meal deleted successfully!"),
      onError: () => toast.error("Failed to delete meal! Try again later.")
    })
  }

  return (
    <>
      <div className="space-y-1 rounded-md bg-card/60 border border-zinc-50/10 py-3 px-4">
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
        <div className="w-full mt-3 flex">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="pure" size="none" className="text-foreground/80 hover:text-foreground transition-colors ease-in-out">
                <EllipsisIcon className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="bg-background border border-zinc-50/15 flex flex-col max-w-[150px] py-3 px-3 gap-2.5"
            >
              <MealModal meal={meal} mode="PUT" handleDateReset={handleDateReset}>
                <Button
                  className="gap-2 items-center justify-start text-foreground rounded-xs hover:opacity-80"
                  variant="pure"
                  size="none"
                >
                  <EditIcon className="size-4" />
                  <span className="text-xs">Edit Meal</span>
                </Button>
              </MealModal>
              <Separator className="bg-zinc-50/20" />
              <Button
                className="gap-2 items-center justify-start text-foreground rounded-xs hover:opacity-80"
                variant="pure"
                size="none"
                onClick={() => setOpenDelete(true)}
              >
                <TrashIcon className="size-4" />
                <span className="text-xs">Delete Meal</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ConfirmDeleteDialog
        onSubmit={() => onDelete()}
        open={openDelete}
        setOpen={setOpenDelete}
        description="This action cannot be undone. This will permanently delete the meal."
        title={`Delete Meal`}
      />
    </>
  )
}

export default MealItem;
