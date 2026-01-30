import { useAuthContext } from "@/contexts/auth-context";
import { useGetUserWorkouts } from "@/service/workout/queries/use-get-user-workouts";
import { cn } from "@/utils/common-utils";
import {
  format,
  isFuture,
  isSameDay,
  isSameMonth,
  isToday
} from 'date-fns';
import { ArrowUpRight, CheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthenticatedButton from "../ui/authenticated-button";
import WorkoutModal from "./workout-modal";

type Props = {
  calendarDays: Date[];
  today: Date;
}

const GridDays = ({ calendarDays, today }: Props) => {
  const [open, setOpen] = useState(false);

  const { authState } = useAuthContext();
  const query = useGetUserWorkouts(authState?.user);


  return (
    <>
      {calendarDays.map((day, index) => {
        const isMuted = (isFuture(day) || !isSameMonth(day, today));
        const workoutSummary = query.data?.results.find(w => isSameDay(new Date(w.createdAt), day));

        return workoutSummary ? (
          <Link key={index} href={`/workouts/${workoutSummary.uuidKey}`}
            className={cn("rounded-none group cursor-pointer min-h-20 lg:min-h-40 relative border bg-accent/15 flex items-center justify-center border-accent/70")}
          >
            <span className={cn(
              `absolute top-0 left-0 text-foreground text-xs md:text-sm m-1 z-50`,
              isToday(day) && "text-accent",
              isMuted && "text-muted-foreground/60",
            )}>
              {format(day, "d")}
            </span>
            <div className="size-6size-12 rounded-full flex items-center justify-center bg-accent/10 border border-accent group-hover:opacity-0">
              <CheckIcon className="size-4 md:size-8 text-accent" />
            </div>
            <div className="opacity-0 flex group-hover:opacity-100 absolute inset-0 items-center justify-center transition-opacity ease-in-out duration-200">
              <div className="px-2.5 py-1.5 text-xs border border-primary/90 rounded-md text-foreground/85 flex gap-1 items-center justify-center">
                <ArrowUpRight className="size-3 md:size-4" />
                <span className="sr-only md:not-sr-only">Workout Log</span>
              </div>
            </div>
          </Link>
        ) : (
          <AuthenticatedButton
            asChild
            size="none"
            key={index}
            variant="pure"
            disabled={isFuture(day)}
            className={cn("rounded-none group cursor-pointer hover:bg-accent/15 transition-colors duration-50 ease-in hover:border-accent/70 min-h-20 lg:min-h-40 relative border border-zinc-50/10", isFuture(day) && "pointer-events-none", query.isLoading && "animate-pulse")}
          >
            <Link href={`/workouts/new?date=${day.toISOString()}`}>
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
            </Link>
          </AuthenticatedButton>
        )
      })}
      <WorkoutModal open={open} setOpen={setOpen} />
    </>
  )
}

export default GridDays;
