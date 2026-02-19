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
import { Meal } from "@/types/meal";
import { PropsWithChildren, useState } from "react";
import MealForm from "./meal-form";

type PostProps = {
  mode: "POST";
}

type PutProps = {
  mode: "PUT",
  meal: Meal;
}

type Props =
  | PostProps
  | PutProps;

const MealModal = (props: PropsWithChildren<Props>) => {
  const { children, mode } = props;
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile();

  const handleOpen = () => setOpen(prev => !prev);

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{mode === "POST" ? "Add Meal" : "Update Meal"}</DialogTitle>
          </DialogHeader>
          {mode === "PUT" ? (
            <MealForm meal={props.meal} handleOpen={handleOpen} mode="PUT" />
          ) : (
            <MealForm mode="POST" handleOpen={handleOpen} />
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="text-left">
          <DrawerTitle>{mode === "POST" ? "Add Meal" : "Update Meal"}</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto p-3">
          {mode === "PUT" ? (
            <MealForm meal={props.meal} handleOpen={handleOpen} mode="PUT" />
          ) : (
            <MealForm mode="POST" handleOpen={handleOpen} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MealModal;
