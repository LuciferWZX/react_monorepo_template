import { AuthServiceManager } from "@/managers/api/AuthServiceManager.ts";
import { WorkspaceServiceManager } from "@/managers/api/WorkspaceServiceManager.ts";

export class APIManager {
  private constructor() {}
  public static authService = AuthServiceManager;
  public static workspaceService = WorkspaceServiceManager;
}
