import { Node } from "@xyflow/react";
import { Schema } from "@/types";

export enum FlowNodeType {
  llm = "llm",
}
export type FlowNode = Node<Schema>;
