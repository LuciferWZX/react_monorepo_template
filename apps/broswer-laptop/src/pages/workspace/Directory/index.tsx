import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ScrollArea,
} from "@zhixin/shadcn_lib";
import { FileText, Folder, Trash2 } from "lucide-react";
import DirectoryTree from "@/pages/workspace/Directory/DirectoryTree.tsx";
import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import WorkspaceDialog from "@/pages/workspace/Directory/WorkspaceDialog.tsx";
import { Fragment, useState } from "react";
import { IWorkspaceTree, WorkspaceType } from "@/types/workspace.ts";
import DeleteWorkspaceDialog from "@/pages/workspace/Directory/DeleteWorkspaceDialog.tsx";

const Directory = () => {
  const [workspaces, ids] = useWorkspaceStore(
    useShallow((state) => [state.workspaces, state.selectedWorkspaceIds]),
  );
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [openType, setOpenType] = useState<WorkspaceType>(WorkspaceType.file);
  const [parentWorkspace, setParentWorkspace] = useState<IWorkspaceTree | null>(
    null,
  );
  const renderNewWorkspace = () => {
    if (ids.length > 1) {
      return null;
    }
    const child = (
      <Fragment>
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
        <ContextMenuSeparator />
      </Fragment>
    );
    if (parentWorkspace && parentWorkspace.type === WorkspaceType.dir) {
      return child;
    }
    if (!parentWorkspace) {
      return child;
    }
  };
  const renderDeleteWorkspace = () => {
    if (ids.length > 0) {
      return (
        <Fragment>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => setDeleteOpen(true)}>
            删除 <Trash2 className="ml-auto h-4 w-4" />
          </ContextMenuItem>
        </Fragment>
      );
    }
    return null;
  };
  return (
    <div className={"h-full flex flex-col overflow-auto"}>
      <ContextMenu modal={true}>
        <ContextMenuTrigger className="flex-1 overflow-auto">
          <ScrollArea
            className={"h-full w-full p-1"}
            breakAll={false}
            hideHorizontal={false}
            id={"workspace_dir"}
            onContextMenu={(event) => {
              const isRoot =
                (event.target as HTMLElement).getAttribute(
                  "data-radix-scroll-area-viewport",
                ) === "";
              if (isRoot) {
                setParentWorkspace(null);
                useWorkspaceStore.setState({
                  selectedWorkspaceIds: [],
                });
              }
            }}
          >
            <DirectoryTree
              rightClick={(data) => {
                console.log("右击:", data);
                if (!ids.includes(data.id)) {
                  setParentWorkspace(data);
                  //如果已选中的ids中没有该id则设为该id
                  useWorkspaceStore.setState({
                    selectedWorkspaceIds: [data.id],
                  });
                  return;
                }
                if (ids.length === 1) {
                  //如果包含已选中的id并且只选中了该id
                  setParentWorkspace(data);
                  return;
                }
                setParentWorkspace(null);
              }}
              className={"p-1"}
              data={workspaces}
            />
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {renderNewWorkspace()}

          <ContextMenuItem>属性</ContextMenuItem>

          {renderDeleteWorkspace()}
        </ContextMenuContent>
      </ContextMenu>
      <WorkspaceDialog
        parentWorkspace={parentWorkspace}
        openType={openType}
        open={open}
        onOpenChange={setOpen}
      />
      <DeleteWorkspaceDialog open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
};
export default Directory;
