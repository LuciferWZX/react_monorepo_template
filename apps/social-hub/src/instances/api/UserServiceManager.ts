import {
  getFriendRequestList,
  getFriends,
  getUserSimpleInfo,
  handleFriendRequest,
  search,
  sendFriendRequest,
} from "@/services/api/user.ts";

export class UserServiceManager {
  private constructor() {}
  // public static shared = new AuthServiceManager();
  public static search = search;
  public static getFriendRequestList = getFriendRequestList;
  public static sendFriendRequest = sendFriendRequest;
  public static getUserSimpleInfo = getUserSimpleInfo;
  public static handleFriendRequest = handleFriendRequest;
  public static getFriends = getFriends;
}
