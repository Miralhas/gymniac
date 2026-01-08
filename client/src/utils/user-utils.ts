import { Role, User } from "@/types/auth";

export const adminCheck = (user: User | null) => user?.roles.some(r => r === Role.ADMIN);