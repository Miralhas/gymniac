import { parseAsIndex, parseAsInteger } from "nuqs/server";
import * as z from "zod";

export const zodPagination = {
  page: z.coerce.number().gt(0).catch(0).optional(),
  size: z.number().gte(0).catch(0).optional(),
}

export const paginationParamsSchema = z.object({
  ...zodPagination
})

export const nuqsPaginationParams = {
  page: parseAsIndex.withDefault(0).withOptions({ clearOnDefault: true, history: "push", scroll: true }),
  size: parseAsInteger.withDefault(12).withOptions({ clearOnDefault: true })
}

export type PaginationParams = z.infer<typeof paginationParamsSchema>;