import { PropsWithChildren } from "react";
import DisabledLink from "../ui/disabled-link";
import { LinkProps } from "next/link";
import { cn } from "@/utils/common-utils";

type Props<R> = LinkProps<R> & { disabled?: boolean; className?: string; prefetch?: boolean }

const PaginationLink = <R extends string>({ children, className, prefetch, disabled = false, ...rest }: PropsWithChildren<Props<R>>) => {
  return (
    <DisabledLink prefetch={prefetch} {...rest} className={cn(className, disabled && "pointer-events-none opacity-50")}>
      {children}
    </DisabledLink>
  )
}

export default PaginationLink;
