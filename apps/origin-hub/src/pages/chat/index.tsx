import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import TopConversations from "@/pages/chat/top-conversations";
import ConversationList from "@/pages/chat/conversation-list";
import { CSSProperties } from "react";
import ChatContent from "@/pages/chat/chat-content";
import { ChatProvider } from "@/components";
import { useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

const ChatPage = () => {
  return (
    <div className={"bg-muted h-full overflow-auto"}>
      <SidebarProvider className={"min-h-[unset] h-full"}>
        <Sidebar
          style={
            {
              "--sidebar-width": 400,
            } as CSSProperties
          }
          collapsible="none"
          className={"px-0.5"}
        >
          <div className={" h-full flex flex-col w-[300px]"}>
            <TopConversations />
            <ScrollArea className={"flex-1"}>
              <ConversationList />
            </ScrollArea>
          </div>
        </Sidebar>
        <SidebarInset className={"min-h-[unset] overflow-auto h-full"}>
          <ChatContentPart />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
const ChatContentPart = () => {
  const conversation = useChatStore(useShallow((state) => state.conversation));
  if (!conversation) {
    return (
      <div className={"h-full w-full flex justify-center items-center "}>
        请选择会话
      </div>
    );
  }
  return (
    <ChatProvider conversation={conversation}>
      <ChatContent />
    </ChatProvider>
  );
};
export default ChatPage;
