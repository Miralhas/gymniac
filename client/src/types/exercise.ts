import { UserSummary } from "./auth";
import { MuscleGroup } from "./muscle-group";

export type Exercise = {
  id: number;
  name: string;
  slug: string;
  description: string;
  videoHowTo: string;
  createdAt: string;
  updatedAt: string;
  muscleGroup: MuscleGroup;
  submitter: UserSummary;
}