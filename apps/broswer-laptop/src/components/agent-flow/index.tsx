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
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zhixin/shadcn_lib";
import { FlowManager } from "@/managers";
import nodeTypes from "@/components/agent-flow/nodeTypes.ts";
import "./index.css";
import { FLOW_COMPONENTS } from "@/components/agent-flow/constants";
import Test from "@/components/agent-flow/Test.tsx";
interface AgentFlowProps {
  theme?: ColorMode;
  devTools?: boolean;
  miniMap?: boolean;
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
  const { theme, devTools, miniMap } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const ref = useRef<HTMLDivElement>(null);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  const renderContextMenu = () => {
    return (
      <ContextMenuSub>
        <ContextMenuSubTrigger>添加</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          {FLOW_COMPONENTS.map((group) => {
            return (
              <div key={group.group}>
                <ContextMenuLabel className={"flex gap-2 items-center"}>
                  {group.icon && <group.icon className={"w-4 h-4"} />}
                  {group.group}
                </ContextMenuLabel>
                {group.components.map((component) => {
                  const ComponentIcon = component.icon;
                  return (
                    <ContextMenuItem
                      inset={true}
                      key={component.type}
                      onClick={() => {
                        if (ref.current) {
                          const rect = ref.current.getBoundingClientRect();
                          const position = screenToFlowPosition({
                            x: rect.x,
                            y: rect.y,
                          });
                          const node = FlowManager.shared.create(
                            component.type,
                            {
                              icon: ComponentIcon,
                              position: position,
                            },
                          );
                          if (!node) {
                            throw Error(`该节点类型:${component.type}不存在`);
                          }
                          setNodes((oldNodes) => oldNodes.concat(node));
                        }
                      }}
                    >
                      {ComponentIcon && (
                        <ComponentIcon className={"w-4 h-4 mr-2"} />
                      )}
                      {component.name}
                    </ContextMenuItem>
                  );
                })}
              </div>
            );
          })}
        </ContextMenuSubContent>
      </ContextMenuSub>
    );
  };
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
          deleteKeyCode={["Delete"]}
        >
          <div
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          >
            {devTools && <DevTools />}
            <Background />
            <Controls />
            {miniMap && (
              <MiniMap
                maskStrokeColor={"#2563eb"}
                maskStrokeWidth={1}
                pannable={true}
                zoomable={true}
              />
            )}
            <Test />
          </div>
        </ReactFlow>
      </ContextMenuTrigger>
      <ContextMenuContent ref={ref}>{renderContextMenu()}</ContextMenuContent>
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
