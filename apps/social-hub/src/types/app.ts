import { LucideIcon } from "lucide-react";
export enum UserRole {
  user = "user",
  admin = "admin",
  super_admin = "super_admin",
  system = "system",
}
export enum Sex {
  female,
  male,
}
export interface IUser {
  //id
  id: string;
  //用户名 最长50个字符，不能为空
  username: string;
  //昵称 最长50个字符，不能为空 ^[a-zA-Z0-9_-]{2,20}$
  nickname: string;
  //头像
  avatar: string;
  //邮箱 最长100个字符
  email: string;
  //性别
  sex: Sex;
  //角色
  role: UserRole;
  //创建时间
  createAt: Date;
  //更新时间
  updateAt: Date;
  //删除时间
  deletedAt: Date | null;
  //凭证
  access_token: string;
  //隐藏字段
  // password:string 密码
  //是否禁用
  banned: boolean;
}
export interface INav {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: INav[];
  count?: number;
}
