import { create } from "zustand";
import { BaseStoreAction } from "@/types";
import { IWorkspace } from "@/types/workspace.ts";

interface WorkspaceStoreState {
  workspaces: IWorkspace[];
}
const initialState: WorkspaceStoreState = {
  workspaces: [],
};
export const useWorkspaceStore = create<WorkspaceStoreState & BaseStoreAction>(
  (set) => ({
    ...initialState,
    reset: () => {
      set(initialState);
    },
  }),
);
