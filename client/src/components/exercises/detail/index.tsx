'use client'

import ConfirmDeleteDialog from "@/components/confirm-delete-dialog";
import DefaultLoading from "@/components/default-loading";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { createWsrvLoader } from "@/components/wsrv-loader";
import { useDeleteExerciseById } from "@/service/exercise/mutations/use-delete-exercise-by-id";
import { useGetExerciseBySlug } from "@/service/exercise/queries/use-get-exercise-by-slug";
import { Exercise } from "@/types/exercise";
import { is404, youtubeThumbnailExtractor } from "@/utils/common-utils";
import { formatDayMonthYear } from "@/utils/date-utils";
import { ArrowLeft, CalendarIcon, DumbbellIcon, EditIcon, EllipsisVertical, LucideIcon, PlayIcon, TrashIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ExerciseDetail = ({ slug }: { slug: Exercise["slug"] }) => {
  const query = useGetExerciseBySlug(slug);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteMutation = useDeleteExerciseById();

  if (is404(query.error)) {
    notFound();
  }

  if (query.isLoading || query.isError) {
    return <DefaultLoading />
  }

  if (!query.data) return null;

  const thumbUrl = youtubeThumbnailExtractor(query.data.videoHowTo);

  const handleDelete = () => {
    if (!query.data) return;
    deleteMutation.mutate(query.data.id, {
      onSuccess: () => {
        toast.success("Exercise deleted successfully!");
      },
      onError: () => toast.error("Failed to delete exercise. Try again later!"),
    });
  }

  return (
    <>
      <Link href="/exercises" className="inline-flex gap-1 text-sm text-[15px] text-foreground/80 hover:text-foreground items-center leading-none">
        <ArrowLeft className="size-4.5 mt-px" />
        Back to Exercises
      </Link>
      <PageHeader
        title={query.data.name}
        icon={DumbbellIcon}
        description={`${query.data?.muscleGroup.name} Exercise`}
        titleClassName="text-lg md:text-2xl lg:text-3xl"
        descriptionClassName="text-sm md:text-lg"
      />

      <section className="space-y-4 mt-6">
        <div className="grid grid-cols-6 gap-6">
          <Link
            href={query.data.videoHowTo}
            className="cursor-pointer group relative col-span-full lg:col-span-4 overflow-hidden border border-accent/15 rounded-md hover:border-accent/30 transition-colors duration-200 ease-in-out"
            target="_blank" rel="noopener noreferrer"
          >
            <div className="w-full h-[200px] md:h-[500px] group">
              <Image
                fill
                loading="eager"
                src={thumbUrl}
                sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
                alt="exercise video"
                className="opacity-80 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 text-transparent object-center w-full rounded-md"
                loader={createWsrvLoader({ default: "https://static.devilsect.com/no-image.webp" })}
              />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/80 grid place-items-center transition-opacity ease-in-out duration-300">
              <div className="flex items-center justify-center bg-accent/20 border-2 border-accent/70 rounded-full size-24">
                <PlayIcon className="size-12 text-accent" />
              </div>
            </div>
          </Link>

          <div className="col-span-full md:col-span-2 border bg-primary/5 border-accent/15 rounded-md hover:border-accent/30 transition-colors duration-200 ease-in-out flex flex-col p-6 space-y-4 relative">
            <p className="text-foreground/90 text-xl font-bold md:mb-8">{query.data?.name}</p>
            <InfoItem title="Muscle Group" description={query.data.muscleGroup.name} icon={DumbbellIcon} />
            <InfoItem title="Added by" description={query.data.submitter.username} icon={UserIcon} />
            <InfoItem title="Created At" description={formatDayMonthYear(query.data.createdAt)} icon={CalendarIcon} />

            <Button asChild variant="cool" className="mt-6 md:mt-auto">
              <Link href={query.data.videoHowTo} target="_blank" rel="noopener noreferrer">
                Watch Video Tutorial
              </Link>
            </Button>

            <div className="absolute right-0 top-0 pt-1.5 md:pr-1.5 md:pt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="pure" size="icon-sm">
                    <EllipsisVertical className="text-foreground/80 size-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="bg-background border border-zinc-50/15 flex flex-col max-w-[150px] py-3 px-3 gap-2.5"
                >
                  <Button
                    className="gap-2 items-center justify-start text-foreground rounded-xs hover:opacity-80"
                    variant="pure"
                    size="none"
                    // onClick={() => setOpenDelete(true)}
                  >
                    <EditIcon className="size-4" />
                    <span className="text-xs">Edit Exercise</span>
                  </Button>
                  <Separator className="bg-zinc-50/20" />
                  <Button
                    className="gap-2 items-center justify-start text-foreground rounded-xs hover:opacity-80"
                    variant="pure"
                    size="none"
                    onClick={() => setOpenDelete(true)}
                  >
                    <TrashIcon className="size-4" />
                    <span className="text-xs">Delete Exercise</span>
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

          </div>

          <div className="col-span-full border p-4 text-foreground/80 rounded-xl border-l-primary border-l-3 italic">
            <p>{query.data.description}</p>
          </div>
        </div>
      </section>
      <ConfirmDeleteDialog
        onSubmit={handleDelete}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Delete Exercise"
        description="Are you sure you want to delete this exercise? This action cannot be undone"
      />
    </>
  )
}


const InfoItem = (props: { title: string, description: string; icon: LucideIcon }) => {
  const { title, description } = props;
  return (
    <div className="flex items-center gap-2">
      <div className="bg-accent/15 border border-accent/50 p-2 rounded-sm">
        <props.icon className="size-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="font-medium text-[15px]">{description}</p>
      </div>
    </div>
  )
}

export default ExerciseDetail;
