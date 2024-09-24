import { AuthServiceManager } from "@/managers/api/AuthServiceManager.ts";

export class APIManagerManager {
  private constructor() {}
  public static authService = AuthServiceManager;
}
