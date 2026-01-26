'use client'

import GenericPagination from "@/components/generic-pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { defaultWeightsParams, useGetUserWeights } from "@/service/weight/queries/use-get-user-weights";
import { formatDayMonthYear } from "@/utils/date-utils";
import { DumbbellIcon, WeightTildeIcon } from "lucide-react";

const WeightList = ({ accessToken }: { accessToken: string }) => {
  const query = useGetUserWeights(defaultWeightsParams, accessToken);

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
          <TableCaption>A list of your recent weighings.</TableCaption>
          <TableHeader>
            <TableRow className="text-lg text-[17px]">
              <TableHead className="w-[100px]">Weight</TableHead>
              <TableHead>Added At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-base text-[15px] text-foreground/80 font-light">
            {query.data?.results.map(weight => (
              <TableRow key={weight.id}>
                <TableCell>{weight.kg} KG</TableCell>
                <TableCell>{formatDayMonthYear(weight.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {query.data && query.data?.totalPages > 1 ? (
        <GenericPagination query={query.data}
          // handlePage={(page) => setParams({ page })}
          className="mt-12"
        />
      ) : null}
    </>
  )
}

export default WeightList;
