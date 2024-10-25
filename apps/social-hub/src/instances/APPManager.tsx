import store from "storejs";
import { ResponseCode, StorageKey } from "@/types";
import { APIManager } from "@/instances/APIManager.ts";

export class APPManager {
  private constructor() {}
  public static shared = new APPManager();

  async init(options: { onFailed: (reason: string) => void }) {
    const token: string | null = store.get(StorageKey.token);
    if (!token) {
      options.onFailed("请登录");
      return null;
    }
    const response = await APIManager.authService.profile();
    if (response.code === ResponseCode.success) {
      return response.data;
    }
    options.onFailed(response?.message ?? "用户信息已过期，请重新登录");
    return null;
  }
}
