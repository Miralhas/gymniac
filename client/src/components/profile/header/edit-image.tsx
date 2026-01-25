'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWsrvLoader } from "@/components/wsrv-loader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUpdateProfilePicture } from "@/service/user/mutations/use-update-profile-picture";
import { User } from "@/types/auth";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import UpdateImageForm from "./update-image-form";

const schema = z.object({
  profilePicture: z.url("Must be a valid URL")
})

const handleImageSrcChange = (imgURL: string) => {
  const images = document.querySelectorAll(".user-profile-header-image") as NodeListOf<HTMLImageElement>;
  images.forEach(img => {
    img.src = `${imgURL.split("#")[0]}#${new Date().getTime().toString()}`
    img.srcset = "";
  });
}

const EditImage = ({ user, imgURL }: { user: User; imgURL: string }) => {
  const [open, setOpen] = useState(false);
  const [pfp, setPfp] = useState<string>(() => user.profilePicture ?? "");
  const [inputError, setInputError] = useState("");
  const mutation = useUpdateProfilePicture();
  const isMobile = useIsMobile();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res = schema.safeParse({ profilePicture: pfp });
    if (!res.success) {
      return setInputError(z.treeifyError(res.error).properties!.profilePicture!.errors[0]);
    }
    mutation.mutate(res.data, {
      onSuccess: () => {
        toast.success("Profile Picture updated successfully!");
        handleImageSrcChange(imgURL);
        setOpen(false);
      },
      onError: () => toast.error("Failed to update profile picture.")
    });
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="size-32 md:size-36 rounded-full relative cursor-pointer group">
            <Image
              src={imgURL}
              loading="eager"
              id="edit-image"
              width={144}
              height={144}
              priority
              quality={40}
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
              alt="User profile picture"
              loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang.png` })}
              className="rounded-full size-32 md:size-36 overflow-hidden object-cover object-center shadow-2xl ring-2 ring-secondary opacity-80 z-20 text-transparent user-profile-header-image"
            />
            <div
              className="absolute inset-0 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/70 cursor-pointer rounded-full grid place-items-center"
            >
              <PencilIcon className="size-7 text-accent" />
            </div>
            <div
              className="absolute flex items-center gap-1 p-1 px-2 bottom-0 right-0 z-50 transition-opacity duration-200 group-hover:opacity-0 bg-secondary cursor-pointer border border-white/20 rounded-md"
            >
              <PencilIcon className="size-4" />
              <p className="tracking-wide text-xs font-semibold">Edit</p>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Profile Picture</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <UpdateImageForm imgURL={imgURL} setOpen={setOpen} user={user} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="size-32 md:size-36 rounded-full relative cursor-pointer group">
          <Image
            src={imgURL}
            loading="eager"
            id="edit-image"
            width={144}
            height={144}
            priority
            quality={40}
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
            alt="User profile picture"
            loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang.png` })}
            className="rounded-full size-32 md:size-36 overflow-hidden object-cover object-center shadow-2xl ring-2 ring-secondary opacity-80 z-20 text-transparent user-profile-header-image"
          />
          <div
            className="absolute inset-0 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/70 cursor-pointer rounded-full grid place-items-center"
          >
            <PencilIcon className="size-7 text-accent" />
          </div>
          <div
            className="absolute flex items-center gap-1 p-1 px-2 bottom-0 right-0 z-50 transition-opacity duration-200 group-hover:opacity-0 bg-secondary cursor-pointer border border-white/20 rounded-md"
          >
            <PencilIcon className="size-4" />
            <p className="tracking-wide text-xs font-semibold">Edit</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-card/70 border border-zinc-50/10">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-lg md:text-xl">Profile Picture</DialogTitle>
          <DialogDescription>
            Update your profile picture.
          </DialogDescription>
        </DialogHeader>
        <UpdateImageForm imgURL={imgURL} setOpen={setOpen} user={user} />
      </DialogContent>
    </Dialog>
  )
}

export default EditImage;
