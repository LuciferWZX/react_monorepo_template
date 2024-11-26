import { AuthServiceManager } from "@/instances/services/AuthServiceManager.ts";

/**
 * @description 处理请求的manager
 */
export class ServiceManager {
  /**
   * @description auth服务
   */
  public static authService = AuthServiceManager;
}
