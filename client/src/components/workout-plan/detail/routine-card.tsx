'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthContext } from "@/contexts/auth-context";
import { UserSummary } from "@/types/auth";
import { WorkoutRoutine } from "@/types/workout-plan";
import { capitalize } from "@/utils/string-utils";
import { validateAuthorization } from "@/utils/user-utils";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  routine: WorkoutRoutine;
  owner: UserSummary
  setEditMode: (routine: WorkoutRoutine) => void;
  setOpenDelete: (bool: boolean) => void;
  setDeleteId: (id: WorkoutRoutine["id"]) => void;
}

const RoutineCard = ({ routine, owner, setDeleteId, setEditMode, setOpenDelete }: Props) => {
  const { authState } = useAuthContext();

  return (
    <Card key={routine.id} className="col-span-1 pt-3 border border-accent/25 rounded-md gap-y-3">
      <CardHeader className="text-center space-y-0.5 relative">
        <p className="text-accent/90 text-sm text-[13px] font-semibold">{capitalize(routine.desirableDayOfWeek)}</p>
        <CardTitle>{routine.name}</CardTitle>
        {validateAuthorization(owner.id, authState?.user) && (
          <div className="flex absolute top-1 right-3 gap-2">
            <Button
              variant="pure"
              size="none"
              className="opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setEditMode(routine)}
            >
              <EditIcon className="size-3.5" />
            </Button>
            <Button variant="pure" size="none" className="opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => {
                setDeleteId(routine.id)
                setOpenDelete(true)
              }}
            >
              <TrashIcon className="size-3.5" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>{capitalize(routine.desirableDayOfWeek)} Exercises</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Exercises</TableHead>
              <TableHead className="text-right pe-3">
                <Tooltip delayDuration={400}>
                  <TooltipTrigger>SxR</TooltipTrigger>
                  <TooltipContent>
                    <p>Sets x Repetitions</p>
                  </TooltipContent>
                </Tooltip>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routine.exercises.map((exercise) => (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium text-sm text-foreground/80 hover:text-foreground/90">
                  <Link href={`/exercises/${exercise.exercise.slug}`}>{exercise.exercise.name}</Link>
                </TableCell>
                <TableCell className="font-medium text-sm text-foreground/80 hover:text-foreground/90 text-right">
                  {exercise.desirableSets}x{exercise.desirableReps}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RoutineCard;
