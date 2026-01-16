import GlobalLoginDialog from "@/components/global-login-dialog";
import Navbar from "@/components/navbar";
import AddWorkoutModal from "@/components/workout-calendar/add-workout-modal";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
        <Navbar />
        {children}
        <AddWorkoutModal />
        <GlobalLoginDialog />
    </main>
  )
}

export default CoreLayout;
