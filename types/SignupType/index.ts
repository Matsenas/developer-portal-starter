export enum SignupType {
  USER_WITH_NO_PASSWORD = "USER_WITH_NO_PASSWORD",
  USER_WITH_PASSWORD = "USER_WITH_PASSWORD",
  NEW_USER = "NEW_USER",
}

export interface SingupTypeRes {
  response: string;
  type: SignupType;
}
