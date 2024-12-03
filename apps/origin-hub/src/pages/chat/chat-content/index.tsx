import ChatList from "@/pages/chat/chat-content/ChatList.tsx";
import ChatInputArea from "@/pages/chat/chat-content/ChatInputArea.tsx";
import { useChat } from "@/components";
import useMessage from "./useMessage.ts";
const ChatContent = () => {
  const { conversation, users } = useChat();
  const { messages } = useMessage(conversation);
  return (
    <div className={"h-full w-full flex flex-col"}>
      <ChatList messages={messages} users={users} />
      <ChatInputArea />
    </div>
  );
};
export default ChatContent;
