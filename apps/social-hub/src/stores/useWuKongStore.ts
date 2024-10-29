import { ConnectStatus } from "wukongimjssdk";
import { create } from "zustand";

interface WuKongStoreState {
  status: ConnectStatus;
  ip: {
    tcp_addr: string;
    ws_addr: string;
    wss_addr: string;
  };
}
const initialState: WuKongStoreState = {
  status: ConnectStatus.Connecting,
  ip: {
    tcp_addr: "",
    ws_addr: "",
    wss_addr: "",
  },
};
export const useWuKongStore = create<WuKongStoreState>(() => {
  return {
    ...initialState,
  };
});
