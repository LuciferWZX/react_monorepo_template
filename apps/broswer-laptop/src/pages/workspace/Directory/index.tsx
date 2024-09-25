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

const Directory = () => {
  const workspaces = useWorkspaceStore(useShallow((state) => state.workspaces));
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
            <DirectoryTree className={"p-1"} data={workspaces} />
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>新建</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <FileText className={"w-4 h-4 mr-2"} />
                文件
              </ContextMenuItem>
              <ContextMenuItem>
                <Folder className={"w-4 h-4 mr-2"} />
                文件夹
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};
export default Directory;
