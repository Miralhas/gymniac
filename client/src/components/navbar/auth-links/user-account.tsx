'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User } from "@/types/auth";
import { LogOutIcon, UserIcon } from "lucide-react";

type Props = {
  user: User;
  logout: () => Promise<void>;
}

const UserAccount = ({ user, logout }: Props) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer shrink-0 w-full size-7 md:size-8">
          <AvatarImage src="https://github.com/miralhas.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
