import request from "@/services/request.ts";
import { IUser, ResponseDataType } from "@/types";

const PREFIX = "/api/auth";
/**
 * 获取租户的信息
 * @param data
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<ResponseDataType<IUser>> => {
  return request(`${PREFIX}/login`, {
    method: "post",
    data: data,
  });
};
export const profile = async (): Promise<ResponseDataType<IUser>> => {
  return request(`${PREFIX}/profile`, {
    method: "get",
  });
};
