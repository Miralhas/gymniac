'use client'
import { logoutAction } from "@/service/authentication/actions/login-action";
import Link from "next/link";
import ThemeToggler from "./theme-toggler";

const Logout = ({ token }: { token?: string }) => {
  const isAuthenticated = !!token;

  const handleLogout = async () => {
    await logoutAction();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ThemeToggler />
      {isAuthenticated ? (
        <div className="space-x-2">
          <button
            className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/a"}>A</Link>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/b"}>B</Link>
        </div>
      ) : (
        <div className="space-x-2">
          <Link href={"/login"}>Login</Link>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/a"}>A</Link>
          <Link className="cursor-pointer py-1 px-4 border border-emerald-700 rounded-sm bg-emerald-900/50" href={"/b"}>B</Link>
        </div>
      )}
    </div>
  )
}

export default Logout;
