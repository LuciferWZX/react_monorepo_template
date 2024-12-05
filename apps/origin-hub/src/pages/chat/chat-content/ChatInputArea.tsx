import AdvancedInput from "@/pages/chat/chat-content/advancedInput";
import { BaseUser } from "@/types";
import { useChat } from "@/components";
import { useMemo } from "react";
interface ChatInputAreaProps {
  users: BaseUser[];
}
const ChatInputArea = (props: ChatInputAreaProps) => {
  const { users } = props;
  const { conversation } = useChat();
  const placeholder = useMemo(() => {
    return `发送给 ${conversation.channelInfo?.title}`;
  }, [conversation.channel.channelID]);
  return (
    <div className={"flex-shrink-1 p-4 pt-2"}>
      <AdvancedInput
        conversation={conversation}
        users={users}
        placeholder={placeholder}
      />
    </div>
  );
};
export default ChatInputArea;
