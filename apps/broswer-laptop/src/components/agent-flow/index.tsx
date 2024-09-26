import {
  addEdge,
  Background,
  ColorMode,
  Controls,
  MiniMap,
  Node,
  OnConnect,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { useCallback, useRef } from "react";
import DevTools from "@/components/agent-flow/devtools";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zhixin/shadcn_lib";
import { FileText } from "lucide-react";
import { FlowManager } from "@/managers";
import { FlowNodeType } from "@/types";
import nodeTypes from "@/components/agent-flow/nodeTypes.ts";
import "./index.css";
interface AgentFlowProps {
  theme?: ColorMode;
}
const initialNodes: Node[] = [
  {
    id: "button-1",
    type: "input",
    data: { label: "Button Edge 1" },
    position: { x: 125, y: 0 },
  },
];
const BaseAgentFlow = (props: AgentFlowProps) => {
  const { theme } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const ref = useRef<HTMLDivElement>(null);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  return (
    <ContextMenu modal={true}>
      <ContextMenuTrigger>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode={theme}
          nodeTypes={nodeTypes}
        >
          <div
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          >
            <DevTools />
            <Background />
            <Controls />
            <MiniMap
              className={"!bottom-8 !-right-2"}
              pannable={true}
              zoomable={true}
            />
          </div>
        </ReactFlow>
      </ContextMenuTrigger>
      <ContextMenuContent ref={ref}>
        <ContextMenuSub>
          <ContextMenuSubTrigger>添加</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={() => {
                if (ref.current) {
                  const rect = ref.current.getBoundingClientRect();
                  const position = screenToFlowPosition({
                    x: rect.x,
                    y: rect.y,
                  });
                  const node = FlowManager.shared.create(FlowNodeType.llm, {
                    position: position,
                  });
                  if (!node) {
                    throw Error("该节点类型不存在");
                  }
                  setNodes((oldNodes) => oldNodes.concat(node));
                }
              }}
            >
              <FileText className={"w-4 h-4 mr-2"} />
              LLM
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};
export const AgentFlow = (props: AgentFlowProps) => {
  return (
    <ReactFlowProvider>
      <BaseAgentFlow {...props} />
    </ReactFlowProvider>
  );
};
export default AgentFlow;
