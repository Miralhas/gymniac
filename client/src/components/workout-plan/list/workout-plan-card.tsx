import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { WorkoutPlanSummary } from "@/types/workout-plan";
import { cn } from "@/utils/common-utils";
import { DAYS_OF_WEEK } from "@/utils/date-utils";
import { capitalize } from "@/utils/string-utils";
import Link from "next/link";
import { useMemo } from "react";

const getRestDays = (workoutPlan: WorkoutPlanSummary) => {
  const workoutDays = workoutPlan.routines.map(r => r.desirableDayOfWeek);
  return DAYS_OF_WEEK.filter(day => !workoutDays.includes(day));
};

const WorkoutPlanCard = ({ workoutPlan }: { workoutPlan: WorkoutPlanSummary }) => {
  const restDays = useMemo(() => {
    return getRestDays(workoutPlan);
  }, [workoutPlan]);

  const totalDays = workoutPlan.routines.length;

  return (
    <Link href={`/workout-plans/${workoutPlan.slug}`} className="transition-transform hover:-translate-y-0.75 hover:translate-x-0.75 ease-in-out duration-200">
      <Card className="p-2 pt-4 border border-zinc-50/15 backdrop-blur-3xl ring-0 pb-4 group bg-card/50">
        <CardHeader className="px-2">
          <div className="grid grid-cols-[1fr_0.3fr] gap-1 w-full">
            <CardTitle className="line-clamp-1">{workoutPlan.name}</CardTitle>
            <Badge variant="cool" className="justify-self-end">{totalDays}x per week</Badge>
            <p className="text-foreground/60 line-clamp-1">{workoutPlan.description}</p>
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <CardDescription className="line-clamp-2 text-foreground/80 text-sm flex flex-col gap-3 h-40">
            <div className="grid grid-cols-7 gap-1">
              {DAYS_OF_WEEK.map((day, i) => {
                const isRestDay = restDays.includes(day);
                return (
                  <div key={i} className="flex flex-col gap-1 items-center justify-center">
                    <span className="font-medium text-foreground/60 text-[11px] tracking-tighter text-xs leading-none">{capitalize(day.slice(0, 3))}</span>
                    <div className={cn("border rounded-sm flex items-center justify-center py-0.75 w-full", !isRestDay && "bg-accent/15 border-accent/30")}>
                      <span className="text-xs text-[10px] leading-none font-bold">{isRestDay ? "R" : "W"}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-1">
              {workoutPlan.routines.map(r => (
                <div key={r.id} className="px-2 text-xs border border-zinc-50/15 bg-secondary/70 rounded-md py-0.5 text-foreground/90">
                  <span className="font-light text-[11px] mr-1">{capitalize(r.desirableDayOfWeek.slice(0, 3))}:</span>{r.name}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs font-semibold inline-block mt-auto"><span className="font-light text-[11px]">Added by:</span> {workoutPlan.user.username}</p>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default WorkoutPlanCard;
