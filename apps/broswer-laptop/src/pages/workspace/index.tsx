import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@zhixin/shadcn_lib";
import Directory from "@/pages/workspace/Directory";
import useWorkspace from "@/pages/workspace/useWorkspace.ts";
import { useEffect } from "react";

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
          <Directory />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div>right</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default WorkspacePage;
