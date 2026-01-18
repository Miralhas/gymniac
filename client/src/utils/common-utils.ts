import { ApiError } from "@/service/api-error";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const isApiError = (err: Error | null) => err instanceof ApiError;

export const is404 = (err: Error | null) => isApiError(err) && err.status === 404;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const youtubeThumbnailExtractor = (url: string) => {
  let videoUrl: string | undefined = undefined;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
    /(?:youtube\.com\/clip\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      videoUrl = match[1];
    }
  }

  // will return the thumbnail even if it's undefined. We can pass a default image to the wsrv loader.
  return getYouTubeThumbnailUrl(videoUrl);
}

const getYouTubeThumbnailUrl = (videoId: string | undefined): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
