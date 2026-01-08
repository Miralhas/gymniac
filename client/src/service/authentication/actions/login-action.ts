'use server'

import { LoginResponse } from "@/types/auth";
import { createSession, deleteSession } from "@/utils/session";
import { redirect } from "next/navigation";

export const loginAction = async (prevState: unknown, data: LoginResponse) => {
  await createSession(data);
  redirect("/");
}

export const logoutAction = async () => {
  await deleteSession();
}