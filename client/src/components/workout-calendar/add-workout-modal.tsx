'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useWorkoutContext } from "@/contexts/workout-context";

const AddWorkoutModal = () => {
  const { open, setOpen } = useWorkoutContext();
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Workout</DialogTitle>
          <DialogDescription>
            Log your whole workout.
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  )
}

export default AddWorkoutModal;
