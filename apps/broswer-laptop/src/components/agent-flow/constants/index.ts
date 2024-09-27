import { FlowComponent, FlowComponentGroup, FlowNodeType } from "@/types";
import { Brain, BrainCog } from "lucide-react";

export const FLOW_COMPONENTS: FlowComponent[] = [
  {
    group: FlowComponentGroup.AI,
    icon: Brain,
    components: [{ type: FlowNodeType.llm, name: "LLM", icon: BrainCog }],
  },
];
