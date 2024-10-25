import { AuthServiceManager } from "@/instances/api/AuthServiceManager.ts";

export class APIManager {
  private constructor() {}
  public static authService = AuthServiceManager;
}
