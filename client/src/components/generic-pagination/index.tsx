import {
  PaginationEllipsis,
  PaginationItem
} from "@/components/ui/pagination";
import { PaginatedQuery } from "@/types/paginated-query";
import { cn } from "@/utils/common-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import DisabledLink from "../ui/disabled-link";

const DELTA = 2;
const FIRST_PAGE = 0;

type Props<T> = {
  query: PaginatedQuery<T>;
  className?: string;
  handlePage?: (page: number) => void;
}


const GenericPagination = <T,>({ query, className, handlePage }: Props<T>) => {
  const last = query.totalPages - 1;
  const current = query.currentPage;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const range = useMemo(() => {
    const r = []
    const left = current - DELTA;
    const right = current + DELTA + 1;
    for (let i = 0; i <= last; i++) {
      if (i >= left && i < right) {
        r.push(i);
      }
    }
    return r;
  }, [last, current]);

  const appendPage = useCallback((page: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === null || page < 1) {
      params.delete("page");
      return pathname;
    }
    const pg = page + 1
    params.set("page", pg.toString());
    return pathname + "?" + params.toString();
  }, [searchParams, pathname]);

  const onPageChange = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, page: number) => {
    if (handlePage) {
      e.preventDefault();
      handlePage?.(page);
    }
  }

  return (
    <div className={cn("w-full flex justify-center items-center gap-x-2", className)}>
      <DisabledLink
        disabled={query.previous === null}
        href={appendPage(query.previous!)}
        onClick={(e) => onPageChange(e, query.previous!)}
        className="inline-flex items-center justify-center text-foreground/75 hover:text-foreground"
      >
        <ChevronLeft className="size-6" />
      </DisabledLink>

      {range.includes(FIRST_PAGE) ? null : (
        <>
          <DisabledLink
            href={appendPage(0)}
            className={cn("size-9 items-center justify-center rounded-md border border-zinc-50/15 bg-secondary/50 text-foreground/85 hidden md:inline-flex")}
            onClick={(e) => onPageChange(e, 0)}
          >
            {FIRST_PAGE + 1}
          </DisabledLink>
          <PaginationItem className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        </>
      )}

      <div className="space-x-2">
        {range.map((page, index) => {
          const isCurrentPage = current === page;
          return (
            <DisabledLink
              key={index}
              href={appendPage(page)}
              className={cn("size-9 items-center justify-center inline-flex rounded-md border border-zinc-50/15 bg-secondary/50 text-foreground/85", isCurrentPage && "border border-accent/70 bg-accent/20 text-accent")}
              onClick={(e) => onPageChange(e, page)}
            >
              {page + 1}
            </DisabledLink>
          )
        }
        )}
      </div>

      {range.includes(last) ? null : (
        <>
          <PaginationItem className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
          <DisabledLink
            href={appendPage(last)}
            className={cn("size-9 items-center justify-center rounded-md border border-zinc-50/15 bg-secondary/50 text-foreground/85 hidden md:inline-flex")}
            onClick={(e) => onPageChange(e, last)}
          >
            {last + 1}
          </DisabledLink>
        </>
      )}

      <DisabledLink
        disabled={query.next === null}
        href={appendPage(query.next!)}
        onClick={(e) => onPageChange(e, query.next!)}
        className="inline-flex items-center justify-center text-foreground/75 hover:text-foreground"
      >
        <ChevronRight className="size-6" />
      </DisabledLink>
    </div>
  )
}

export default GenericPagination;
