import { getIp, sendMessage, syncConversation } from "@/services/api/wukong.ts";

export class WuKongServiceManager {
  private constructor() {}
  public static getIp = getIp;
  public static syncConversation = syncConversation;
  public static sendMessage = sendMessage;
}
