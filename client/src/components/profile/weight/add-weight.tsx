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
import { cn } from "@/utils/common-utils"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import AddWeightForm from "./add-weight-form"

const AddWeight = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="cool" size="sm" className={cn("rounded-sm", className)}>
            <PlusIcon className="size-3.5" strokeWidth={3} />
            Add Weight
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Weight</DialogTitle>
          </DialogHeader>

          <AddWeightForm setOpen={setOpen} />

        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="cool" size="sm" className={cn("rounded-sm", className)}>
          <PlusIcon className="size-3.5" strokeWidth={3} />
          Add Weight
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Weight</DrawerTitle>
        </DrawerHeader>

        <AddWeightForm className="px-4" setOpen={setOpen} />

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