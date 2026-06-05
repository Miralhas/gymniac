import { User } from "@/types/auth";

export const adminData: Pick<User, "email" | "username"> = {
  email: "admin@admin.com",
  username: "admin",
}