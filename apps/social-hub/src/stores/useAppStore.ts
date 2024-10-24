import { IUser } from "@/types";
import { create } from "zustand";

interface AppStoreState {
  user: IUser | null;
}
const initialState: AppStoreState = {
  user: null,
};
const useAppStore = create<AppStoreState>(() => {
  return {
    ...initialState,
  };
});
export { useAppStore };
