import { PaginationParams } from "@/lib/schemas/pagination-schema";

export const weightKeys = {
  all: ["weight"],
  getUserWeights: (params: PaginationParams) => [...weightKeys.all, "list", "user", params]
}