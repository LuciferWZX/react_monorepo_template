import { cn } from "@/lib/utils.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Label,
  ScrollArea,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components";
import { Search } from "lucide-react";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { AnimatePresence, motion } from "framer-motion";
import { FriendRequestRecord, RequestStatus } from "@/types/friend.ts";
import { useState } from "react";
import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { IUser, ResponseCode } from "@/types";

interface FriendSidebarProps {
  recordId: string | null;
  setRecordId: (id: string) => void;
}
const FriendSidebar = (props: FriendSidebarProps) => {
  const { recordId, setRecordId } = props;
  const [friendRecords, uid, friends] = useAppStore(
    useShallow((state) => [state.friendRecords, state.user!.id, state.friends]),
  );
  return (
    <aside
      className={cn(
        "w-72 h-full flex flex-col overflow-auto bg-sidebar/80 text-sidebar-foreground",
      )}
    >
      <header className={"flex-shrink-0"}>
        <div className={cn("flex gap-2 p-2")}>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput id="search" placeholder="查询" className="pl-8" />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </header>
      <ScrollArea className={"flex-1"}>
        <AnimatePresence>
          {friendRecords.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground p-4"
            >
              No pending friend requests
            </motion.p>
          ) : (
            <ul>
              <Accordion type="multiple" defaultValue={["requests", "friends"]}>
                <AccordionItem value="requests">
                  <AccordionTrigger className={"px-2"}>
                    请求列表
                  </AccordionTrigger>
                  <AccordionContent>
                    {friendRecords.map((request) => (
                      <motion.li
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 cursor-pointer hover:bg-accent ${recordId === request.id ? "bg-accent" : ""}`}
                        onClick={() => setRecordId(request.id)}
                      >
                        <RequestRecordItem
                          fid={request.uid === uid ? request.to : request.uid}
                          record={request}
                        />
                      </motion.li>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="friends">
                  <AccordionTrigger className={"px-2"}>
                    好友列表 ({friends.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    {friends.map((friend) => (
                      <motion.li
                        key={friend.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 cursor-pointer hover:bg-accent ${recordId === friend.id ? "bg-accent" : ""}`}
                        onClick={() => setRecordId(friend.id)}
                      >
                        <FriendItem friend={friend} />
                      </motion.li>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ul>
          )}
        </AnimatePresence>
      </ScrollArea>
    </aside>
  );
};
const RequestRecordItem = (props: {
  record: FriendRequestRecord;
  fid: string;
}) => {
  const { record, fid } = props;
  const [user, setUser] = useState<Omit<
    IUser,
    "deletedAt" | "createAt" | "access_token"
  > | null>(null);
  useRequest(APIManager.userService.getUserSimpleInfo, {
    defaultParams: [fid],
    cacheKey: fid,
    onSuccess: (response) => {
      if (response.code === ResponseCode.success) {
        setUser(response.data);
      }
    },
  });
  return (
    <div className="flex items-start gap-4 ">
      <Avatar>
        <AvatarImage src={user?.avatar} alt={user?.username} />
        <AvatarFallback>
          {user?.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={"flex-1 "}>
        <div className="flex-1 justify-between min-w-0 flex gap-2">
          <p className="text-sm font-medium truncate">{user?.nickname}</p>
          <Badge
            className={cn({
              "bg-green-800": record.status === RequestStatus.accept,
            })}
            variant={
              record.status === RequestStatus.reject
                ? "destructive"
                : "secondary"
            }
          >
            {record.status === RequestStatus.accept
              ? "已接受"
              : record.status === RequestStatus.reject
                ? "已拒绝"
                : "待处理"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-medium truncate">
          {user?.email}
        </p>
      </div>
    </div>
  );
};
const FriendItem = (props: { friend: IUser }) => {
  const { friend } = props;
  return (
    <div className="flex items-start gap-4 ">
      <Avatar>
        <AvatarImage src={friend.avatar} alt={friend.username} />
        <AvatarFallback>
          {friend.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={"flex-1 "}>
        <div className="flex-1 justify-between min-w-0 flex gap-2">
          <p className="text-sm font-medium truncate">{friend.nickname}</p>
        </div>
        <p className="text-sm text-muted-foreground font-medium truncate">
          {friend?.email}
        </p>
      </div>
    </div>
  );
};
export default FriendSidebar;
