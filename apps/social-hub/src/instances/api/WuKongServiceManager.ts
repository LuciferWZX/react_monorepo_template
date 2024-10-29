import { getIp, syncConversation } from "@/services/api/wukong.ts";

export class WuKongServiceManager {
  private constructor() {}
  public static getIp = getIp;
  public static syncConversation = syncConversation;
}
