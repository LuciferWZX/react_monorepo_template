import { StorageManager } from "./StorageManager.ts";
import { APP_STORAGE_KEY, AppUser, ResponseCode } from "@/types";
import { APIManager } from "@/managers/APIManager.ts";
import { useAppStore } from "@/stores";
import { sleep } from "@/libs";
import { navigate } from "@/App.tsx";

export class APPManager {
  private constructor() {}
  public static shared = new APPManager();

  async initApp(config?: { failed?: (reason: string) => void }) {
    const user = useAppStore.getState().user;
    if (user) {
      return user;
    }
    const failed = config?.failed;
    const token = StorageManager.shared.get<string>(APP_STORAGE_KEY.token);
    await sleep(1000);
    if (!token) {
      // throw Error("无用户凭证");
      failed?.("无用户凭证");
      return;
    }
    const response = await APIManager.authService.profile();
    if (response.code === ResponseCode.success) {
      const user: AppUser = { ...response.data, access_token: token };
      useAppStore.setState({ user: { ...response.data, access_token: token } });
      return user;
    }
    failed?.("用户凭证失效");
    return;
    // throw Error("用户凭证失效");
  }
  /**
   * 退出登录
   */
  async shutdown() {
    await navigate("/login", { replace: true });
    StorageManager.shared.remove(APP_STORAGE_KEY.token);
    useAppStore.getState().reset();
  }
}
