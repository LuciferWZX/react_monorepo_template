import WKSDK, {
  Conversation,
  Message,
  PullMode,
  SyncOptions,
} from "wukongimjssdk";
import { useLayoutEffect, useState } from "react";

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
