import request from "@/services/request.ts";
import { IUser, ResponseDataType } from "@/types";
import { FriendRequestRecord, RequestStatus } from "@/types/friend.ts";

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
/**
 * 搜索好友请求列表
 */
export const getFriendRequestList = async (): Promise<
  ResponseDataType<FriendRequestRecord[]>
> => {
  return request(`${PREFIX}/friend/request/list`, {
    method: "get",
  });
};
export const getUserSimpleInfo = async (
  uid: string,
): Promise<
  ResponseDataType<Omit<
    IUser,
    "deletedAt" | "createAt" | "access_token"
  > | null>
> => {
  return request(`${PREFIX}/${uid}`, {
    method: "get",
  });
};
/**
 * 获取好友列表
 */
export const getFriends = async (): Promise<ResponseDataType<IUser[]>> => {
  return request(`${PREFIX}/friend/list`, {
    method: "get",
  });
};
/**
 * 发送好友请求
 * @param data
 */
export const sendFriendRequest = async (data: {
  friendId: string;
}): Promise<ResponseDataType<null>> => {
  return request(`${PREFIX}/friend/request`, {
    method: "post",
    data,
  });
};
export const handleFriendRequest = async (data: {
  id: string;
  type: RequestStatus;
}): Promise<ResponseDataType<null>> => {
  return request(`${PREFIX}/friend/request/handle`, {
    method: "post",
    data,
  });
};
