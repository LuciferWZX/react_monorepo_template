import { create } from "zustand";

type Theme = "dark" | "light" | "system";
interface AppStoreState {
  theme: Theme;
}
const initialState: AppStoreState = {
  theme: "system",
};
export const useAppStore = create<AppStoreState>(() => initialState);
