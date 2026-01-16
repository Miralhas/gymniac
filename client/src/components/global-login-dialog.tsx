'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/auth-context";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./authentication/login/login-form";

const GlobalLoginDialog = () => {
  const { setOpen, open, close } = useGlobalLoginContext();
  const { authState } = useAuthContext();
  const pathname = usePathname();

  useEffect(() => {
    if (authState?.user && open) {
      close();
    }
  }, [authState, close, open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogHeader className="sr-only">
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <DialogContent className="md:!max-w-[400px] p-0">
        <div className="w-full backdrop-blur-sm bg-card p-4">
          <LoginForm redirectUri={pathname} className="ring-0" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GlobalLoginDialog;