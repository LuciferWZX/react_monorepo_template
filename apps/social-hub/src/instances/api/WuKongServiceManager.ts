import {
  getIp,
  sendMessage,
  syncConversation,
  syncMessages,
} from "@/services/api/wukong.ts";

export class WuKongServiceManager {
  private constructor() {}
  public static getIp = getIp;
  public static syncConversation = syncConversation;
  public static sendMessage = sendMessage;
  public static syncMessages = syncMessages;
}