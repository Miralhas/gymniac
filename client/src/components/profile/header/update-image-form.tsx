'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProfilePicture } from "@/service/user/mutations/use-update-profile-picture";
import { User } from "@/types/auth";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  profilePicture: z.url("Must be a valid URL"),
})

const handleImageSrcChange = (imgURL: string) => {
  const images = document.querySelectorAll(".user-profile-header-image") as NodeListOf<HTMLImageElement>;
  images.forEach(img => {
    img.src = `${imgURL.split("#")[0]}#${new Date().getTime().toString()}`
    img.srcset = "";
  });
}

type Props = {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imgURL: string;
}

const UpdateImageForm = ({ user, imgURL, setOpen }: Props) => {
  const [pfp, setPfp] = useState<string>(() => user.profilePicture ?? "");
  const [inputError, setInputError] = useState("");
  const mutation = useUpdateProfilePicture();

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
  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="pfp" className="text-foreground/80 mb-2">
          Profile Picture URL
        </Label>
        <Input
          id="pfp"
          name="pfp"
          placeholder="https://github.com/miralhas.png"
          className="placeholder:text-xs placeholder:text-foreground/40"
          value={pfp}
          aria-invalid={!!inputError}
          onChange={(e) => setPfp(e.currentTarget.value)}
        />
        {inputError && (
          <p className="text-sm tracking-tight font-medium text-destructive">{inputError}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="cool" disabled={!pfp || user.profilePicture === pfp}>Submit</Button>
        <Button variant="secondary" type="button" onClick={() => { setOpen(false); setInputError("") }}>Cancel</Button>
      </div>
    </form>
  )
}

export default UpdateImageForm;
