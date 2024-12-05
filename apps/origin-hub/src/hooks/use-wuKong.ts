import { AppUser, ResponseCode } from "@/types";
import { useLayoutEffect } from "react";
import { ServiceManager } from "@/instances/ServiceManager.ts";
import WKSDK, {
  Channel,
  CMDContent,
  ConnectStatus,
  Conversation,
  ConversationAction,
  Message,
} from "wukongimjssdk";
import { match } from "ts-pattern";
import { useChatStore, useWuKongStore } from "@/stores";
import { ChatManager } from "@/instances/ChatManager.ts";
import { CMDType } from "@/instances/CMDType.ts";

export const useWuKong = (appUser: AppUser) => {
  useLayoutEffect(() => {
    initialWuKong(appUser).then();
  }, [appUser.access_token]);
  /**
   * @description 初始化悟空IM的连接与监听等事件
   * @param user
   */
  const initialWuKong = async (user: AppUser) => {
    const response = await ServiceManager.wuKongService.getIPAddressesIp({
      uid: user.id,
    });
    console.info("[获取连接IP地址]:", response);
    if (response.code === ResponseCode.success) {
      const { ws_addr } = response.data;
      WKSDK.shared().config.addr = ws_addr;
      WKSDK.shared().config.uid = user.id;
      WKSDK.shared().config.token = user.access_token;
      //监听连接状态
      WKSDK.shared().connectManager.addConnectStatusListener(
        connectStatusListener,
      );
      //监听消息列表
      WKSDK.shared().conversationManager.addConversationListener(
        conversationListener,
      );
      //监听CMD消息
      WKSDK.shared().chatManager.addCMDListener(cmdListener); // 监听cmd消息
      //开始连接
      WKSDK.shared().connectManager.connect();
      return () => {
        //取消监听连接状态
        WKSDK.shared().connectManager.removeConnectStatusListener(
          connectStatusListener,
        );
        //取消自定义消息的监听
        WKSDK.shared().chatManager.removeCMDListener(cmdListener);
        //断开连接
        WKSDK.shared().connectManager.disconnect();
      };
    }
  };
  /**
   * @description 监听CMD消息
   * @param msg
   */
  const cmdListener = (msg: Message) => {
    console.info("[收到CMD]：", msg);
    const cmdContent = msg.content as CMDContent;
    match(cmdContent.cmd).with(CMDType.CLEAR_UNREAD, () => {
      const contentParam = cmdContent.param as Channel;
      const clearChannel = new Channel(
        contentParam.channelID,
        contentParam.channelType,
      );
      clearConversationUnread(clearChannel);
    });
  };
  /**
   * @description 清空未读数量
   * @param channel
   */
  const clearConversationUnread = (channel: Channel) => {
    const conversation =
      WKSDK.shared().conversationManager.findConversation(channel);
    if (conversation) {
      conversation.unread = 0;
      WKSDK.shared().conversationManager.notifyConversationListeners(
        conversation,
        ConversationAction.update,
      );
    }
  };
  /**
   * @description 监听连接状态
   * @param status
   * @param reasonCode
   */
  const connectStatusListener = async (
    status: ConnectStatus,
    reasonCode?: number,
  ) => {
    useWuKongStore.setState({ status });
    await match(status)
      .with(ConnectStatus.Connected, async () => {
        console.info("[连接成功]");
        await ChatManager.syncRecentConversations();
      })
      .with(ConnectStatus.Connecting, () => {
        console.info("[连接中]");
      })
      .otherwise(() => {
        console.error("[连接失败]:", reasonCode);
      });
  };
  /**
   * @description 监听消息列表
   * @param conversation
   * @param action
   */
  const conversationListener = async (
    conversation: Conversation,
    action: ConversationAction,
  ) => {
    match(action)
      .with(ConversationAction.add, async () => {
        console.info("[新增最近会话]:", conversation, action);
        await WKSDK.shared().channelManager.fetchChannelInfo(
          conversation.channel,
        );
        // useChatStore.setState((oldStore) => {
        //   return {
        //     conversations: oldStore.conversations.concat(conversation),
        //   };
        // });
      })
      .with(ConversationAction.update, async () => {
        console.info("[更新最近会话]:", conversation, action);
        useChatStore.setState((oldChatStore) => {
          return {
            conversations: oldChatStore.conversations.map((oldCon) => {
              if (oldCon.channel.channelID === conversation.channel.channelID) {
                return conversation;
              }
              return oldCon;
            }),
          };
        });
      })
      .with(ConversationAction.remove, () => {
        console.log("[删除最近会话]:", conversation, action);
        // useChatStore.setState((oldStore) => {
        //   return {
        //     conversations: oldStore.conversations.filter(
        //         (cs) => cs.channel.channelID !== conversation.channel.channelID,
        //     ),
        //   };
        // });
      });
  };
};
