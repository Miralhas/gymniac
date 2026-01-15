import { format } from "date-fns";
import { ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  today: Date;
  handleCurrentMonth: (num: number) => void;
  handleReset: () => void;
  currentMonthFirstDay: Date;
  currentMonthLastDay: Date;
}

const CalendarHeader = ({ today, currentMonthFirstDay, currentMonthLastDay, handleCurrentMonth, handleReset }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 p-3 border rounded-none">
      <Button
        size="none"
        variant="pure"
        onClick={handleReset}
        className="w-16 border flex flex-col justify-center items-center transition-all hover:scale-105 duration-200 ease-in-out"
      >
        <div className="w-full bg-foreground/90 py-1 text-black text-xs font-bold text-center">{format(today, "MMM")}</div>
        <div className="w-full text-center py-1.5 border bg-foreground/15 font-semibold">{today.getDate()}</div>
      </Button>

      <div className="flex flex-col items-center md:items-start">
        <p className="ml-2.5 font-medium" onClick={handleReset}>{format(currentMonthFirstDay, "MMMM y")}</p>
        <div className='space-x-0.5 flex items-center'>
          <Button variant="ghost" size="icon-sm" onClick={() => handleCurrentMonth(-1)}><ChevronLeft /></Button>
          <p className="text-muted-foreground text-xs sm:text-sm relative">{format(currentMonthFirstDay, "MMM d, yyyy")} - {format(currentMonthLastDay, "MMM d, yyyy")}</p>
          <Button variant="ghost" size="icon-sm" onClick={() => handleCurrentMonth(1)}><ChevronRight /></Button>
        </div>
      </div>

      <Button asChild variant="cool" className="ml-auto w-full md:w-max">
        <Link href="/workouts/new" className="gap-1 flex items-center">
          <PlusIcon className="mt-px" />
          Add Workout
        </Link>
      </Button>
    </div>
  )
}

export default CalendarHeader;
