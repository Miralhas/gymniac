'use client'

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { useImageCropper } from "@/hooks/use-image-cropper";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  imageFile: File | null;
  onSubmit: (file: Blob) => Promise<void>;
  isPending: boolean;
}

const SCALE = 1;
const ASPECT_RATIO = 1;
const ROTATE = 0;

const ImageCropper = ({ imageFile, open, setOpen, onSubmit, isPending }: Props) => {
  const isMobile = useIsMobile();
  const {
    imgSrc,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    imgRef,
    previewCanvasRef,
    onImageLoad,
    createBlob,
  } = useImageCropper({ imageFile, aspectRatio: ASPECT_RATIO });

  const onSetAvatar = async () => {
    const blob = await createBlob();
    await onSubmit(blob);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} handleOnly>
        <DrawerContent className="px-4">
          <DrawerHandle className="cursor-grabbing" />
          <DrawerHeader className="sr-only">
            <DrawerTitle>Usar Avatar</DrawerTitle>
          </DrawerHeader>
          <div className='overflow-y-auto space-y-6 p-3'>
            {!!imgSrc ? (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT_RATIO}
                minHeight={100}
                maxHeight={250}
                maxWidth={250}
                keepSelection
                className="row-start-1 col-span-1 overflow-hidden bg-black m-auto"
                style={{ maxWidth: 350 }}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${SCALE}) rotate(${ROTATE}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            ) : null}
            {!!completedCrop && (
              <>
                <div className="space-y-3">
                  <p className="text-center">Preview</p>
                  <canvas
                    ref={previewCanvasRef}
                    className='border border-black object-contain rounded-full mx-auto min-w-36 min-h-36 max-w-36 max-h-36'
                    style={{ width: completedCrop.width, height: completedCrop.height }}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Button variant='cool' className="col-span-1 h-8" onClick={onSetAvatar} disabled={isPending}>Set Avatar</Button>
                  <Button variant='cool-secondary' className="col-span-1 h-8" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="w-full max-w-3xl!" >
        <DialogHeader>
          <DialogTitle className="sr-only">User Avatar</DialogTitle>
          <DialogDescription className="sr-only">
            Image may take a while to update.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 w-full gap-4'>
          {!!imgSrc ? (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECT_RATIO}
              minHeight={100}
              maxHeight={250}
              maxWidth={250}
              keepSelection
              className="overflow-hidden bg-black mx-auto"
              style={{ maxWidth: 350 }}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${SCALE}) rotate(${ROTATE}deg)` }}
                onLoad={onImageLoad}
              />

            </ReactCrop>
          ) : null}
          {!!completedCrop ? (
            <div className="flex flex-col justify-between gap-y-6">
              <div className="space-y-3 mx-auto">
                <p className="text-center">Preview</p>
                <canvas
                  ref={previewCanvasRef}
                  className='border border-black object-contain rounded-full'
                  style={{ width: completedCrop.width, height: completedCrop.height }}
                />
              </div>
              <div className='grid grid-cols-2 gap-4 w-full'>
                <Button variant='cool' className="col-span-1 h-11" onClick={onSetAvatar} disabled={isPending}>Set Avatar</Button>
                <Button variant='cool-secondary' className="col-span-1 h-11" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageCropper;
