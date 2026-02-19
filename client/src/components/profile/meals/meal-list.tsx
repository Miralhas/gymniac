'use client'

import { defaultMealsParams, useGetUserMeals } from "@/service/meals/queries/use-get-user-meals";
import { startOfToday } from "date-fns";
import { HamburgerIcon, PlusIcon, UtensilsCrossedIcon } from "lucide-react";
import { useState } from "react";
import MealFilter from "./meal-filter";
import MealItem from "./meal-item";
import MealModal from "./meal-modal";
import { Button } from "@/components/ui/button";

const MealList = ({ accessToken }: { accessToken: string }) => {
  const [date, setDate] = useState<Date | undefined>(() => startOfToday());
  const query = useGetUserMeals(accessToken, { ...defaultMealsParams, from: date?.toISOString() });

  if (query.isLoading) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center">
        <HamburgerIcon className="text-muted-foreground size-12 animate-spin" />
      </div>
    );
  }

  if (!query.data?.results.length) {
    return (
      <>
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <MealModal mode="POST">
            <Button variant="cool" className="h-8">
              <PlusIcon className="size-4" />
              Add Meal
            </Button>
          </MealModal>
          <MealFilter date={date} setDate={setDate} />
        </div>
        <div className="grid min-h-[30vh] place-items-center bg-secondary/20 border">
          <div className="text-center">
            <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
              <UtensilsCrossedIcon className="size-9 text-accent/90" />
            </div>
            <p className="text-zinc-300 font-semibold text-lg md:text-xl">No meals found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <MealModal mode="POST">
          <Button variant="cool" className="h-8">
            <PlusIcon className="size-4" />
            Add Meal
          </Button>
        </MealModal>
        <MealFilter date={date} setDate={setDate} />
      </div>
      {query.data.results.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </div>
  )
}

export default MealList;
