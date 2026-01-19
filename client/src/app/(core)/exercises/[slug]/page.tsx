import ExerciseDetail from "@/components/exercises/detail";
import { getExerciseBySlugQueryOptions } from "@/service/exercise/queries/use-get-exercise-by-slug";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ExercisePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getExerciseBySlugQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExerciseDetail slug={slug} />
    </HydrationBoundary>
  )
}

export default ExercisePage;
