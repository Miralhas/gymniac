export type RoleStatus = "Admin" | "Member";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export type UserSummary = Omit<User, "roles">

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export type AuthState = {
  user: User;
  accessToken: string;
};

export type CustomJwtPayload = {
  iss: string;
  sub: string;
  aud: string | string[];
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
  user: User;
}