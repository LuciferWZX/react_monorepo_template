import { Message } from "wukongimjssdk";
import { useMemo } from "react";
import { BaseUser } from "@/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { ChatManager } from "@/instances/ChatManager.ts";
import { cn } from "@/lib/utils.ts";
import { getTimeStringAutoShort } from "@/lib/time.ts";

interface MessageBubbleProps {
  message: Message;
  user: BaseUser | undefined;
  role: "app-user" | "base-user";
}
const MessageBubble = (props: MessageBubbleProps) => {
  const { message, user, role } = props;

  const isAppUser = role === "app-user";
  const content = useMemo(() => {
    return ChatManager.getMessageContent(message);
  }, [message]);
  const avatar = useMemo(() => {
    return (
      <div className={"flex-shrink-1"}>
        <Avatar>
          <AvatarImage src={user?.avatar ?? undefined} alt={user?.nickname} />
          <AvatarFallback>
            {user?.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }, [user?.avatar, user?.nickname]);
  const messageContent = useMemo(() => {
    return (
      <div
        className={cn("flex-1 flex group", {
          "flex-row-reverse": isAppUser,
        })}
      >
        <div
          className={cn("flex flex-col items-start gap-1", {
            "items-end": isAppUser,
          })}
        >
          <div
            className={cn("text-xs text-muted-foreground flex gap-2", {
              "flex-row-reverse": isAppUser,
            })}
          >
            <span>{user?.nickname}</span>
            <span className={cn("hidden group-hover:inline")}>
              {getTimeStringAutoShort(message.timestamp * 1000, true)}
            </span>
          </div>
          <div
            className={cn(
              "w-fit text-sm max-w-lg px-3 py-1 rounded-lg bg-muted",
              {
                "bg-primary text-primary-foreground": isAppUser,
              },
            )}
          >
            {content}
          </div>
        </div>
      </div>
    );
  }, [user?.nickname]);
  return (
    <div
      className={cn("flex gap-2  px-2 ", {
        "flex-row-reverse": isAppUser,
      })}
    >
      {avatar}
      {messageContent}
    </div>
  );
};
export default MessageBubble;
