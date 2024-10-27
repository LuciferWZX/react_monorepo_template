import { useEffect } from "react";
import { APIManager } from "@/instances";
import { useAppStore, useWuKongStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { ResponseCode } from "@/types";
import WKSDK, { ConnectStatus } from "wukongimjssdk";
import { match } from "ts-pattern";

export function useWuKong() {
  const [id, accessToken] = useAppStore(
    useShallow((state) => [state.user?.id, state.user?.access_token]),
  );
  useEffect(() => {
    if (id && accessToken) {
      initialWuKong(id, accessToken).then();
    }
  }, [id, accessToken]);
  const initialWuKong = async (uid: string, token: string) => {
    const ipResponse = await APIManager.wuKongService.getIp({ uid: uid });
    if (ipResponse.code === ResponseCode.success) {
      // console.log(111, ip);
      const { ws_addr } = ipResponse.data;
      WKSDK.shared().config.addr = ws_addr;
      WKSDK.shared().config.uid = uid;
      WKSDK.shared().config.token = token;
      //监听连接状态
      WKSDK.shared().connectManager.addConnectStatusListener(
        connectStatusListener,
      );
      WKSDK.shared().connectManager.connect();
      return () => {
        //取消监听连接状态
        WKSDK.shared().connectManager.removeConnectStatusListener(
          connectStatusListener,
        );
      };
    }
  };
  const connectStatusListener = async (
    status: ConnectStatus,
    reasonCode?: number,
  ) => {
    useWuKongStore.setState({ status });
    console.log(123, status, reasonCode);
    match(status)
      .with(ConnectStatus.Connected, () => {
        console.info("🔗连接成功");
      })
      .with(ConnectStatus.Connecting, () => {
        console.info("🔗连接中");
      })
      .otherwise(() => {
        console.error("🔗连接失败", reasonCode);
      });
  };
}
