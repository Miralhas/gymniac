import { env } from "@/env";
import { MuscleGroup } from "@/types/muscle-group";

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/muscle-groups`, { method: "GET" });
  return await res.json();
}