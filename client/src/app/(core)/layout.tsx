import GlobalLoginDialog from "@/components/global-login-dialog";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
        <Navbar />
        {children}
        <GlobalLoginDialog />
    </main>
  )
}

export default CoreLayout;
