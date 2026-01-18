"use client"

import { Check, ChevronsUpDown, DumbbellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { useGetExercises } from "@/service/exercise/queries/use-get-exercises"
import { Exercise } from "@/types/exercise"
import { cn } from "@/utils/common-utils"
import { useEffect, useState } from "react"

type Props = {
  setValue: (slug: string) => void;
  isInvalid: boolean;
  value: string;
}

const ExercisesCombobox = ({ setValue, isInvalid, value }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const query = useGetExercises({ size: 2000 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!query.isLoading && query.isSuccess) {
      if (value) {
        // eslint-disable-next-line
        setSelectedExercise(query.data?.results.find((exercise) => exercise.slug === value));
      } else {
        setSelectedExercise(undefined);
      }
    }
  }, [query.isLoading, query.isSuccess, value, query.data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          aria-invalid={isInvalid}
          className="w-full justify-between"
        >
          {selectedExercise
            ? query.data?.results.find((exercise) => exercise.slug === selectedExercise.slug)?.name
            : "Select exercise..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-(--radix-popover-trigger-width) md:w-auto" side="bottom" align={isMobile ? "center" : "start"} avoidCollisions={false}>
        <Command>
          <CommandInput placeholder="Search exercise..." className="h-9" />
          <CommandList className="h-[140px]">
            {(query.isLoading || query.isFetching || query.isPending) ? (
              <div className="w-full h-[140px] flex items-center justify-center">
                <DumbbellIcon className="size-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandGroup>
                  {query.data?.results.map((exercise) => {
                    const isSelected = exercise.slug === selectedExercise?.slug;
                    return (
                      <CommandItem
                        key={exercise.id}
                        value={exercise.slug}
                        className={cn("w-full", isSelected && "text-accent!")}
                        onSelect={() => {
                          if (selectedExercise?.slug === exercise.slug) {
                            setValue("");
                            setSelectedExercise(undefined);
                            return;
                          }
                          setOpen(false);
                          setValue(exercise.slug);
                          setSelectedExercise(exercise);
                        }}
                      >
                        {exercise.name}
                        <Check
                          className={cn("hidden", isSelected && "inline ml-auto text-accent! mt-0.5")}
                        />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
                <CommandEmpty>No exercises found.</CommandEmpty>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ExercisesCombobox;
