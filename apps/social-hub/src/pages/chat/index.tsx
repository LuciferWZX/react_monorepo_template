import ChatSidebar from "@/pages/chat/ChatSidebar.tsx";
import ChatContext from "@/pages/chat/ChatContext.tsx";
import { ChatProvider } from "@/pages/chat/components/ChatProvider.tsx";

const ChatPage = () => {
  return (
    <ChatProvider>
      <div className={"h-full relative flex"}>
        <div className={"flex-shrink-0"}>
          <ChatSidebar />
        </div>
        <div className={"flex-1 overflow-auto"}>
          <ChatContext />
        </div>
      </div>
    </ChatProvider>
  );
};
export default ChatPage;
