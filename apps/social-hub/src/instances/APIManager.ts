import { AuthServiceManager } from "@/instances/api/AuthServiceManager.ts";
import { WuKongServiceManager } from "@/instances/api/WuKongServiceManager.ts";

export class APIManager {
  private constructor() {}
  public static authService = AuthServiceManager;
  public static wuKongService = WuKongServiceManager;
}
