import CardExample from "@/components/card-example";
import WorkoutCalendar from "@/components/workout-calendar";

export default async function Home() {
  return (
    <div className="w-full">
      {/* <CardExample /> */}
      <WorkoutCalendar />
    </div>
  )
}
