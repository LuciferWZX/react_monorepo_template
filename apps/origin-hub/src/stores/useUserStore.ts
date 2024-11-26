import { AppUser } from "@/types";
import { create } from "zustand";
import { StoreActions } from "@/stores/index.ts";
import store from "storejs";
import { ConstantManager } from "@/instances/ConstantManager.ts";
export interface UserStoreState {
  user: AppUser | null;
}
const initialState: UserStoreState = {
  user: null,
};
type Action = StoreActions & {
  login: (user: AppUser) => void;
};
export const useUserStore = create<UserStoreState & Action>((set) => {
  return {
    ...initialState,
    clear: () => set({ ...initialState }),
    login: (user) => {
      store.set(ConstantManager.TOKEN, user.access_token);
      set({ user });
    },
  };
});
