export enum Gender {
  female,
  male,
}
export type BaseUser = {
  /**
   * @description id
   */
  id: string;
  /**
   * @description 用户名
   */
  username: string;
  /**
   * @description 邮箱
   */
  email: string;
  /**
   * @description 昵称
   */
  nickname: string;
  /**
   * @description 性别
   */
  gender: Gender;
  /**
   * @description 头像
   */
  avatar: string | null;
  /**
   * @description 电话号码
   */
  phone: string;
  /**
   * @description 号码前缀
   */
  prefix: string;
  /**
   * @description 创建时间
   */
  createAt: Date;
  /**
   * @description 更新时间
   */
  updateAt: Date;
  /**
   * @description 删除时间
   */
  deletedAt: Date | null;
  /**
   * @description 是否禁用
   */
  banned: boolean;
};
export interface AppUser extends BaseUser {
  access_token: string;
}
