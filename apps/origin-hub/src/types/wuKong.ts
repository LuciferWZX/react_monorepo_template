import { ChannelTypePerson } from "wukongimjssdk";
export type WKMessageType = {
  header: {
    // 消息头
    no_persist: 0 | 1; // 是否不存储消息 0.存储 1.不存储
    red_dot: 0 | 1; // 是否显示红点计数，0.不显示 1.显示
    sync_once: 0 | 1; // 是否是写扩散，这里一般是0，只有cmd消息才是1 ，cmd消息在这里也不可能查的到，因为cmd消息不会存储到最近会话里
  };
  setting: number; // 消息设置 消息设置是一个 uint8的数字类型 为1个字节，完全由第三方自定义 比如定义第8位为已读未读回执标记，开启则为0000 0001 = 1
  message_id: number; // 消息全局唯一ID
  client_msg_no: string; // 客户端定义的消息编号(一般为32位的uuid)，可用此字段去重
  message_seq: number; // 消息序列号 （频道唯一，有序递增）
  from_uid: string; // 发送者用户id
  channel_id: string; // 频道ID
  channel_type: typeof ChannelTypePerson | typeof ChannelTypePerson; // 频道类型 1.个人频道 2.群频道
  timestamp: number; // 消息10位到秒的时间戳
  payload: string; // base64编码的消息内容
};
export type WKConversationType = {
  id: string;
  channel_id: string; // 频道ID
  channel_type: typeof ChannelTypePerson | typeof ChannelTypePerson; // 频道类型 1.单聊 2.群聊 3.客服
  unread: number; // 消息未读数量
  timestamp: number; // 10位到秒的时间戳
  last_msg_seq: number; // 最后一条消息的message_seq
  last_client_msg_no: string; // 最后一条消息的客户端消息编号
  version: number; // 数据版本编号
  recents: WKMessageType[]; // 最近N条消息
};
export enum WkMessageContentType {
  text = 1,
}
