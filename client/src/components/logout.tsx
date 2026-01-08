'use client'

import { useAuthContext } from "@/contexts/auth-context";
import Link from "next/link";
import ThemeToggler from "./theme-toggler";

const Logout = () => {
  const { authState, isLoading, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ThemeToggler />
      {(!authState || isLoading) ? (
        <div className="space-x-2">
          <Link href={"/login"}>Login</Link>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/a"}>A</Link>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/b"}>B</Link>
        </div>
      ) : (
        <div className="space-x-2">
          <button
            className="cursor-pointer py-1 px-4 border border-primary/80 rounded-sm bg-primary/40"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link className="cursor-pointer py-1 px-4 border border-primary/80 rounded-sm bg-primary/40" href={"/a"}>A</Link>
          <Link className="cursor-pointer py-1 px-4 border border-primary/80 rounded-sm bg-primary/40" href={"/b"}>B</Link>
        </div>
      )}
    </div>
  )
}

export default Logout;
