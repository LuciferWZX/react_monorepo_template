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
import { motion } from "framer-motion";
import PrevSlateEditor from "@zhixin/slate_rich_editor/src/core/editor/PrevSlateEditor.tsx";
import { EditorManager } from "@zhixin/slate_rich_editor";
import ContextMenuDropdown from "@/components/context-menu";
import { Copy } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  user: BaseUser | undefined;
  role: "app-user" | "base-user";
  slateBubble?: boolean;
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
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
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
          <ContextMenuDropdown
            contentClassName={"w-30"}
            items={[
              {
                key: "copy",
                value: "copy",
                label: "复制",
                icon: Copy,
                onClick: () => {
                  navigator.clipboard.writeText(
                    EditorManager.getHtmlText(content),
                  );
                },
              },
            ]}
          >
            <div
              className={cn(
                "w-fit text-sm max-w-lg px-3 py-1 rounded-lg bg-muted",
                {
                  "bg-primary/30 dark:text-primary-foreground": isAppUser,
                },
              )}
            >
              {props.slateBubble === false ? (
                content
              ) : (
                <PrevSlateEditor
                  initialValue={EditorManager.deserialize(content)}
                />
              )}
            </div>
          </ContextMenuDropdown>
        </div>
      </motion.div>
    );
  }, [user?.nickname]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-2  px-2 pl-4", {
        "flex-row-reverse": isAppUser,
      })}
    >
      {avatar}
      {messageContent}
    </motion.div>
  );
};
export default MessageBubble;
