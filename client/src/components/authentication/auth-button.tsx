"use client"

import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthButton = () => {
  const { authState, isLoading, logout } = useAuthContext();

  if (!authState || isLoading) {
    return (
      <Button variant="cool" asChild>
        <Link href="/login">Login</Link>
      </Button>
    )
  }

  return (
    <Button variant="cool" onClick={async () => await logout()}>
      Logout
    </Button>
  )
}

export default AuthButton;
