import ChatHeader from "@/pages/chat/components/ChatHeader.tsx";
import ChatBody from "@/pages/chat/components/ChatBody.tsx";
import ChatBottom from "@/pages/chat/components/ChatBottom.tsx";
import { useChat } from "@/pages/chat/components/ChatProvider.tsx";
import { match } from "ts-pattern";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import WKSDK from "wukongimjssdk";
import { useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { ScrollArea } from "@/components";

export const ChatContextPage = () => {
  return <Outlet />;
};
const ChatContext = () => {
  const { user, setUser } = useChat();
  const { id } = useParams();
  const [conversations] = useChatStore(
    useShallow((state) => [state.conversations]),
  );
  const conversation = useMemo(() => {
    return conversations.find(
      (conversation) => conversation.channel.channelID === id,
    );
  }, [conversations, id]);
  useEffect(() => {
    if (conversation) {
      const info = WKSDK.shared().channelManager.getChannelInfo(
        conversation.channel,
      );
      if (!info) {
        WKSDK.shared()
          .channelManager.fetchChannelInfo(conversation.channel)
          .then(() => {
            const remoteInfo = WKSDK.shared().channelManager.getChannelInfo(
              conversation.channel,
            );
            if (remoteInfo) {
              setUser(remoteInfo.orgData);
            }
          });

        return;
      }
      setUser(info.orgData);
    }
  }, [conversation]);
  return (
    <div className={"h-full w-full flex flex-col overflow-auto "}>
      {match(user)
        .with(null, () => {
          return (
            <span className={"mx-auto my-auto text-muted-foreground"}>
              空空如也哦
            </span>
          );
        })
        .otherwise((_user) => {
          return (
            <>
              <div className={"flex-shrink-0"}>
                <ChatHeader user={_user} />
              </div>
              <div className={"flex-1 overflow-auto "}>
                <ScrollArea
                  // classes={{
                  //   viewport:
                  //     "break-all [&>div]:!flex [&>div]:!break-word [&>div]:!overflow-hidden",
                  // }}
                  hideX={true}
                  className={"px-2 break-all h-full w-full "}
                >
                  <ChatBody user={_user} conversation={conversation} />
                </ScrollArea>
              </div>
              <div className={"flex-shrink-0"}>
                <ChatBottom conversation={conversation} user={_user} />
              </div>
            </>
          );
        })}
    </div>
  );
};
export default ChatContext;
