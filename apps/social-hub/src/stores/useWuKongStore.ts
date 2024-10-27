import { ConnectStatus } from "wukongimjssdk";
import { create } from "zustand";

interface WuKongStoreState {
  status: ConnectStatus;
}
const initialState: WuKongStoreState = {
  status: ConnectStatus.Connecting,
};
export const useWuKongStore = create<WuKongStoreState>(() => {
  return {
    ...initialState,
  };
});
