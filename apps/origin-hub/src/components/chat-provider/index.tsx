import { Conversation } from "wukongimjssdk";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatProviderState {
  conversation: Conversation;
}
const ChatProviderContext = createContext<ChatProviderState | undefined>(
  undefined,
);
interface ChatProviderProps {
  conversation: Conversation;
  children?: ReactNode;
}
export const ChatProvider = (props: ChatProviderProps) => {
  const [conversation, setConversation] = useState(props.conversation);
  useEffect(() => {
    setConversation(conversation);
  }, [conversation]);

  return (
    <ChatProviderContext.Provider value={{ conversation }}>
      {props.children}
    </ChatProviderContext.Provider>
  );
};
export const useChat = () => {
  const context = useContext(ChatProviderContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
