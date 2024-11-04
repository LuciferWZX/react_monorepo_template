import { useEffect, useState } from "react";
import WKSDK, {
  Conversation,
  Message,
  PullMode,
  SyncOptions,
} from "wukongimjssdk";

export const useChat = (conversation: Conversation | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (conversation) {
      fetchMessages(conversation, {
        startMessageSeq: 0, // 开始消息列号（结果包含startMessageSeq的消息）
        endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
        limit: 30, // 每次限制数量
        pullMode: PullMode.Down, // 拉取模式 0:向下拉取 1:向上拉取
      }).then();
    }
  }, [conversation]);
  const fetchMessages = async (
    _conversation: Conversation,
    opts: SyncOptions,
  ) => {
    const messages = await WKSDK.shared().chatManager.syncMessages(
      _conversation.channel,
      opts,
    );
    setMessages(messages);
  };
  return {
    messages,
  };
};
