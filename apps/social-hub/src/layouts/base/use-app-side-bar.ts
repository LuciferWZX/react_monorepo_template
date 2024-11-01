import { useRequest } from "ahooks";
import { APIManager } from "@/instances";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

export const useAppSideBar = () => {
  const [records, uid] = useAppStore(
    useShallow((state) => [state.friendRecords, state.user!.id]),
  );
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
  };
};
