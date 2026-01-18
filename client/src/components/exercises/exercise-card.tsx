import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Exercise } from "@/types/exercise";
import { youtubeThumbnailExtractor } from "@/utils/common-utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { createWsrvLoader } from "../wsrv-loader";

type Props = {
  exercise: Exercise;
}

const ExerciseCard = ({ exercise }: Props) => {
  const thumbUrl = youtubeThumbnailExtractor(exercise.videoHowTo)
  return (
    <Link href={`/exercises/${exercise.slug}`}>
      <Card className="p-0 border border-primary/15 backdrop-blur-3xl ring-0 pb-4 group">
        <CardHeader className="flex flex-col space-y-3 px-0">
          <div className="w-full h-[150px] md:h-[200px] relative">
            <Image
              fill
              src={thumbUrl}
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
              alt="exercise video"
              className="object-fill transition-transform duration-500 ease-in-out group-hover:scale-105 opacity-90 text-transparent object-center w-full rounded-md"
              loader={createWsrvLoader({ default: "https://static.devilsect.com/no-image.webp" })}
            />
          </div>
        </CardHeader>
        <CardContent className="px-3">
          <div className="grid grid-cols-[1fr_0.3fr] w-full">
            <CardTitle className="line-clamp-2">{exercise.name}</CardTitle>
            <Badge variant="cool" className="justify-self-end">{exercise.muscleGroup.name}</Badge>
          </div>
          <CardDescription className="line-clamp-2 text-foreground/80 text-sm">{exercise.description}</CardDescription>
          <p className="text-muted-foreground text-xs font-semibold mt-4"><span className="font-light text-[11px]">Added by:</span> {exercise.submitter.username}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ExerciseCard;
