import { IUser } from "@/types";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components";
import { MoreVertical } from "lucide-react";

interface ChatHeaderProps {
  user: IUser;
}
const ChatHeader = (props: ChatHeaderProps) => {
  const { user } = props;
  return (
    <motion.header
      key={user.id}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shadow-md p-4 flex items-center space-x-4"
    >
      <Avatar>
        <AvatarImage src={`${user.avatar}?height=40&width=40`} alt="ChatBot" />
        <AvatarFallback>${user.username}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{user.nickname}</h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>
      <Button variant="ghost" className={"rounded-full"} size="icon">
        <MoreVertical className="h-5 w-5" />
        <span className="sr-only">More options</span>
      </Button>
    </motion.header>
  );
};
export default ChatHeader;
