"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Weight } from "@/types/weight"
import { PropsWithChildren, useState } from "react"
import AddWeightForm from "./add-weight-form"

type PostProps = {
  mode: "POST";
  className?: string;
}

type PutProps = {
  mode: "PUT",
  className?: string;
  weight: Weight;
}

type Props =
  | PostProps
  | PutProps;

const AddWeight = (props: PropsWithChildren<Props>) => {
  const { children, mode } = props;
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{mode === "POST" ? "Add Weight" : "Update Weight"}</DialogTitle>
          </DialogHeader>

          {mode === "PUT" ? (
            <AddWeightForm weight={props.weight} setOpen={setOpen} mode="PUT" />
          ) : (
            <AddWeightForm mode="POST" setOpen={setOpen} />
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
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{mode === "POST" ? "Add Weight" : "Update Weight"}</DrawerTitle>
        </DrawerHeader>

        {mode === "PUT" ? (
          <AddWeightForm weight={props.weight} setOpen={setOpen} mode="PUT" />
        ) : (
          <AddWeightForm mode="POST" setOpen={setOpen} />
        )}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddWeight;