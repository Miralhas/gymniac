import Container from "@/components/container";
import { PropsWithChildren } from "react";

const WorkoutPlanLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container className="p-4 md:py-8 relative space-y-4 min-h-screen">
      {children}
    </Container>
  )
}

export default WorkoutPlanLayout;
