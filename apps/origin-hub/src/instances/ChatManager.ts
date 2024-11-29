import WKSDK, { Message, MessageText, Subscriber } from "wukongimjssdk";
import { useChatStore } from "@/stores";
import { match, P } from "ts-pattern";

export class ChatManager {
  public static async syncRecentConversations() {
    console.info("[同步最新会话]");
    const conversations = await WKSDK.shared().conversationManager.sync();
    useChatStore.setState({ conversations: conversations });
  }
  public static getLastMessageText(
    message?: Message,
    subscribers?: Subscriber[],
  ) {
    if (!message) {
      return "";
    }
    const sender = subscribers?.find((sb) => sb.uid === message.fromUID);
    const content = match(message.content)
      .with(P.instanceOf(MessageText), (_text) => {
        return _text.text;
      })
      // .with(P.instanceOf(InviteContent), () => {
      //   return `[系统消息]`;
      // })
      .otherwise(() => {
        return "[格式不正确]";
      });
    return sender ? `${sender.name}：${content}` : content;
  }
}