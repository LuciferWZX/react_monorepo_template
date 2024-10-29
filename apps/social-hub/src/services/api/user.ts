import request from "@/services/request.ts";
import { IUser, ResponseDataType } from "@/types";

const PREFIX = "/api/user";
/**
 * 搜索用户
 * @param data
 */
export const search = async (data: {
  exact: string;
}): Promise<ResponseDataType<IUser | null>> => {
  return request(`${PREFIX}/search`, {
    method: "post",
    data: data,
  });
};
// export const profile = async (): Promise<ResponseDataType<IUser>> => {
//   return request(`${PREFIX}/profile`, {
//     method: "get",
//   });
// };
