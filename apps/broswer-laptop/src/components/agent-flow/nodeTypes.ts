import { NodeTypes } from "@xyflow/react";
import { FlowNodeType } from "@/types";
import LLMNodes from "@/components/agent-flow/nodes/llm";

const nodeTypes: NodeTypes = {
  [FlowNodeType.llm]: LLMNodes,
};
export default nodeTypes;
