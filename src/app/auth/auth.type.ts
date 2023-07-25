export interface ISignupRequest {
  username: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export enum Role {
  ROLE_ADMIN = 'admin',
  ROLE_SUPERADMIN = 'superadmin',
  ROLE_USER = 'user',
}

export interface JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
  role: Role;
  firstname: string;
  lastname: string;
  updatedAt: number | string;
}

export interface Session {
  accessToken: string;
  user: {
    id: number;
    firstname: string;
    email: string;
    role: Role;
  };
  accessTokenExpires: number;
}
