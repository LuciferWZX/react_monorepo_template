import request from "@/services/request.ts";
import { ResponseDataType } from "@/types";
const PREFIX = "/api/wuKong";
const REQUEST_URL = "http://127.0.0.1:5001";
/**
 * 获取wukongim的链接ip的信息
 */
export const getIp = async (params: {
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
export const syncConversation = async (data: {
  uid: string; // 当前登录用户uid
  version: number; //  当前客户端的会话最大版本号(从保存的结果里取最大的version，如果本地没有数据则传0)，
  last_msg_seqs?: string; //   客户端所有频道会话的最后一条消息序列号拼接出来的同步串 格式： channelID:channelType:last_msg_seq|channelID:channelType:last_msg_seq  （此字段非必填，如果不填就获取全量数据，填写了获取增量数据，看你自己的需求。）
  msg_count: number; // 每个会话获取最大的消息数量，一般为app点进去第一屏的数据
}) => {
  return request(`${REQUEST_URL}/conversation/sync`, {
    method: "post",
    data: data,
  });
};
