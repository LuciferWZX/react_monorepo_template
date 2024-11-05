import { useEffect } from "react";
import { APIManager } from "@/instances";
import { useAppStore, useChatStore, useWuKongStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { ResponseCode } from "@/types";
import WKSDK, {
  ConnectStatus,
  Conversation,
  ConversationAction,
} from "wukongimjssdk";
import { match } from "ts-pattern";

export function useWuKong() {
  const [id, accessToken] = useAppStore(
    useShallow((state) => [state.user?.id, state.user?.access_token]),
  );
  useEffect(() => {
    if (id && accessToken) {
      initialWuKong(id, accessToken).then();
    }
  }, [id, accessToken]);
  const initialWuKong = async (uid: string, token: string) => {
    const ipResponse = await APIManager.wuKongService.getIp({ uid: uid });
    if (ipResponse.code === ResponseCode.success) {
      useWuKongStore.setState({ ip: ipResponse.data });
      const { ws_addr } = ipResponse.data;
      WKSDK.shared().config.addr = ws_addr;
      WKSDK.shared().config.uid = uid;
      WKSDK.shared().config.token = token;

      //监听连接状态
      WKSDK.shared().connectManager.addConnectStatusListener(
        connectStatusListener,
      );

      //监听消息列表
      WKSDK.shared().conversationManager.addConversationListener(
        conversationListener,
      );

      WKSDK.shared().connectManager.connect();
      return () => {
        //取消监听连接状态
        WKSDK.shared().connectManager.removeConnectStatusListener(
          connectStatusListener,
        );
        WKSDK.shared().conversationManager.removeConversationListener(
          conversationListener,
        );
        WKSDK.shared().connectManager.disconnect();
      };
    }
  };
  const syncConversation = async () => {
    console.info("正在同步一次最近会话");
    const latestConversations = await WKSDK.shared().conversationManager.sync();
    useChatStore.setState({ conversations: latestConversations });
    console.info("同步完成");
  };

  const conversationListener = async (
    conversation: Conversation,
    action: ConversationAction,
  ) => {
    console.log("[action]", { action });
    match(action)
      .with(ConversationAction.add, async () => {
        console.log("新增最近会话", conversation);
        await WKSDK.shared().channelManager.fetchChannelInfo(
          conversation.channel,
        );
        useChatStore.setState((oldStore) => {
          return {
            conversations: oldStore.conversations.concat(conversation),
          };
        });
      })
      .with(ConversationAction.update, async () => {
        console.log("更新最近会话", conversation);
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
        // if (channelID === conversation.channel.channelID) {
        //   await setUnread({
        //     uid: WKSDK.shared().config.uid!,
        //     channel_id: conversation.channel.channelID,
        //     channel_type: conversation.channel.channelType,
        //     unread: 0,
        //   }).then((res) => {
        //     if (res.code === 0 && res.data.status === 200) {
        //       conversation.unread = 0;
        //     }
        //   });
        //   //   //说明我在当前页
        //   //   WuKongClient.shared.clearUnread(conversation.channel);
        // }
        // useChatStore.setState((oldStore) => {
        //   return {
        //     conversations: oldStore.conversations.map((cs) => {
        //       if (cs.channel.channelID == conversation.channel.channelID) {
        //         const temp = conversation;
        //         temp.unread = isNaN(conversation.unread)
        //             ? 0
        //             : conversation.unread;
        //         return temp;
        //       }
        //       return cs;
        //     }),
        //   };
        // });
      })
      .with(ConversationAction.remove, () => {
        console.log("删除最近会话");
        useChatStore.setState((oldStore) => {
          return {
            conversations: oldStore.conversations.filter(
              (cs) => cs.channel.channelID !== conversation.channel.channelID,
            ),
          };
        });
      });
  };
  const connectStatusListener = async (
    status: ConnectStatus,
    reasonCode?: number,
  ) => {
    useWuKongStore.setState({ status });
    await match(status)
      .with(ConnectStatus.Connected, async () => {
        console.info("🔗连接成功");
        await syncConversation();
      })
      .with(ConnectStatus.Connecting, () => {
        console.info("🔗连接中");
      })
      .otherwise(() => {
        console.error("🔗连接失败", reasonCode);
      });
  };
}
