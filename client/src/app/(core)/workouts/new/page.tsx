import PageHeader from "@/components/page-header";
import AddWorkoutForm from "@/components/workout/form";
import { DumbbellIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Workout"
};

const NewWorkoutPage = () => {
  return (
    <section className="space-y-8">
      <PageHeader
        title="Add Workout"
        description="Log your exercises, sets, and reps"
        icon={DumbbellIcon}
      />
      <AddWorkoutForm />
    </section>
  )
}

export default NewWorkoutPage;
