import { cn } from "@/utils/common-utils";
import {
  format,
  isFuture,
  isSameMonth,
  isToday
} from 'date-fns';
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  calendarDays: Date[];
  today: Date;
}

const GridDays = ({ calendarDays, today }: Props) => {
  return (
    <>
      {calendarDays.map((day, index) => {
      const isMuted = (isFuture(day) || !isSameMonth(day, today));
        return (
          <Button
            variant="pure"
            disabled={isFuture(day)}
            size="none"
            key={index}
            className={cn("rounded-none group cursor-pointer hover:bg-primary/15 transition-colors duration-50 ease-in hover:border-primary/30 min-h-20 lg:min-h-40 relative border border-zinc-50/10", isFuture(day) && "pointer-events-none")}
          >
            <span className={cn(
              `absolute top-0 left-0 text-foreground text-xs md:text-sm m-1 z-50`,
              isToday(day) && "text-accent",
            isMuted && "text-muted-foreground/60",
            )}>
              {format(day, "d")}
            </span>
            <div className="opacity-0 flex group-hover:opacity-100 absolute inset-0 items-center justify-center transition-opacity ease-in-out duration-200">
              <div className="px-2.5 py-1.5 text-xs border border-primary/90 rounded-md text-foreground/85 flex gap-1 items-center justify-center">
                <PlusIcon className="size-3 md:size-4" />
                <span className="sr-only md:not-sr-only">Add Workout</span>
              </div>
            </div>
          </Button>
        )
      })}
    </>
  )
}

export default GridDays;
