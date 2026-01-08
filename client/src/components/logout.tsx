'use client'

import Link from "next/link";
import AuthButton from "./authentication/auth-button";
import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";

const Logout = () => {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-x-2">
      <ThemeToggler />
      <AuthButton />
      <Button variant="cool" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button variant="cool" asChild>
        <Link href="/example">Example</Link>
      </Button>
    </div>
  )
}

export default Logout;
