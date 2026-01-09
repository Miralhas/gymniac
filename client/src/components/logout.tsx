'use client'

import Link from "next/link";
import AuthButton from "./authentication/auth-button";
import { Button } from "./ui/button";

const Logout = () => {

  return (
    <div className="flex min-h-screen items-center justify-center font-sans gap-x-2">
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
