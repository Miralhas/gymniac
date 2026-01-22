import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import WorkoutPlanForm from "@/components/workout-plan/workout-plan-form";
import { ScrollTextIcon } from "lucide-react";

const NewWorkoutPlanPage = () => {
  return (
    <Container className="max-w-[1024px] p-4 pt-6 md:pt-12 space-y-8">
      <PageHeader 
        title="Create Workout Plan"
        description="Design your weekly gym routine"
        icon={ScrollTextIcon}
      />
      <WorkoutPlanForm />
    </Container>
  )
}

export default NewWorkoutPlanPage;
