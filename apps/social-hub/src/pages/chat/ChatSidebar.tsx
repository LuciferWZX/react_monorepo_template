import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
  ScrollArea,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarSeparator,
} from "@/components";
import { cn } from "@/lib/utils.ts";
import { Plus, Search } from "lucide-react";
import FriendRequestDialog from "@/pages/chat/components/FriendRequestDialog.tsx";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import WKSDK, { ChannelInfo, Conversation } from "wukongimjssdk";
import { ChatManager } from "@/instances";
import { getTimeStringAutoShort } from "@/lib/time.ts";
import { useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [conversations] = useChatStore(
    useShallow((state) => [state.conversations]),
  );
  const navigate = useNavigate();
  return (
    <nav
      className={cn(
        "h-full overflow-auto bg-sidebar/80 text-sidebar-foreground",
      )}
    >
      <header>
        <div className={cn("flex gap-2 p-2")}>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput id="search" placeholder="查询" className="pl-8" />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
          <FriendRequestDialog open={visible} onVisibleChange={setVisible}>
            <Button
              variant={"ghost"}
              className={cn("flex-shrink-0 p-1 h-8 w-8")}
              size={"icon"}
            >
              <Plus className={cn("w-4 h-4")} />
            </Button>
          </FriendRequestDialog>
        </div>
      </header>
      <SidebarSeparator />
      <ScrollArea className="flex-grow" hideX={true}>
        <div className="p-1 w-72">
          {conversations.map((conversation, index) => {
            return (
              <ConversationItem
                key={conversation.channel.channelID}
                conversation={conversation}
                index={index}
                onClick={() => {
                  navigate(`/chat/${conversation.channel.channelID}`);
                }}
              />
            );
          })}
        </div>
      </ScrollArea>
    </nav>
  );
};
interface ConversationItemType {
  conversation: Conversation;
  index: number;
  onClick: (info: ChannelInfo | undefined) => void;
}
const ConversationItem = (props: ConversationItemType) => {
  const { conversation, index, onClick } = props;
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | undefined>(
    WKSDK.shared().channelManager.getChannelInfo(conversation.channel),
  );
  useEffect(() => {
    if (!channelInfo) {
      WKSDK.shared()
        .channelManager.fetchChannelInfo(conversation.channel)
        .then(() => {
          const info = WKSDK.shared().channelManager.getChannelInfo(
            conversation.channel,
          );
          setChannelInfo(info);
        });
    }
  }, [channelInfo]);
  return (
    <motion.div
      key={conversation.channel.channelID}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      role="button"
      onClick={() => onClick(channelInfo)}
      // aria-pressed={selectedChat === chat.id}
      className={`p-2 rounded-lg mb-2 cursor-pointer transition-colors outline-none`}
    >
      <div className="flex items-center space-x-4 ">
        <Avatar>
          <AvatarImage src={channelInfo?.logo} alt={channelInfo?.title} />
          <AvatarFallback>
            {channelInfo?.title.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {channelInfo?.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {ChatManager.shared.getLastMessageText(conversation.lastMessage)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-muted-foreground">
            {getTimeStringAutoShort(conversation.timestamp * 1000, true)}
          </p>
          {conversation.unread > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-destructive-foreground bg-red-500 rounded-full">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default ChatSidebar;
