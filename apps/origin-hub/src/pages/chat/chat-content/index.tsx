import ChatList, { ChatListRef } from "@/pages/chat/chat-content/ChatList.tsx";
import ChatInputArea from "@/pages/chat/chat-content/ChatInputArea.tsx";
import { useChat } from "@/components";
import useMessage from "./useMessage.ts";
import { useRef } from "react";
const ChatContent = () => {
  const chatListRef = useRef<ChatListRef>(null);
  const { conversation, users } = useChat();
  const { messages, hasMore, getNextMessages } = useMessage(
    conversation,
    // {
    // scrollToBottom: () => {
    //   console.log("滚动");
    //   // chatListRef.current?.scrollToBottom();
    // },
    // }
  );
  return (
    <div className={"h-full w-full flex flex-col"}>
      <ChatList
        hasMore={hasMore}
        ref={chatListRef}
        messages={messages}
        users={users}
        getNextMessages={getNextMessages}
      />
      <ChatInputArea users={users} />
    </div>
  );
};
export default ChatContent;
