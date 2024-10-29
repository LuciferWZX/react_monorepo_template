import ChatSidebar from "@/pages/chat/ChatSidebar.tsx";
import ChatContext from "@/pages/chat/ChatContext.tsx";

const ChatPage = () => {
  return (
    <div className={"h-full relative flex"}>
      <div className={"flex-shrink-0"}>
        <ChatSidebar />
      </div>
      <div className={"flex-1 overflow-auto"}>
        <ChatContext />
      </div>
    </div>
  );
};
export default ChatPage;
