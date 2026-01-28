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
import { useGetUserInfo } from "@/service/user/queries/use-get-user-info";
import { UpdateUserInput } from "@/lib/schemas/update-profile-schema";

const EditProfile = ({ accessToken }: { accessToken: string }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const query = useGetUserInfo(accessToken);

  const handleOpen = () => setOpen(prev => !prev);

  const defaultValues: UpdateUserInput = {
    confirmPassword: "",
    password: "",
    mode: query.data?.mode ?? undefined,
    weightGoal: query.data?.weightGoal ?? 0,
    username: query.data?.username
  }

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
            <UpdateProfileForm handleOpen={handleOpen} defaultValues={defaultValues} />
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
        <UpdateProfileForm handleOpen={handleOpen} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile;
