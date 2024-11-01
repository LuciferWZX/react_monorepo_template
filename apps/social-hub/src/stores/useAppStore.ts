import { IUser } from "@/types";
import { create } from "zustand";
import { FriendRequestRecord } from "@/types/friend.ts";

interface AppStoreState {
  user: IUser | null;
  friends: IUser[];
  friendRecords: FriendRequestRecord[];
}
const initialState: AppStoreState = {
  user: null,
  friendRecords: [],
  friends: [],
};
const useAppStore = create<AppStoreState>(() => {
  return {
    ...initialState,
  };
});
export { useAppStore };
