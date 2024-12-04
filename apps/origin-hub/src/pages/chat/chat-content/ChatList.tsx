import { Message } from "wukongimjssdk";
import MessageBubble from "@/components/message-bubble";
import { BaseUser } from "@/types";
import { useChat, useUser } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, RefObject, useImperativeHandle, useRef } from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { cn } from "@/lib/utils.ts";
import { useListScroll } from "@/pages/chat/chat-content/useListScroll.ts";

interface ChatListProps {
  messages: Message[];
  users: BaseUser[];
  hasMore: boolean;
  getNextMessages: Function;
}
export interface ChatListRef {
  scrollToBottom: () => void;
  listRef: RefObject<HTMLDivElement>;
  loaderRef: RefObject<HTMLDivElement>;
}
const ChatList = forwardRef<ChatListRef, ChatListProps>((props, ref) => {
  const { messages, users, getNextMessages, hasMore } = props;
  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { conversation } = useChat();
  const { user } = useUser();
  useImperativeHandle(ref, () => {
    return {
      listRef: listRef,
      loaderRef: loaderRef,
      scrollToBottom: (config?: { behavior?: ScrollBehavior }) => {
        if (!bottomRef.current) {
          throw Error("bottomRef为null");
        }
        scrollIntoView(bottomRef.current, {
          behavior: config?.behavior ?? "instant",
        });
      },
    };
  });
  useListScroll(listRef, loaderRef, {
    hasMore,
    conversation: conversation,
    getData: async () => {
      console.info("[加载数据]");
      getNextMessages();
    },
  });
  return (
    <div className={"flex-1 overflow-auto"}>
      <AnimatePresence initial={false}>
        <div
          ref={listRef}
          className={cn(
            "flex flex-col-reverse overflow-auto w-full gap-2 py-2 max-h-full *:mt-4",
            "scrollbar-thumb-border scrollbar-track-transparent scrollbar-thin overflow-y-scroll",
          )}
        >
          {[...messages].reverse().map((message) => {
            const isAppUser = message.fromUID === user.id;
            let _user: BaseUser | undefined;
            if (isAppUser) {
              _user = user;
            } else if (!message.fromUID) {
              _user = conversation.channelInfo?.orgData;
            } else {
              _user = users.find((_u) => _u.id === message.fromUID);
            }
            return (
              <motion.div
                key={message.messageID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MessageBubble
                  role={isAppUser ? "app-user" : "base-user"}
                  user={_user}
                  message={message}
                />
              </motion.div>
            );
          })}
          <div
            ref={loaderRef}
            className={cn(
              "h-4 hidden items-center justify-center text-sm text-muted-foreground/60",
              {
                flex: hasMore,
              },
            )}
          >
            加载中...
          </div>
        </div>
      </AnimatePresence>
    </div>
    // <ScrollArea className={"flex-1 break-all"} ref={listRef}>
    //
    //   <div ref={bottomRef} />
    // </ScrollArea>
  );
});
export default ChatList;
