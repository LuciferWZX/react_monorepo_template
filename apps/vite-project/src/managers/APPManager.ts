import { StorageManager } from "./StorageManager.ts";
import { APP_STORAGE_KEY } from "@/types";

export class APPManager {
  private constructor() {}
  public static shared = new APPManager();

  /**
   * 退出登录
   */
  async shutdown() {
    StorageManager.shared.remove(APP_STORAGE_KEY.token);
  }
}
