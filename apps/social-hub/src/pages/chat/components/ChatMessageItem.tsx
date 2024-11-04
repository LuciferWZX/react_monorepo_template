import { motion } from "framer-motion";
import { Message } from "wukongimjssdk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { cn } from "@/lib/utils.ts";
import { useChatItem } from "@/hooks";
import { useMemo } from "react";

interface ChatMessageItemProps {
  message: Message;
  sender: "user" | undefined;
  user: {
    avatar: string;
    nickname: string;
    username: string;
  };
}
const ChatMessageItem = (props: ChatMessageItemProps) => {
  const { message, user, sender } = props;
  console.log(333, message);
  const { getMessageContent } = useChatItem();
  const content = useMemo(() => {
    return getMessageContent(message);
  }, [message]);
  console.log(2343, content);
  return (
    <motion.div
      key={message.messageID}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`w-full flex ${sender === "user" ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`${user.avatar}?height=32&width=32&text=${user.nickname.charAt(0)}`}
            alt={user.nickname}
          />
          <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span
            className={`text-xs ${sender === "user" ? "text-right" : "text-left"} text-gray-500 mb-1`}
          >
            {user.nickname}
          </span>
          <div
            className={cn(
              "flex w-max  flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted break-all",
              {
                [`flex w-max  flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground`]:
                  sender === "user",
              },
            )}
          >
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ChatMessageItem;
