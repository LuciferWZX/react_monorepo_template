import request from "@/services/request.ts";
import { ResponseDataType } from "@/types";

const PREFIX = "/api/auth";
/**
 * 获取租户的信息
 * @param data
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<ResponseDataType<any>> => {
  return request(`${PREFIX}/login`, {
    method: "post",
    data: data,
  });
};
