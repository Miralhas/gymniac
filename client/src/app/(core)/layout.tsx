import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default CoreLayout;
