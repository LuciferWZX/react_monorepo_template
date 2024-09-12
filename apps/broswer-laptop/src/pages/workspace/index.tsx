import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@zhixin/shadcn_lib";
import Directory from "@/pages/workspace/Directory";

const WorkspacePage = () => {
  return (
    <div className={"h-full"}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <Directory />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div>right</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default WorkspacePage;
