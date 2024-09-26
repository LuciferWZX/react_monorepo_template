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
export function getDeletedWorksId(
  ids: string[],
  worksIds: string[],
  treeData: IWorkspaceTree[],
) {
  const willDeletedIds = getAllDeletedIds(ids, worksIds, treeData);
  const deletedIds: string[] = [];
  const leftIds: string[] = [];
  worksIds.forEach((id) => {
    if (willDeletedIds.includes(id)) {
      deletedIds.push(id);
    } else {
      leftIds.push(id);
    }
  });
  return {
    deletedIds,
    leftIds,
  };
}
export function getAllDeletedIds(
  ids: string[],
  worksIds: string[],
  treeData: IWorkspaceTree[],
) {
  let deletedIds: string[] = [];
  treeData.forEach((data) => {
    if (ids.includes(data.id)) {
      //删除的正是这个文件
      deletedIds = deletedIds.concat(data.id);
      if (data.children.length > 0) {
        deletedIds = deletedIds.concat(getAllChildrenIds(data.children));
      }
    } else {
      if (data.children.length > 0) {
        deletedIds = deletedIds.concat(
          getAllDeletedIds(ids, worksIds, data.children),
        );
      }
    }
  });
  return deletedIds;
}
export function getAllChildrenIds(data: IWorkspaceTree[]) {
  let ids: string[] = [];
  for (let i = 0; i < data.length; i++) {
    ids = ids.concat(data[i].id);
    if (data[i].children.length > 0) {
      ids = ids.concat(getAllChildrenIds(data[i].children));
    }
  }
  return ids;
}
