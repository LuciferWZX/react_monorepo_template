// import request from "@/services/request.ts";
// import { ResponseDataType } from "@/types";
// import { ChannelTypeGroup, ChannelTypePerson, Message } from "wukongimjssdk";
// import { WKConversationType } from "@/types/chat.ts";
import { ResponseDataType, WKConversationType } from "@/types";
import request from "../request";
import { Message } from "wukongimjssdk";

const PREFIX = "/api/wuKong";
const REQUEST_URL = "http://127.0.0.1:5001";
/**
 * @description 获取wukongim的链接ip的信息
 */
export const getIPAddresses = async (params: {
  uid: string;
}): Promise<
  ResponseDataType<{
    tcp_addr: string;
    ws_addr: string;
    wss_addr: string;
  }>
> => {
  return request(`${PREFIX}/ip`, {
    method: "get",
    params: { uid: params.uid },
  });
};
/**
 * @description 同步会话列表
 * @param data
 */
export const syncConversation = async (data: {
  uid: string; // 当前登录用户uid
  version: number; //  当前客户端的会话最大版本号(从保存的结果里取最大的version，如果本地没有数据则传0)，
  last_msg_seqs?: string; //   客户端所有频道会话的最后一条消息序列号拼接出来的同步串 格式： channelID:channelType:last_msg_seq|channelID:channelType:last_msg_seq  （此字段非必填，如果不填就获取全量数据，填写了获取增量数据，看你自己的需求。）
  msg_count: number; // 每个会话获取最大的消息数量，一般为app点进去第一屏的数据
}): Promise<WKConversationType[]> => {
  return request(`${REQUEST_URL}/conversation/sync`, {
    method: "post",
    data: data,
  });
};
export const syncMessage = async (
  data: {
    login_uid: string; // 当前登录用户uid
    channel_id: string; //  频道ID
    channel_type: 1 | 2 | number; // 频道类型
    start_message_seq: number; // 开始消息列号（结果包含start_message_seq的消息）
    end_message_seq: number; // 结束消息列号（结果不包含end_message_seq的消息）
    limit: number; // 消息数量限制
    pull_mode: 0 | 1; // 拉取模式 0:向下拉取 1:向上拉取
  },
  signal?: AbortSignal,
): Promise<{
  start_message_seq: number; // 查询的start_message_seq
  end_message_seq: number; // 查询的end_message_seq
  more: 0 | 1; // 是否有更多  0.无 1.有
  messages: Message[];
}> => {
  return request(`${REQUEST_URL}/channel/messagesync`, {
    method: "post",
    data: data,
    signal: signal,
  });
};
// export const sendMessage = async (data: {
//   header: {
//     // 消息头
//     no_persist: 0 | 1; // 是否不存储消息 0.存储 1.不存储
//     red_dot: 0 | 1; // 是否显示红点计数，0.不显示 1.显示
//     sync_once: 0 | 1; // 是否是写扩散，这里一般是0，只有cmd消息才是1
//   };
//   from_uid: string; // 发送者uid
//   stream_no?: string; // 流式消息编号，如果是流式消息，需要指定，否则为空
//   channel_id: string; // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
//   channel_type: typeof ChannelTypePerson | typeof ChannelTypeGroup | number; // 接收频道类型  1.个人频道 2.群聊频道
//   payload: string; // 消息，base64编码，消息格式参考下面 【payload 内容参考】的链接
//   subscribers: string[]; // 订阅者 如果此字段有值，表示消息只发给指定的订阅者,没有值则发给频道内所有订阅者
// }) => {
//   return request(`${REQUEST_URL}/message/send`, {
//     method: "post",
//     data: data,
//   });
// };
// export const setUnread = async (data: {
//   uid: string;
//   channel_id: string; // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
//   channel_type: typeof ChannelTypePerson | typeof ChannelTypeGroup | number; // 接收频道类型  1.个人频道 2.群聊频道
//   unread: number;
// }) => {
//   return request(`${REQUEST_URL}/conversations/setUnread`, {
//     method: "post",
//     data: data,
//   });
// };
