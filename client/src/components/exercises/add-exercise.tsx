'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Exercise } from "@/types/exercise";
import { PropsWithChildren, useState } from "react";
import ExerciseForm from "./exercise-form";

type PostProps = {
  mode: "POST";
  className?: string;
}

type PutProps = {
  mode: "PUT",
  className?: string;
  exercise: Exercise;
}

type Props =
  | PostProps
  | PutProps;

const AddExerciseModal = (props: PropsWithChildren<Props>) => {
  const { children, mode } = props;
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpen = () => setOpen(prev => !prev);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="w-full" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{mode === "POST" ? "Add Exercise" : "Update Exercise"}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto max-h-[400px]">
            {mode === "PUT" ? (
              <ExerciseForm mode={mode} handleOpen={handleOpen} exercise={props.exercise} />
            ) : (
              <ExerciseForm mode={mode} handleOpen={handleOpen} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "POST" ? "Add Exercise" : "Update Exercise"}</DialogTitle>
        </DialogHeader>
        {mode === "PUT" ? (
          <ExerciseForm mode={mode} handleOpen={handleOpen} exercise={props.exercise} />
        ) : (
          <ExerciseForm mode={mode} handleOpen={handleOpen} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddExerciseModal;
