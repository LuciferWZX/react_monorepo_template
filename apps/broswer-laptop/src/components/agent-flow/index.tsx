import {
  addEdge,
  Background,
  ColorMode,
  Controls,
  MiniMap,
  OnConnect,
  ReactFlow,
  Node,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { useCallback } from "react";
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
const AgentFlow = (props: AgentFlowProps) => {
  const { theme } = props;
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  return (
    <ContextMenu modal={true}>
      <ContextMenuTrigger className="flex-1 overflow-auto">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode={theme}
        >
          <DevTools />
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>添加</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <FileText className={"w-4 h-4 mr-2"} />
              LLM
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};
export default AgentFlow;
