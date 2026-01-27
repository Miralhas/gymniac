'use client'

import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import GenericPagination from "@/components/generic-pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { nuqsPaginationParams } from "@/lib/schemas/pagination-schema";
import { useDeleteWeight } from "@/service/weight/mutations/use-delete-weight-by-id";
import { defaultWeightsParams, useGetUserWeights } from "@/service/weight/queries/use-get-user-weights";
import { Weight } from "@/types/weight";
import { formatDayMonthYear } from "@/utils/date-utils";
import { DumbbellIcon, EditIcon, TrashIcon, WeightTildeIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";
import AddWeight from "./add-weight";

const WeightList = ({ accessToken }: { accessToken: string }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useQueryStates(nuqsPaginationParams);
  const [selected, setSelected] = useState<Weight | undefined>(undefined);
  const query = useGetUserWeights({ ...defaultWeightsParams, page: params.page }, accessToken);
  const deleteMutation = useDeleteWeight();

  const onDelete = (id: Weight["id"]) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Weight Deleted successfully!"),
      onError: () => toast.error("Failed to delete weight.")
    });
  }

  if (query.isLoading) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center">
        <DumbbellIcon className="text-muted-foreground size-12 animate-spin" />
      </div>
    );
  }

  if (!query.data?.results.length) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-secondary/20 border">
        <div className="text-center">
          <div className="size-18 rounded-full flex items-center justify-center bg-accent/30 border border-accent/80 mx-auto mb-6">
            <WeightTildeIcon className="size-9 text-accent/90" />
          </div>
          <p className="text-zinc-300 font-semibold text-lg md:text-xl">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="gap-4 gap-y-8">
        <Table>
          <TableHeader>
            <TableRow className="md:text-lg md:text-[17px]">
              <TableHead className="md:w-[100px]">Weight</TableHead>
              <TableHead>Added At</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm md:text-base md:text-[15px] text-foreground/80 font-light">
            {query.data?.results.map(weight => (
              <TableRow key={weight.id}>
                <TableCell>{weight.kg} KG</TableCell>
                <TableCell>{formatDayMonthYear(weight.createdAt)}</TableCell>
                <TableCell className="flex gap-1 md:gap-2 items-center">
                  <AddWeight weight={weight} mode="PUT">
                    <Button variant="ghost" size="icon-xs" className="ml-auto">
                      <EditIcon className="size-4 md:size-4.5" />
                    </Button>
                  </AddWeight>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => {setOpen(true); setSelected(weight)}}
                  >
                    <TrashIcon className="size-4 md:size-4.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination
          query={query.data}
          handlePage={(page) => setParams({ page })}
          className="mt-6"
        />
      ) : null}
      {selected && (
        <ConfirmDeleteDialog
          onSubmit={() => onDelete(selected.id)}
          open={open}
          setOpen={setOpen}
          description="This action cannot be undone. This will permanently delete the weight log."
          title={`Delete Weight (${selected.kg} Kg)`}
        />
      )}
    </>
  )
}

export default WeightList;
