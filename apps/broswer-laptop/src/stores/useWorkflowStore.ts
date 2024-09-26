import { create } from "zustand";
import { BaseStoreAction, Schema } from "@/types";
import { Edge, Node } from "@xyflow/react";

export interface WorkflowStoreState {
  nodes: Node<Schema>[];
  edges: Edge[];
}
const initialState: WorkflowStoreState = {
  nodes: [],
  edges: [],
};
export const useWorkflowStore = create<WorkflowStoreState & BaseStoreAction>(
  (set) => {
    return {
      ...initialState,
      reset: () => set(initialState),
    };
  },
);
