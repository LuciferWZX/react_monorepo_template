import { Conversation } from "wukongimjssdk";
import { useMemo } from "react";
import { cn } from "@/lib/utils.ts";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { ChatManager } from "@/instances/ChatManager.ts";
import { getTimeStringAutoShort } from "@/lib/time.ts";
import { Badge } from "@/components/ui/badge.tsx";

interface ConversationItemProps {
  conversation: Conversation;
}
const ConversationItem = (props: ConversationItemProps) => {
  const { conversation } = props;
  const info = useMemo(() => {
    return conversation.channelInfo;
  }, [conversation.channelInfo]);

  return (
    <label
      className={cn(
        "overflow-x-hidden relative flex items-center cursor-pointer gap-1 rounded-md border border-input p-2",
        " text-start shadow-sm shadow-black/5 outline-offset-2 transition-colors ",
        // "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/20 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
        "has-[[data-state=checked]]:border-primary/20 has-[[data-state=checked]]:bg-primary/20 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70",
      )}
      // role={"radio"}
      // tabIndex={0}
      key={conversation.channel.channelID}
    >
      <RadioGroupItem
        value={conversation.channel.channelID}
        className="sr-only after:absolute after:inset-0"
      />

      <div className={"flex-shrink-1 relative p-1"}>
        {conversation.unread > 0 && (
          <Badge
            variant={"destructive"}
            className="absolute right-0 top-0 rounded-full z-10 p-0 min-w-5 flex items-center justify-center text-xs"
          >
            {conversation.unread}
          </Badge>
        )}
        <Avatar>
          <AvatarImage src={info?.logo} alt={info?.title} />
          <AvatarFallback>
            {info?.title.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 space-y-1 overflow-auto">
        <div className="flex gap-2 items-center justify-between">
          <div className={"flex-1 text-sm truncate"}>{info?.title}</div>
          <span className="text-xs text-muted-foreground">
            {getTimeStringAutoShort(conversation.timestamp * 1000, true)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1 min-h-[16px]">
          {ChatManager.getLastMessageText(conversation.lastMessage)}
        </div>
      </div>
    </label>
  );
};
export default ConversationItem;
