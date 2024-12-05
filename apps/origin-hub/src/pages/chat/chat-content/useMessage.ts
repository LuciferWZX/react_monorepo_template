import WKSDK, {
  Conversation,
  Message,
  MessageStatus,
  PullMode,
  SendackPacket,
  SyncOptions,
} from "wukongimjssdk";
import { useLayoutEffect, useState } from "react";
import { nanoid } from "nanoid";

const useMessage = (
  conversation: Conversation,
  // config: {
  //   scrollToBottom: () => void;
  // },
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [controller, setController] = useState<AbortController | undefined>(
    new AbortController(),
  );
  // const [needScrollToBottom, setNeedScrollToBottom] = useState<boolean>(true);
  // useLayoutEffect(() => {
  //   const abort = () => {
  //     console.log("取消请求!");
  //   };
  //   controller && controller.signal.addEventListener("abort", abort);
  //   return () => {
  //     controller && controller.signal.removeEventListener("abort", abort);
  //   };
  // }, [controller]);
  useLayoutEffect(() => {
    if (controller) {
      controller.abort("取消向下拉取请求");
      setController(undefined);
    }
    setHasMore(true);
    initMessage().then(() => {});
  }, [conversation.channel.channelID]);
  useLayoutEffect(() => {
    //监听消息信息列表
    WKSDK.shared().chatManager.addMessageListener(messageListener);
    WKSDK.shared().chatManager.addMessageStatusListener(messageStatusListener);
    return () => {
      //移除监听
      WKSDK.shared().chatManager.removeMessageListener(messageListener);
    };
  }, [conversation.channel.channelID]);
  /**
   * @description 处理新消息
   * @param message
   */
  const messageListener = (message: Message) => {
    console.info("[新消息]", message);
    if (message.channel.channelID === conversation.channel.channelID) {
      setMessages((oldMessages) => {
        message.messageID = nanoid(10);
        return oldMessages.concat(message);
      });
      // if (msg.fromUID === WKSDK.shared().config.uid || ref.current?.bottom) {
      //   //说明发送者是我自己，这时候应该滚到到最底部
      //   requestAnimationFrame(() => {
      //     setTimeout(() => {
      //       ref.current?.scrollTo("bottom");
      //     });
      //   });
      // }
    }
  };
  const messageStatusListener = (packet: SendackPacket) => {
    console.log("[发送状态]:", packet);
    setMessages((oldMessages) => {
      return oldMessages.map((message) => {
        if (message.clientSeq === packet.clientSeq) {
          message.status =
            packet.reasonCode == 1 ? MessageStatus.Normal : MessageStatus.Fail;
          message.messageID = packet.messageID.toString();
          return message;
        }
        return message;
      });
    });
  };

  /**
   * @description 初始化消息列表
   */
  const initMessage = async () => {
    try {
      const _messages = await fetchMessages(conversation, {
        startMessageSeq: 0, // 开始消息列号（结果包含startMessageSeq的消息）
        endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
        limit: 20, // 每次限制数量
        pullMode: PullMode.Down, // 拉取模式 0:向下拉取 1:向上拉取
      });
      setMessages(_messages);
      if (_messages.length === 0 || _messages.length < 20) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (e) {
      console.info("[获取messages失败]:", e);
      setMessages([]);
      setHasMore(false);
    }
  };

  /**
   * @description 获取消息列表
   * @param _conversation
   * @param opts
   */
  const fetchMessages = async (
    _conversation: Conversation,
    opts: SyncOptions & {
      signal?: AbortSignal;
    },
  ) => {
    return await WKSDK.shared().chatManager.syncMessages(
      _conversation.channel,
      opts,
    );
  };
  const getNextMessages = async () => {
    if (messages.length === 0) {
      return;
    }
    const startMessageSeq = messages[0].messageSeq;
    try {
      if (controller) {
        controller.abort("[取消请求]");
      }
      const _controller = new AbortController();
      setController(_controller);
      const _messages = await fetchMessages(conversation, {
        startMessageSeq: startMessageSeq - 1, // 开始消息列号（结果包含startMessageSeq的消息）
        endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
        limit: 10, // 每次限制数量
        pullMode: PullMode.Down, // 拉取模式 0:向下拉取 1:向上拉取
        signal: _controller.signal,
      });
      if (_messages.length === 0 || _messages.length < 20) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setMessages((prevMessages) => {
        return _messages.concat(prevMessages);
      });
      setController(undefined);
    } catch (e) {
      console.error("[请求出错]:", e);
      setHasMore(false);
      setController(undefined);
    }
  };
  return {
    messages: messages,
    getNextMessages,
    hasMore,
  };
};
export default useMessage;
