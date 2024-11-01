import ChatHeader from "@/pages/chat/components/ChatHeader.tsx";
import ChatBody from "@/pages/chat/components/ChatBody.tsx";
import ChatBottom from "@/pages/chat/components/ChatBottom.tsx";
import { useChat } from "@/pages/chat/components/ChatProvider.tsx";
import { match } from "ts-pattern";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import WKSDK from "wukongimjssdk";

export const ChatContextPage = () => {
  return <Outlet />;
};
const ChatContext = () => {
  const { user, setUser } = useChat();
  const { id } = useParams();
  const conversations = useChatStore(
    useShallow((state) => state.conversations),
  );
  console.log(1111, id);
  useEffect(() => {
    const conversation = conversations.find(
      (conversation) => conversation.channel.channelID === id,
    );
    if (conversation) {
      let info = WKSDK.shared().channelManager.getChannelInfo(
        conversation.channel,
      );
      if (!info) {
        WKSDK.shared()
          .channelManager.fetchChannelInfo(conversation.channel)
          .then(() => {
            info = WKSDK.shared().channelManager.getChannelInfo(
              conversation.channel,
            );
          });
      }
      setUser(info?.orgData);
    }
  }, [id]);
  return (
    <div className={"h-full flex flex-col"}>
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
              <div className={"flex-1"}>
                <ChatBody />
              </div>
              <div className={"flex-shrink-0"}>
                <ChatBottom />
              </div>
            </>
          );
        })}
    </div>
  );
};
export default ChatContext;
