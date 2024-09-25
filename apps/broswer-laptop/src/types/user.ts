export enum IUserRole {
  user = "user",
  vip = "vip",
  admin = "admin",
  superAdmin = "superAdmin",
  system = "system",
}
export interface IUser {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  role: IUserRole;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  iat: number;
  exp: number;
}
export type AppUser = IUser & { access_token: string };
