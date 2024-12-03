import { ChannelTypePerson, Conversation } from "wukongimjssdk";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { BaseUser } from "@/types";

interface ChatProviderState {
  conversation: Conversation;
  users: BaseUser[];
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
  const [users, setUsers] = useState<BaseUser[]>([]);
  useLayoutEffect(() => {
    setConversation(props.conversation);
    initUsers(props.conversation).then();
  }, [props.conversation]);
  /**
   * @description 初始化用户信息
   */
  const initUsers = async (_conversation: Conversation) => {
    const info = _conversation.channelInfo;
    if (!info) {
      setUsers([]);
      throw Error("channel info is undefined");
    }
    if (_conversation.channel.channelType === ChannelTypePerson) {
      //单人
      setUsers([info.orgData]);
    } else {
      //群组
    }
  };
  return (
    <ChatProviderContext.Provider value={{ conversation, users }}>
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
