import { AuthServiceManager } from "@/instances/api/AuthServiceManager.ts";
import { WuKongServiceManager } from "@/instances/api/WuKongServiceManager.ts";
import { UserServiceManager } from "@/instances/api/UserServiceManager.ts";

export class APIManager {
  private constructor() {}
  public static authService = AuthServiceManager;
  public static userService = UserServiceManager;
  public static wuKongService = WuKongServiceManager;
}
