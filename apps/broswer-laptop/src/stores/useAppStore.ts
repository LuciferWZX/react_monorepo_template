import { create } from "zustand";
import { AppUser, BaseStoreAction } from "@/types";

type Theme = "dark" | "light" | "system";
interface AppStoreState {
  theme: Theme;
  user: AppUser | null;
}
const initialState: AppStoreState = {
  theme: "system",
  user: null,
};
export const useAppStore = create<AppStoreState & BaseStoreAction>((set) => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
}));
