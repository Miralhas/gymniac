import { ChartNoAxesColumn, PlusCircleIcon, WeightTildeIcon } from "lucide-react";

const WeightHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-2 w-full mb-1">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <WeightTildeIcon className="size-6" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">Your Weighings</h2>
      </div>
      <p className="text-sm text-muted-foreground ">
        Your personal weighing log.
      </p>
      <div className="w-full bg-secondary/40 mt-4 p-4 space-y-2 border rounded-sm">
        <p className="text-muted-foreground text-sm">
          <PlusCircleIcon className="size-3.5 inline-block mr-1.5" />
          Add your weighings.
        </p>
        <p className="text-muted-foreground text-sm">
          <ChartNoAxesColumn className="size-3.5 inline-block mr-1.5 text-foreground/70" />
          Check your progress with graphs.
        </p>
      </div>
    </div>
  )
}

export default WeightHeader;
