import { FriendRequestRecord } from "@/types/friend.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components";
import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { IUser, ResponseCode } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Cake, Mail } from "lucide-react";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

interface FriendSimpleInfoProps {
  curRecord: FriendRequestRecord | null;
}
const FriendSimpleInfo = (props: FriendSimpleInfoProps) => {
  const { curRecord } = props;
  const [uid] = useAppStore(useShallow((state) => [state.user!.id]));
  const [user, setUser] = useState<Omit<
    IUser,
    "deletedAt" | "createAt" | "access_token"
  > | null>(null);
  const fid = useMemo(
    () => (curRecord?.uid === uid ? curRecord?.to : curRecord?.uid),
    [curRecord, uid],
  );

  const { runAsync: getUserInfo } = useRequest(
    APIManager.userService.getUserSimpleInfo,
    {
      manual: true,
      onSuccess: (response) => {
        if (response.code === ResponseCode.success) {
          setUser(response.data);
        }
      },
    },
  );
  useEffect(() => {
    if (fid) {
      getUserInfo(fid).then();
    }
  }, [fid]);
  const handleAccept = (uid: string) => {
    console.log("accept：", uid);
  };
  const handleDecline = (uid: string) => {
    console.log("reject：", uid);
  };
  return (
    <div className={"h-full w-full p-10"}>
      <AnimatePresence mode="wait">
        {curRecord ? (
          <motion.div
            key={curRecord.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>
                    {user?.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold mb-2"
                >
                  {user?.username}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <Cake className="h-5 w-5 text-muted-foreground" />
                <span>{user?.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Button
                onClick={() => handleAccept(curRecord.id)}
                className="flex-1"
              >
                Accept Request
              </Button>
              <Button
                onClick={() => handleDecline(curRecord.id)}
                variant="outline"
                className="flex-1"
              >
                Decline Request
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex items-center justify-center text-muted-foreground"
          >
            Select a friend request to view details
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FriendSimpleInfo;
