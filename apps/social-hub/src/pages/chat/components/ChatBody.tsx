import { Conversation } from "wukongimjssdk";
import { useChat } from "@/hooks";
import { AnimatePresence } from "framer-motion";
import ChatMessageItem from "@/pages/chat/components/ChatMessageItem.tsx";
import { IUser } from "@/types";
import { useRef, useState } from "react";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

interface ChatBodyProps {
  conversation: Conversation | undefined;
  user: IUser;
}
const ChatBody = (props: ChatBodyProps) => {
  const { conversation, user } = props;
  const me = useAppStore(useShallow((state) => state.user!));
  const [needToBottom] = useState<boolean>(false);
  const scrollToBottom = (
    position: "end" | "start",
    config?: { mode?: "smooth" | "instant" },
  ) => {
    bottomRef.current?.scrollIntoView({
      behavior: config?.mode || "instant",
      block: position,
    });
  };
  const { messages } = useChat(conversation, {
    needToBottom,
    toBottom: () => {
      console.log("到达底部");
      requestAnimationFrame(() => {
        scrollToBottom("end");
      });
    },
  });
  const messageListRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  return (
    <AnimatePresence>
      <div ref={messageListRef} className={"flex flex-col-reverse"}>
        <div ref={bottomRef} />
        {messages.map((message) => {
          const isUser = message.fromUID === me.id;
          let _user: {
            avatar: string;
            nickname: string;
            username: string;
          } = {
            avatar: "",
            nickname: "",
            username: "",
          };
          if (isUser) {
            _user = {
              avatar: me.avatar,
              nickname: me.nickname,
              username: me.username,
            };
          } else if (conversation) {
            // const info = WKSDK.shared().channelManager.getChannelInfo(
            //   conversation.channel,
            // );
            _user = {
              avatar: user.avatar,
              nickname: user.nickname,
              username: user.username,
            };
          }
          return (
            <ChatMessageItem
              key={message.messageID}
              message={message}
              sender={isUser ? "user" : undefined}
              user={_user}
            />
          );
        })}
      </div>
    </AnimatePresence>
  );
};
export default ChatBody;
