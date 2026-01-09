import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default CoreLayout;
