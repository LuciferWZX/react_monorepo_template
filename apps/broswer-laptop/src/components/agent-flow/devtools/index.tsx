import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  HTMLAttributes,
} from "react";
import { Panel } from "@xyflow/react";

import NodeInspector from "./NodeInspector";
import ChangeLogger from "./ChangeLogger";
import ViewportLogger from "./ViewportLogger";
import { cn } from "@zhixin/shadcn_lib";
export default function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(true);
  const [changeLoggerActive, setChangeLoggerActive] = useState(true);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(true);

  return (
    <div className="react-flow__devtools">
      <Panel position="top-left">
        <div className={"flex gap-2"}>
          <DevToolButton
            setActive={setNodeInspectorActive}
            active={nodeInspectorActive}
            title="Toggle Node Inspector"
          >
            Node Inspector
          </DevToolButton>
          <DevToolButton
            setActive={setChangeLoggerActive}
            active={changeLoggerActive}
            title="Toggle Change Logger"
          >
            Change Logger
          </DevToolButton>
          <DevToolButton
            setActive={setViewportLoggerActive}
            active={viewportLoggerActive}
            title="Toggle Viewport Logger"
          >
            Viewport Logger
          </DevToolButton>
        </div>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </div>
  );
}

function DevToolButton({
  active,
  setActive,
  children,
  ...rest
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => setActive((a) => !a)}
      className={cn(
        "transition-colors focus-visible:outline-none focus-visible:ring-2 px-2 focus-visible:ring-ring bg-muted text-muted-foreground rounded",
        {
          "bg-blue-600 text-white": active,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
