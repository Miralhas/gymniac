import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import { DumbbellIcon } from "lucide-react";
import { PropsWithChildren } from "react";

const ExercisesLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container className="p-4 md:py-8 relative space-y-6 min-h-screen">
      <PageHeader
        description="Browse our library of exercises"
        icon={DumbbellIcon}
        title="Exercises"
      />
      {children}
    </Container>
  )
}

export default ExercisesLayout;
