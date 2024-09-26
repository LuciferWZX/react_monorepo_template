import { create } from "zustand";
import { BaseStoreAction } from "@/types";
import { IWorkspace } from "@/types/workspace.ts";

interface WorkspaceStoreState {
  workspaces: IWorkspace[]; //当前的工作空间
  selectedWorkspaceIds: string[]; //当前选中的工作空间
  worksMap: Map<string, any>; //当前正在工作的id
  builderId: string | undefined; //目前正在编辑的文件的id
}
const initialState: WorkspaceStoreState = {
  workspaces: [],
  selectedWorkspaceIds: [],
  worksMap: new Map(),
  builderId: undefined,
};
export const useWorkspaceStore = create<WorkspaceStoreState & BaseStoreAction>(
  (set) => ({
    ...initialState,
    reset: () => {
      set(initialState);
    },
  }),
);
