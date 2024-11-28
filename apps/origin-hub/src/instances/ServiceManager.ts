import { AuthServiceManager } from "@/instances/services/AuthServiceManager.ts";
import { WuKongServiceManager } from "@/instances/services/WuKongServiceManager.ts";

/**
 * @description 处理请求的manager
 */
export class ServiceManager {
  /**
   * @description auth服务
   */
  public static authService = AuthServiceManager;
  /**
   * @description wukongim服务
   */
  public static wuKongService = WuKongServiceManager;
}
