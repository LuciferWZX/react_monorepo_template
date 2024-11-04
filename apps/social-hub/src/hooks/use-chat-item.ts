import { match, P } from "ts-pattern";
import { Message, MessageText } from "wukongimjssdk";

export const useChatItem = () => {
  const getMessageContent = (message: Message) => {
    return match(message.content)
      .with(P.instanceOf(MessageText), (messageText) => {
        return messageText.text;
      })
      .otherwise(() => {
        return "";
      });
  };

  return {
    getMessageContent,
  };
};
