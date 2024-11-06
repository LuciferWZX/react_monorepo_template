import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { useAppStore, useChatStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import WKSDK from "wukongimjssdk";

export const useAppSideBar = () => {
  const [records, uid] = useAppStore(
    useShallow((state) => [state.friendRecords, state.user!.id]),
  );
  const [conversations] = useChatStore(
    useShallow((state) => [state.conversations]),
  );
  const unreadMessageNumber = useMemo(() => {
    // WKSDK.shared().reminderManager.
    return WKSDK.shared().conversationManager.getAllUnreadCount();
    // let unread = 0;
    // conversations.forEach((conversation) => {
    //   unread += conversation.unread;
    // });
    // return unread;
  }, [conversations]);
  // const { runAsync: getFriendRequestList } =
  useRequest(APIManager.userService.getFriendRequestList, {
    onSuccess: (request) => {
      useAppStore.setState({ friendRecords: request.data });
    },
  });
  useRequest(APIManager.userService.getFriends, {
    onSuccess: (request) => {
      useAppStore.setState({ friends: request.data });
    },
  });
  return {
    unreadRequestNumber: records.filter(
      (record) => record.to === uid && record.status === null,
    ).length,
    unreadMessageNumber,
  };
};
