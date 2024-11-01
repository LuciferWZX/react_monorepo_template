import { IUser } from "@/types";

interface ChatHeaderProps {
  user: IUser;
}
const ChatHeader = (props: ChatHeaderProps) => {
  const { user } = props;
  return <div>header {user.nickname}</div>;
};
export default ChatHeader;
