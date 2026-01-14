import Navbar from "@/components/navbar";
import AddWorkoutModal from "@/components/workout-calendar/add-workout-modal";
import { WorkoutProvider } from "@/contexts/workout-context";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <WorkoutProvider>
        <Navbar />
        {children}
        <AddWorkoutModal />
      </WorkoutProvider>
    </main>
  )
}

export default CoreLayout;
