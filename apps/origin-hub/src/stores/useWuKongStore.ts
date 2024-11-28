import { ConnectStatus } from "wukongimjssdk";
import { create } from "zustand";
import { StoreActions } from "@/stores/index.ts";

interface WuKongStoreState {
  status: ConnectStatus;
  addresses: {
    tcp_addr: string;
    ws_addr: string;
    wss_addr: string;
  };
}
const initialState: WuKongStoreState = {
  status: ConnectStatus.Connecting,
  addresses: {
    tcp_addr: "",
    ws_addr: "",
    wss_addr: "",
  },
};
export const useWuKongStore = create<WuKongStoreState & StoreActions>((set) => {
  return {
    ...initialState,
    clear: () => set({ ...initialState }),
  };
});
