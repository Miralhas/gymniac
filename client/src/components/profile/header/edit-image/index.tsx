'use client'

import { createWsrvLoader } from "@/components/wsrv-loader";
import { env } from "@/env";
import { useUpdateUserImage } from "@/service/user/mutations/use-update-user-image";
import { useGetUserInfo } from "@/service/user/queries/use-get-user-info";
import { isApiError } from "@/utils/common-utils";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import ImageCropper from "./image-cropper";

const DEFAULT_IMG = `https://static.devilsect.com/yin-yang.png`;

const updateSrc = (img: HTMLImageElement, url: string) => {
  img.src = url;
  img.srcset = "";
  (document.querySelector(".user-profile-header-image") as HTMLImageElement).src = url;
  (document.querySelector(".user-profile-header-image") as HTMLImageElement).srcset = ""
}

const EditImage = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useGetUserInfo();
  const mutation = useUpdateUserImage();
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);

  const onSubmit = async (file: Blob) => {
    if (!query.data) return;
    const { id: userId, username } = query.data;

    const url = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("files", file, `${userId}-${username}.webp`);

    mutation.mutate({ userId, formData }, {
      onSuccess: () => {
        toast.success("Image successfuly updated!");
        setOpen(false);
        updateSrc(imageRef!.current!, url);
        router.refresh();
        URL.revokeObjectURL(url);
      },
      onError: (err) => {
        const description = isApiError(err) ? err.detail : err.message;
        toast.error("Failed to update avatar! Try again later.", { description });
      }
    });
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      setOpen(true);
    }
  }

  const onAvatarClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const fileName = query.data?.image?.fileName;

  return (
    <>
      <ImageCropper imageFile={file} open={open} setOpen={setOpen} onSubmit={onSubmit} isPending={mutation.isPending} />
      <div className="size-32 md:size-36 rounded-full relative cursor-pointer group" onClick={onAvatarClick}>
        <Image
          src={`${env.NEXT_PUBLIC_BASE_URL}/images?fileName=${fileName}`}
          loading="eager"
          id="edit-image"
          width={144}
          height={144}
          priority
          quality={40}
          ref={imageRef}
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
          alt="User profile picture"
          loader={createWsrvLoader({ default: DEFAULT_IMG })}
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
      <input
        type="file"
        accept='image/*'
        ref={inputRef}
        id='avatar'
        name='avatar'
        onChange={onFileChange}
        className='absolute invisible top-[-200vh]'
      />
    </>
  )
}

export default EditImage;
