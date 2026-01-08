export type RoleStatus = "Admin" | "Member";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export type User = {
  id: number;
  username: string;
  email: string;
}

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export type AuthState = {
  User: User;
  accessToken: string;
  isAuthenticated: boolean;
};
