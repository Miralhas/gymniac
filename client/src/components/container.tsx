import { cn } from "@/utils/common-utils";
import { PropsWithChildren } from "react";

const Container = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px]", className)}>
      {children}
    </div>
  )
}

export default Container;
