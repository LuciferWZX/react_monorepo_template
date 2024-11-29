import WKSDK, {
  Channel,
  ChannelInfo,
  ChannelTypePerson,
  Conversation,
} from "wukongimjssdk";
import { ServiceManager } from "@/instances/ServiceManager.ts";
import { match } from "ts-pattern";
import { Convert } from "@/lib/convert.ts";
import { Buffer } from "buffer";
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
export const initDatasource = () => {
  /**
   * @description 会话列表的数据源
   */
  WKSDK.shared().config.provider.syncConversationsCallback = async (params?: {
    msg_count?: number;
    last_msg_seqs?: string;
  }) => {
    const uid = getUid();
    const wkConversations = await ServiceManager.wuKongService.syncConversation(
      {
        uid: uid,
        msg_count: params?.msg_count ?? 20,
        last_msg_seqs: params?.last_msg_seqs,
        version: 0,
      },
    );
    const conversations: Conversation[] = [];
    for (let i = 0; i < wkConversations.length; i++) {
      const conversation = Convert.convert.toConversation(wkConversations[i]);
      await WKSDK.shared().channelManager.fetchChannelInfo(
        conversation.channel,
      );
      conversations.push(conversation);
    }
    return conversations;
  };
  /**
   * 频道详情的数据源
   * @param channel
   */
  WKSDK.shared().config.provider.channelInfoCallback = async (
    channel: Channel,
  ) => {
    const info = new ChannelInfo();
    return match(channel)
      .with({ channelType: ChannelTypePerson }, async (_channel) => {
        const response = await ServiceManager.userService.getUserProfile(
          _channel.channelID,
        );
        if (response.code === 0 && response.data) {
          const data = response.data;

          info.title = data.nickname;
          info.logo = data.avatar || "";
          info.orgData = data;
        }
        return info;
      })
      .otherwise(() => {
        return info;
      });
  };
};
const getUid = () => {
  const uid = WKSDK.shared().config.uid;
  if (!uid) {
    throw new Error("[UID为空]");
  }
  return uid;
};
