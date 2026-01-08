'use server'

import { LoginResponse } from "@/types/auth";
import { createSession, deleteSession } from "@/utils/session";

export const loginAction = async (prevState: unknown, data: LoginResponse) => {
  await createSession(data);
}

export const logoutAction = async () => {
  await deleteSession();
}