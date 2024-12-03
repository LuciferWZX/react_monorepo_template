import WKSDK, {
  Conversation,
  Message,
  PullMode,
  SyncOptions,
} from "wukongimjssdk";
import { useLayoutEffect, useState } from "react";

const useMessage = (conversation: Conversation) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useLayoutEffect(() => {
    initMessage().then();
  }, [conversation.channel.channelID]);
  /**
   * @description 初始化消息列表
   */
  const initMessage = async () => {
    try {
      const _messages = await fetchMessages(conversation, {
        startMessageSeq: 0, // 开始消息列号（结果包含startMessageSeq的消息）
        endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
        limit: 10, // 每次限制数量
        pullMode: PullMode.Down, // 拉取模式 0:向下拉取 1:向上拉取
      });
      setMessages(_messages);
    } catch (e) {
      console.info("[获取messages失败]:", e);
      setMessages([]);
    }
  };

  /**
   * @description 获取消息列表
   * @param _conversation
   * @param opts
   */
  const fetchMessages = async (
    _conversation: Conversation,
    opts: SyncOptions,
  ) => {
    return await WKSDK.shared().chatManager.syncMessages(
      _conversation.channel,
      opts,
    );
  };

  return {
    messages: messages,
  };
};
export default useMessage;
