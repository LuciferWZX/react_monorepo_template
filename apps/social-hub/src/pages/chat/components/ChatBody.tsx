import WKSDK, { Conversation } from "wukongimjssdk";
import { useChat } from "@/hooks";
import { AnimatePresence } from "framer-motion";
import ChatMessageItem from "@/pages/chat/components/ChatMessageItem.tsx";
import { IUser } from "@/types";

interface ChatBodyProps {
  conversation: Conversation | undefined;
  user: IUser;
}
const ChatBody = (props: ChatBodyProps) => {
  const { conversation, user } = props;
  const { messages } = useChat(conversation);

  return (
    <AnimatePresence>
      {messages.map((message) => {
        const isUser = message.messageID === user.id;
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
            avatar: user.avatar,
            nickname: user.nickname,
            username: user.username,
          };
        } else if (conversation) {
          const info = WKSDK.shared().channelManager.getChannelInfo(
            conversation.channel,
          );
          _user = {
            avatar: info?.orgData?.avatar,
            nickname: info?.orgData?.nickname,
            username: info?.orgData?.username,
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
    </AnimatePresence>
  );
};
export default ChatBody;
