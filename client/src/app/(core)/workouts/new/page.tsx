import AddWorkoutForm from "@/components/workout-calendar/form";

const NewWorkoutPage = () => {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Add Workout</h1>
        <p className="text-primary">Log your exercises, sets, and reps</p>
      </div>
      <AddWorkoutForm />
    </section>
  )
}

export default NewWorkoutPage;
