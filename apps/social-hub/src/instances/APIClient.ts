import WKSDK, { Channel, ChannelTypePerson } from "wukongimjssdk";
import { APIManager } from "@/instances/APIManager.ts";
export class CMDType {
  static CMDTypeClearUnread = "clearUnread";
}
export default class APIClient {
  public static shared = new APIClient();
  clearUnread = async (channel: Channel) => {
    return APIManager.wuKongService
      .setUnread({
        uid: WKSDK.shared().config.uid!,
        channel_id: channel.channelID,
        channel_type: channel.channelType,
        unread: 0,
      })
      .then(() => {
        // 这里uid指定的是自己，意味着如果是多端登录，其他端也会收到这条消息
        this.sendCMD(
          new Channel(WKSDK.shared().config.uid!, ChannelTypePerson),
          CMDType.CMDTypeClearUnread,
          channel,
        );
      })
      .catch((err) => {
        console.error("清空未读出错:", err);
      });
  };
  // 此处仅做演示
  // 此方法应该在自己的业务后端调用
  sendCMD = async <T = any>(channel: Channel, cmd: string, param?: T) => {
    // 转换成base64
    const buffer = Buffer.from(
      JSON.stringify({
        type: 99, // cmd固定type为99
        cmd: cmd,
        param: param,
      }),
      "utf-8",
    );

    const base64 = buffer.toString("base64");

    return APIManager.wuKongService.sendMessage({
      header: {
        // 消息头
        no_persist: 1, // 是否不存储消息 0.存储 1.不存储
        red_dot: 1, // 是否显示红点计数，0.不显示 1.显示
        sync_once: 1, // 是否是写扩散，这里一般是0，只有cmd消 息才是1
      },
      from_uid: "", // 发送者uid
      channel_id: channel.channelID, // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
      channel_type: channel.channelType, // 接收频道类型  1.个人频道 2.群聊频道
      payload: base64, // 消息内容，base64编码
      subscribers: [], // 订阅者 如果此字段有值，表示消息只发给指定的订阅者,没有值则发给频道内所有订阅者
    });
  };
}
