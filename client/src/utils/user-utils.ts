import { Role, RoleStatus, User } from "@/types/auth";

export const adminCheck = (user: User | null) => user?.roles.some(r => r === Role.ADMIN);

export const roleMap: Record<Role, RoleStatus> = {
  ADMIN: "Admin",
  USER: "Member",
};

export const mapRoles = (roles: Role[]) => {
  if (roles.some(r => Role.ADMIN === r)) {
    return roleMap["ADMIN"];
  }

  return roleMap["USER"];
};
