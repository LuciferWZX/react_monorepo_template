import { Message } from "wukongimjssdk";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import MessageBubble from "@/components/message-bubble";
import { BaseUser } from "@/types";
import { useChat, useUser } from "@/components";

interface ChatListProps {
  messages: Message[];
  users: BaseUser[];
}
const ChatList = (props: ChatListProps) => {
  const { messages, users } = props;
  const { conversation } = useChat();
  const { user } = useUser();
  return (
    <ScrollArea className={"flex-1 break-all"}>
      <div className={"flex flex-col w-full gap-2 py-2"}>
        {messages.map((message) => {
          const isAppUser = message.fromUID === user.id;
          let _user: BaseUser | undefined = undefined;
          if (isAppUser) {
            _user = user;
          } else if (!message.fromUID) {
            _user = conversation.channelInfo?.orgData;
          } else {
            _user = users.find((_u) => _u.id === message.fromUID);
          }
          return (
            <MessageBubble
              role={isAppUser ? "app-user" : "base-user"}
              user={_user}
              message={message}
              key={message.messageID}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};
export default ChatList;
