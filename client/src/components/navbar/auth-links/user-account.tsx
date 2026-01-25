'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { createWsrvLoader } from "@/components/wsrv-loader";
import { User } from "@/types/auth";
import { LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { env } from "@/env";

type Props = {
  user: User;
  logout: () => Promise<void>;
}

const UserAccount = ({ user, logout }: Props) => {

  const imgURL = `${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/pfp#${new Date().getTime().toString()}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Image
          src={imgURL}
          width={32}
          id="user-account"
          height={32}
          quality={40}
          alt="User profile picture"
          loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
          className="rounded-full size-6 md:size-8 overflow-hidden object-cover object-center shadow-2xl ring-2 ring-secondary user-profile-header-image"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] text-zinc-200 bg-zinc-900" side="bottom" sideOffset={10} align="center">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="text-zinc-200 mt-[2px]" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mt-3" />
        <DropdownMenuItem className="flex items-center" onClick={logout}>
          <LogOutIcon className="text-zinc-200 mt-[2px]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccount;
