import { DumbbellIcon } from "lucide-react";

const DefaultLoading = () => {
  return (
    <section className="min-h-screen w-full">
      <div className="flex items-center justify-center fixed inset-0 backdrop-blur-sm z-40">
        <div className="flex flex-col gap-4 items-center justify-center bg-primary/10 px-14 py-10 rounded-2xl border border-primary/80">
          <DumbbellIcon className="size-24 animate-pulse" />
          <p className="text-lg font-semibold tracking-tight text-balance animate-pulse">Loading content...</p>
        </div>
      </div>
    </section>
  )
}

export default DefaultLoading;
