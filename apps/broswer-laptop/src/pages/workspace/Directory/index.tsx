import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ScrollArea,
} from "@zhixin/shadcn_lib";
import { FileText, Folder } from "lucide-react";
import DirectoryTree from "@/pages/workspace/Directory/DirectoryTree.tsx";
import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import WorkspaceDialog from "@/pages/workspace/Directory/WorkspaceDialog.tsx";
import { useState } from "react";
import { WorkspaceType } from "@/types/workspace.ts";

const Directory = () => {
  const workspaces = useWorkspaceStore(useShallow((state) => state.workspaces));
  const [open, setOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<WorkspaceType>(WorkspaceType.file);
  return (
    <div className={"h-full flex flex-col overflow-auto"}>
      <div className={"h-8"}>header</div>
      <ContextMenu modal={true}>
        <ContextMenuTrigger className="flex-1 overflow-auto">
          <ScrollArea
            className={"h-full w-full p-1"}
            breakAll={false}
            hideHorizontal={false}
          >
            <DirectoryTree
              rightClick={(data) => {
                console.log("右击:", data);
              }}
              className={"p-1"}
              data={workspaces}
            />
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>新建</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem
                onClick={() => {
                  setOpen(true);
                  setOpenType(WorkspaceType.file);
                }}
              >
                <FileText className={"w-4 h-4 mr-2"} />
                文件
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setOpen(true);
                  setOpenType(WorkspaceType.dir);
                }}
              >
                <Folder className={"w-4 h-4 mr-2"} />
                文件夹
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <WorkspaceDialog openType={openType} open={open} onOpenChange={setOpen} />
    </div>
  );
};
export default Directory;
