import { LucideIcon } from "lucide-react";

export interface IUser {
  username: string;
  avatar: string;
  nickname: string;
  email: string;
  token: string;
  role: string;
}
export interface INav {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: INav[];
}
