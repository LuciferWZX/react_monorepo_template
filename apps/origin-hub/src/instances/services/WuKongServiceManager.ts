import { getIPAddresses, syncConversation } from "@/services/api/wukong.ts";

export class WuKongServiceManager {
  private constructor() {}
  public static getIPAddressesIp = getIPAddresses;
  public static syncConversation = syncConversation;
  // public static sendMessage = sendMessage;
  // public static syncMessages = syncMessages;
  // public static setUnread = setUnread;
}
