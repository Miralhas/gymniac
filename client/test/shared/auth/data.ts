import { SignUpInput } from "@/lib/schemas/signup-schema";

type AuthData = Pick<SignUpInput, "email" | "username" | "password">;

export const adminData: AuthData = {
  email: "admin@admin.com",
  username: "admin",
  password: "1234",
}

export const userData: AuthData = {
  email: "user@user.com",
  username: "user",
  password: "1234",
}