'use client'

import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return (
    <Button className="text-base md:h-10 md:px-6 md:has-[>svg]:px-8 rounded-2xl bg-secondary/30 transition-transform hover:scale-105 duration-300 ease-in-out border-zinc-50/25" variant="cool-secondary" onClick={logout}>
      <LogOutIcon className="size-4" />
      Logout
    </Button>
  )
}

export default LogoutButton;
