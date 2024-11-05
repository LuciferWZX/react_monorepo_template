import { useLayoutEffect, useState } from "react";
import WKSDK, {
  Conversation,
  Message,
  PullMode,
  SyncOptions,
} from "wukongimjssdk";
import { nanoid } from "nanoid";

export const useChat = (
  conversation: Conversation | undefined,
  config: {
    needToBottom: boolean;
    toBottom: () => void;
  },
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  useLayoutEffect(() => {
    if (conversation) {
      fetchMessages(conversation, {
        startMessageSeq: 0, // 开始消息列号（结果包含startMessageSeq的消息）
        endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
        limit: 30, // 每次限制数量
        pullMode: PullMode.Down, // 拉取模式 0:向下拉取 1:向上拉取
      }).then(() => {
        config.toBottom();
      });
    }
  }, [conversation]);
  useLayoutEffect(() => {
    //监听消息接收
    WKSDK.shared().chatManager.addMessageListener(messageListener);
    return () => {
      WKSDK.shared().chatManager.removeMessageListener(messageListener);
    };
  }, [conversation?.channel.channelID]);
  const messageListener = async (message: Message) => {
    if (message.channel.channelID !== conversation?.channel.channelID) {
      return;
    }
    setMessages((oldMessages) => {
      if (!message.messageID) {
        message.messageID = nanoid(19);
      }
      return oldMessages.concat(message);
    });
  };
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
    messages: [...messages].reverse(),
  };
};
