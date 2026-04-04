'use client'

import GenericPagination from "@/components/generic-pagination";
import { Button } from "@/components/ui/button";
import { nuqsPaginationParams } from "@/lib/schemas/pagination-schema";
import { defaultMealsParams, useGetUserMeals } from "@/service/meals/queries/use-get-user-meals";
import { format } from "date-fns";
import { DumbbellIcon, PlusIcon, UtensilsCrossedIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useState } from "react";
import DailyMacros from "./daily-macros";
import MealFilter from "./meal-filter";
import MealItem from "./meal-item";
import MealModal from "./meal-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const MealList = ({ accessToken }: { accessToken: string }) => {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  const [params, setParams] = useQueryStates(nuqsPaginationParams);
  const formattedDate = date ? format(date, "yyyy-MM-dd") : undefined;
  const query = useGetUserMeals(accessToken, { ...defaultMealsParams, from: formattedDate, page: params.page });

  const handleDateReset = () => setDate(new Date());

  if (query.isLoading) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center">
        <DumbbellIcon className="text-muted-foreground size-12 animate-spin" />
      </div>
    );
  }

  if (!query.data?.results.length) {
    return (
      <>
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <AddMealModalButton handleDateReset={handleDateReset} />
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
      {date && (
        <div className="space-y-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer justify-start items-center gap-1">
                <p className="text-foreground/90 text-sm text-[13px]">Macros <span className="text-muted-foreground">({date?.toLocaleDateString()})</span></p>
              </AccordionTrigger>
              <AccordionContent className="h-auto">
                <DailyMacros from={formattedDate!} accessToken={accessToken} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <AddMealModalButton handleDateReset={handleDateReset} />
        <MealFilter date={date} setDate={setDate} />
      </div>
      {query.data.results.map(meal => (
        <MealItem key={meal.id} meal={meal} handleDateReset={handleDateReset} />
      ))}
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination
          query={query.data}
          handlePage={(page) => setParams({ page })}
          className="mt-6"
        />
      ) : null}
    </div>
  )
}

const AddMealModalButton = ({ handleDateReset }: { handleDateReset: () => void; }) => {
  return (
    <MealModal mode="POST" handleDateReset={handleDateReset} >
      <Button variant="cool" className="h-8">
        <PlusIcon className="size-4" />
        Add Meal
      </Button>
    </MealModal>
  )
}

export default MealList;
