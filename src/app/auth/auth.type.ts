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
