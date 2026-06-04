export type Image = {
  id: string;
  size: number;
  fileName: string;
  relativeFolder: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
}

export type ImageSummary = Pick<Image, "id" | "fileName" | "contentType">;