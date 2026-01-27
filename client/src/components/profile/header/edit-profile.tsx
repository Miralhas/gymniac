'use client'

import { Button } from "@/components/ui/button";

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
import { useState } from "react";
import UpdateProfileForm from "./update-profile-form";

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpen = () => setOpen(prev => !prev);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="w-full" asChild>
          <Button
            variant="cool"
            className="text-lg md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl text-emerald-500/90 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out"
          >
            Edit Profile
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add exercise</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto max-h-[400px]">
            <UpdateProfileForm handleOpen={handleOpen} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="cool"
          className="text-lg md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl text-emerald-500/90 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <UpdateProfileForm handleOpen={handleOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile;
