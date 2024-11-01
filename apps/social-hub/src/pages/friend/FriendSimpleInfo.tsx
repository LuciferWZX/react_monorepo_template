import { FriendRequestRecord, RequestStatus } from "@/types/friend.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components";
import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { IUser, ResponseCode } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Cake, Check, Loader2, Mail, X } from "lucide-react";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils.ts";
import { match } from "ts-pattern";
import { ChannelTypePerson, MessageText } from "wukongimjssdk";

interface FriendSimpleInfoProps {
  curRecord: FriendRequestRecord | null;
  recordId: string | null;
}
const FriendSimpleInfo = (props: FriendSimpleInfoProps) => {
  const { curRecord, recordId } = props;
  const [uid, friends] = useAppStore(
    useShallow((state) => [state.user!.id, state.friends]),
  );
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
  const { runAsync: handleFriendRequest, loading: handling } = useRequest(
    APIManager.userService.handleFriendRequest,
    {
      manual: true,
      onSuccess: async (response) => {
        if (response.code === ResponseCode.success) {
          const results = await Promise.all([
            await APIManager.userService.getFriendRequestList(),
            await APIManager.userService.getFriends(),
          ]);
          if (results[0].code === ResponseCode.success) {
            useAppStore.setState({ friendRecords: results[0].data });

            // ChatManager.shared.sendText("")
          }
          if (results[1].code === ResponseCode.success) {
            useAppStore.setState({ friends: results[1].data });
          }
        }
      },
    },
  );
  useEffect(() => {
    if (fid) {
      getUserInfo(fid);
    } else {
      const friend = friends.find((friend) => friend.id === recordId);
      setUser(friend ?? null);
    }
  }, [fid, friends, recordId]);
  const handleAccept = async (id: string) => {
    await handleFriendRequest({ id: id, type: RequestStatus.accept }).then(
      (response) => {
        if (response.code === ResponseCode.success && user) {
          //接受之后对方会立刻发送消息给我
          const msg = new MessageText("你好，很高兴认识你!");
          const payload = btoa(
            String.fromCharCode.apply(null, msg.encode() as any),
          );
          APIManager.wuKongService.sendMessage({
            header: {
              // 消息头
              no_persist: 0, // 是否不存储消息 0.存储 1.不存储
              red_dot: 1, // 是否显示红点计数，0.不显示 1.显示
              sync_once: 0, // sync_once设置为0，1表示是命令消息，命令消息不会显示在会话里
            },
            from_uid: user.id, // 发送者uid
            stream_no: "",
            channel_id: uid, // 接收频道ID 如果channel_type=1 channel_id为个人uid 如果channel_type=2 channel_id为群id
            channel_type: ChannelTypePerson, // 接收频道类型  1.个人频道 2.群聊频道
            payload: payload, // 消息，base64编码，消息格式参考下面 【payload 内容参考】的链接
            subscribers: [],
          });
        }
      },
    );
  };
  const handleDecline = async (id: string) => {
    console.log("reject：", uid);
    await handleFriendRequest({ id: id, type: RequestStatus.reject });
  };
  return (
    <div className={"h-full w-full p-10"}>
      <AnimatePresence mode="wait">
        {(user ?? curRecord) ? (
          <motion.div
            key={curRecord?.id ?? user?.id}
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
            {curRecord && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                {curRecord.to === uid ? (
                  curRecord.status === null ? (
                    <>
                      <Button
                        disabled={handling}
                        onClick={() => handleAccept(curRecord.id)}
                        className="flex-1"
                      >
                        接受
                      </Button>
                      <Button
                        disabled={handling}
                        onClick={() => handleDecline(curRecord.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        拒绝
                      </Button>
                    </>
                  ) : (
                    <span
                      className={`mx-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        curRecord.status === RequestStatus.accept
                          ? "bg-green-800 text-green-100"
                          : "bg-red-800 text-red-100"
                      }`}
                    >
                      {curRecord.status === RequestStatus.accept ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          已接受
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 mr-1" />
                          已拒绝
                        </>
                      )}
                    </span>
                  )
                ) : (
                  match(curRecord.status)
                    .with(RequestStatus.reject, () => {
                      return (
                        <span
                          className={"flex items-center text-red-600 mx-auto"}
                        >
                          <X className="w-4 h-4 mr-1" />
                          已拒绝
                        </span>
                      );
                    })
                    .with(RequestStatus.accept, () => {
                      return (
                        <span
                          className={"flex items-center text-green-600 mx-auto"}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          已添加
                        </span>
                      );
                    })
                    .otherwise(() => {
                      return (
                        <span
                          className={cn(
                            "mx-auto mt-2 flex items-center text-muted-foreground gap-1",
                          )}
                        >
                          等待对方处理{" "}
                          <Loader2 className={cn("h-4 w-4 animate-spin")} />
                        </span>
                      );
                    })
                )}
              </motion.div>
            )}
            {!curRecord && user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <Button variant={"secondary"} className={"mx-auto w-full"}>
                  发送消息
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex items-center justify-center text-muted-foreground"
          >
            空空如也
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FriendSimpleInfo;
