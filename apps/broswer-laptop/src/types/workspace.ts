export enum WorkspaceType {
  dir = "dir",
  file = "file",
}

export interface IWorkspace {
  createdAt: string;
  creatorId: string;
  deletedAt: null | string;
  deleterId: null | string;
  id: string;
  name: string;
  parentId: string;
  type: WorkspaceType;
  updatedAt: string;
}
export type IWorkspaceTree = IWorkspace & { children: IWorkspaceTree[] };
