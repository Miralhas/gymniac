import { env } from "@/env";
import { Workout } from "@/types/workout";

export const getWorkoutById = async (id: number): Promise<Workout> => {
  const url = `${env.NEXT_PUBLIC_BASE_URL}/workouts/${id}`;
  const res = await fetch(url);
  return await res.json();
} 