import { motion } from "framer-motion";
import { Message } from "wukongimjssdk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { cn } from "@/lib/utils.ts";
import { useChatItem } from "@/hooks";
import { useMemo } from "react";
import { getTimeStringAutoShort } from "@/lib/time.ts";

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
  const { getMessageContent } = useChatItem();
  const content = useMemo(() => {
    return getMessageContent(message);
  }, [message]);
  return (
    <motion.div
      key={message.messageID}
      // initial={{ opacity: 0, y: 50, scale: 0.3 }}
      // animate={{ opacity: 1, y: 0, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      // transition={{ type: "spring", stiffness: 500, damping: 40 }}
      // className={`group break-all p-2 w-full    flex ${sender === "user" ? "justify-end" : "justify-start"}`}
      className={"group p-2"}
    >
      <div
        className={cn("w-full flex flex-row items-start gap-2", {
          "flex-row-reverse ": sender === "user",
        })}
        // className={`w-full flex  ${sender === "user" ? "flex-row-reverse" : "flex-row"} items-start space-x-2`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`${user.avatar}?height=32&width=32&text=${user.nickname.charAt(0)}`}
            alt={user.nickname}
          />
          <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={""}>
          <div
            className={cn("flex flex-col", {
              "items-end": sender === "user",
            })}
          >
            <span
              className={cn(
                `flex text-xs  text-start text-muted-foreground mb-1`,
                {
                  "flex-row-reverse text-end": sender === "user",
                },
              )}
            >
              {user.nickname}{" "}
              <span
                className={cn("hidden ms-1 group-hover:inline-flex", {
                  "me-1": sender === "user",
                })}
              >
                {getTimeStringAutoShort(message.timestamp * 1000, true)}
              </span>
            </span>
            <div>
              <div
                className={cn(
                  "inline-flex gap-2 rounded-lg px-3 py-2 text-sm bg-muted break-all ",
                  {
                    [` bg-primary text-white`]: sender === "user",
                  },
                )}
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ChatMessageItem;
