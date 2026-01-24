import { cn } from "@/utils/common-utils";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

const PageHeader = (props: Props) => {
  return (
    <div className={cn("border border-zinc-50/10 bg-secondary/10 p-7 rounded-lg flex gap-3 items-center relative", props.className)}>
      <div className="p-3.75 bg-primary/30 border border-primary rounded-lg">
        <props.icon className="size-9 text-accent shrink-0" strokeWidth={2.5} />
      </div>
      <div>
        <h1 className={cn("leading-none inline-flex items-center gap-2 text-3xl md:text-4xl font-bold", props.titleClassName)}>
          <span className="tracking-wide bg-linear-to-r from-accent/70 via-accent to-primary bg-clip-text text-transparent">
            {props.title}
          </span>
        </h1>
        <p className={cn("text-muted-foreground text-base", props.descriptionClassName)}>{props.description}</p>
      </div>
      <div className="absolute inset-0 w-full h-[100px] bg-emerald-600/25 rounded-full blur-[300px] opacity-90"></div>
    </div>
  )
}

export default PageHeader;