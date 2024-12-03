import {
  getIPAddresses,
  syncConversation,
  syncMessage,
} from "@/services/api/wukong.ts";

export class WuKongServiceManager {
  private constructor() {}
  public static getIPAddressesIp = getIPAddresses;
  public static syncConversation = syncConversation;
  // public static sendMessage = sendMessage;
  public static syncMessage = syncMessage;
  // public static setUnread = setUnread;
}
