import Container from "@/components/container";
import WorkoutPlanForm from "@/components/workout-plan/workout-plan-form";

const NewWorkoutPlanPage = () => {
  return (
    <Container className="max-w-[840px] p-4 pt-6 md:pt-12 space-y-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Workout Plan</h1>
        <p className="text-foreground/80 text-sm">Design your weekly gym routine</p>
      </div>
      <WorkoutPlanForm />
    </Container>
  )
}

export default NewWorkoutPlanPage;
