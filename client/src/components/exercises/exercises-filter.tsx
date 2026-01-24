'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nuqsExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { useGetMuscleGroups } from "@/service/muscle-group/query/use-get-muscle-groups";
import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import { DumbbellIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

const ExercisesFilter = () => {
  const [values, setParams] = useQueryStates(nuqsExerciseParams);
  const query = useGetMuscleGroups();

  if (query.isError) return null;

  const handleFilter = (muscle: string) => {
    setParams({ muscle });
  }

  return (
    <Select onValueChange={handleFilter} value={values.muscle === EMPTY_DEFAULT_SELECT ? "" : values.muscle}>
      <SelectTrigger className="w-full md:w-[180px] ml-auto order-1">
        <SelectValue placeholder="Muscle Group" />
      </SelectTrigger>
      {query.isLoading ? (
        <SelectContent position="popper">
          <div className="w-full h-[100px] flex flex-col items-center text-muted-foreground justify-center gap-2.5">
            <DumbbellIcon className="size-8 animate-spin" />
            <p className="text-sm animate-bounce">Loading...</p>
          </div>
        </SelectContent>
      ) : (
        <SelectContent className="h-[300px]" position="popper">
          <SelectItem value={EMPTY_DEFAULT_SELECT}>None</SelectItem>
          <SelectSeparator />
          {query.data?.map(m => (
            <SelectItem key={m.id} value={m.slug}>{m.name}</SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  )
}

export default ExercisesFilter;
