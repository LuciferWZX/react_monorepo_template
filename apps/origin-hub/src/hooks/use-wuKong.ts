import { AppUser, ResponseCode } from "@/types";
import { useLayoutEffect } from "react";
import { ServiceManager } from "@/instances/ServiceManager.ts";
import WKSDK, {
  ConnectStatus,
  Conversation,
  ConversationAction,
} from "wukongimjssdk";
import { match } from "ts-pattern";
import { useWuKongStore } from "@/stores";
import { ChatManager } from "@/instances/ChatManager.ts";

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
      //开始连接
      WKSDK.shared().connectManager.connect();
      return () => {
        //取消监听连接状态
        WKSDK.shared().connectManager.removeConnectStatusListener(
          connectStatusListener,
        );
        //断开连接
        WKSDK.shared().connectManager.disconnect();
      };
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
        // useChatStore.setState((oldChatStore) => {
        //   return {
        //     conversations: oldChatStore.conversations.map((oldCon) => {
        //       if (oldCon.channel.channelID === conversation.channel.channelID) {
        //         if (fid === conversation.channel.channelID) {
        //           conversation.unread = 0;
        //         }
        //         return conversation;
        //       }
        //       return oldCon;
        //     }),
        //   };
        // });
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
