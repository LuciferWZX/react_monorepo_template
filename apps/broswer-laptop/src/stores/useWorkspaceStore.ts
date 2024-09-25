import { create } from "zustand";
import { BaseStoreAction } from "@/types";
import { IWorkspace } from "@/types/workspace.ts";

interface WorkspaceStoreState {
  workspaces: IWorkspace[]; //当前的工作空间
  selectedWorkspaceIds: string[]; //当前选中的工作空间
}
const initialState: WorkspaceStoreState = {
  workspaces: [],
  selectedWorkspaceIds: [],
};
export const useWorkspaceStore = create<WorkspaceStoreState & BaseStoreAction>(
  (set) => ({
    ...initialState,
    reset: () => {
      set(initialState);
    },
  }),
);
