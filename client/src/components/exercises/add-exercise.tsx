'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import ExerciseForm from "./exercise-form";

const AddExerciseModal = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="w-full" asChild>
          <Button variant="cool" className="order-0 md:order-3 w-full">
            <PlusIcon className="size-4 text-white" strokeWidth={3} />
            Add Exercise
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add exercise</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto max-h-[400px]">
            <ExerciseForm />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="cool" className="order-0 md:order-3">
          <PlusIcon className="size-4 text-white" strokeWidth={3} />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <ExerciseForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddExerciseModal;
