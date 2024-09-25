import {
  addWorkspace,
  batchDeleteWorkspace,
  workspaces,
} from "@/services/api/workspace.ts";

export class WorkspaceServiceManager {
  private constructor() {}
  public static shared = new WorkspaceServiceManager();
  public static workspaces = workspaces;
  public static addWorkspace = addWorkspace;
  public static batchDeleteWorkspace = batchDeleteWorkspace;
}
