import { useDebounceEffect } from '@/hooks/use-debounce-effect';
import { setCanvasPreview } from '@/lib/set-canvas-preview';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';

const SCALE = 1;
const ROTATE = 0;
const MIN_HEIGHT = 200;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: (MIN_HEIGHT / mediaWidth) * 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

type UseImageCropperProps = {
  imageFile: File | null;
  aspectRatio?: number;
};

export function useImageCropper({
  imageFile,
  aspectRatio = 1,
}: UseImageCropperProps) {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageFile) return;
    // eslint-disable-next-line
    setCrop(undefined);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result?.toString() ?? '');
    });

    reader.readAsDataURL(imageFile);

    return () => reader.abort();
  }, [imageFile]);

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;

      setCrop(
        centerAspectCrop(
          width,
          height,
          aspectRatio,
        ),
      );
    },
    [aspectRatio],
  );

  useDebounceEffect(
    async () => {
      if (
        !completedCrop?.width ||
        !completedCrop?.height ||
        !imgRef.current ||
        !previewCanvasRef.current
      ) {
        return;
      }

      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        SCALE,
        ROTATE,
      );
    },
    [completedCrop],
    100,
  );

  const createBlob = useCallback(async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    const ctx = offscreen.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    return offscreen.convertToBlob({
      type: 'image/webp',
      quality: 0.3,
    });
  }, [completedCrop]);

  return {
    imgSrc,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    imgRef,
    previewCanvasRef,
    onImageLoad,
    createBlob,
  };
}