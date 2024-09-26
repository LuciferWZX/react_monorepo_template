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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      colorMode={theme}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};
export default AgentFlow;
