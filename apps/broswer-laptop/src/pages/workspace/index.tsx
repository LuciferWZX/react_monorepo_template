import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@zhixin/shadcn_lib";
import useWorkspace from "@/pages/workspace/useWorkspace.ts";
import { useEffect } from "react";
import WorkSheets from "@/pages/workspace/WorkSheets";
import LeftPanel from "@/pages/workspace/LeftPanel";

const WorkspacePage = () => {
  const { initial } = useWorkspace();
  useEffect(() => {
    initial().then();
  }, []);
  return (
    <div className={"h-full"}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          collapsible={true}
          defaultSize={30}
          minSize={20}
          maxSize={40}
        >
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <WorkSheets />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default WorkspacePage;
