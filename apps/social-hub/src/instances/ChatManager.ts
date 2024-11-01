import { match, P } from "ts-pattern";
import WKSDK, {
  Channel,
  ChannelTypePerson,
  ChannelTypeData,
  ChannelTypeGroup,
  MessageText,
  Subscriber,
  Message,
} from "wukongimjssdk";
export type MessageType = "text";
export type ChannelType =
  | typeof ChannelTypePerson
  | typeof ChannelTypeGroup
  | typeof ChannelTypeData;
export class ChatManager {
  private constructor() {}

  public static shared = new ChatManager();

  // async send(message:string,to: string, type: MessageType, channelType: ChannelType) {
  //    await match(type).with("text",async ()=>{
  //         await this._sendText()
  //     }).otherwise(()=>{
  //        console.error("消息类型不匹配")
  //    })
  // }
  async sendText(text: string, to: string, channelType: ChannelType) {
    const _text = new MessageText(text);
    const channel = new Channel(to, channelType);
    await WKSDK.shared().chatManager.send(_text, channel);
  }
  getLastMessageText(message?: Message, subscribers?: Subscriber[]) {
    if (!message) {
      return "";
    }
    const sender = subscribers?.find((sb) => sb.uid === message.fromUID);
    const content = match(message.content)
      .with(P.instanceOf(MessageText), (_text) => {
        // return EditorCommand.getTextFromHtmlStr(_text.text ?? '');
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
