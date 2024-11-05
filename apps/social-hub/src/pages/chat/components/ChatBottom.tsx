import { Button, Input } from "@/components";
import { IUser } from "@/types";
import { cn } from "@/lib/utils.ts";
import { useMemo, useState } from "react";
import WKSDK, { Conversation, MessageText } from "wukongimjssdk";

interface ChatBottomProps {
  user: IUser;
  conversation: Conversation | undefined;
}
const ChatBottom = (props: ChatBottomProps) => {
  const [text, setText] = useState<string>("");
  const { user, conversation } = props;
  const disabled = useMemo(() => {
    return !text || !conversation;
  }, [text, conversation]);
  const sendMessage = async (_text: string) => {
    if (disabled || !conversation) {
      return;
    }
    // 例如发送文本消息hello给用户u10001
    const text = new MessageText(_text); // 文本消息
    WKSDK.shared().chatManager.send(text, conversation.channel).then();
    setText("");
  };
  return (
    <div className={cn("p-2 flex gap-2 items-start")}>
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(text);
          }
          console.log(event.key === "Enter");
        }}
        className={"resize-none"}
        placeholder={`发送给 ${user.nickname}`}
      />
      <Button disabled={disabled} variant={"secondary"}>
        发送
      </Button>
    </div>
  );
};
export default ChatBottom;
