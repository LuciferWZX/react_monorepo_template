import { IWorkspace, IWorkspaceTree } from "@/types/workspace.ts";

export function convertToTree(workspaces: IWorkspace[]) {
  const map = new Map();
  const result: IWorkspaceTree[] = [];
  workspaces.forEach((workspace) => {
    map.set(workspace.id, { ...workspace, children: [] });
  });
  workspaces.forEach((workspace) => {
    if (workspace.parentId) {
      const parent = map.get(workspace.parentId);
      if (parent) {
        parent.children.push(map.get(workspace.id));
      }
    } else {
      result.push(map.get(workspace.id));
    }
  });
  return result;
}
