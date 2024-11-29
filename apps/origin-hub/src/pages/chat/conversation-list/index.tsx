import { useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import ConversationItem from "@/pages/chat/conversation-list/ConversationItem.tsx";
import { motion } from "framer-motion";
import { RadioGroup } from "@/components/ui/radio-group.tsx";
const ConversationList = () => {
  const conversations = useChatStore(
    useShallow((state) => state.conversations),
  );
  const conversation1 = useChatStore(useShallow((state) => state.conversation));
  console.log(11111222, conversation1);
  console.log(2222, conversations);
  return (
    <div className={"p-2.5 w-full"}>
      <RadioGroup className={"w-full overflow-hidden gap-1"}>
        {conversations.map((conversation, index) => {
          return (
            <motion.div
              className={"w-full overflow-x-hidden"}
              key={conversation.channel.channelID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ConversationItem conversation={conversation} />
            </motion.div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
export default ConversationList;