import { AuthServiceManager } from "@/instances/services/AuthServiceManager.ts";
import { WuKongServiceManager } from "@/instances/services/WuKongServiceManager.ts";
import { UserServiceManager } from "@/instances/services/UserServiceManager.ts";

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
  /**
   * @description 用户服务
   */
  public static userService = UserServiceManager;
}
