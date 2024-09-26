import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  SToast,
} from "@zhixin/shadcn_lib";
import { useRequest } from "ahooks";
import { APIManager } from "@/managers";
import useWorkspace from "@/pages/workspace/useWorkspace.ts";
import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { ResponseCode } from "@/types";
import { LoaderCircle } from "lucide-react";
import { convertToTree, getDeletedWorksId } from "@/libs";

interface WorkspaceDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
}
const DeleteWorkspaceDialog = (props: WorkspaceDialogProps) => {
  const { open, onOpenChange } = props;
  const [ids] = useWorkspaceStore(
    useShallow((state) => [state.selectedWorkspaceIds]),
  );
  const { initialWorkspace } = useWorkspace();
  const { runAsync: batchDeleteWorkspace, loading } = useRequest(
    APIManager.workspaceService.batchDeleteWorkspace,
    {
      manual: true,
    },
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>删除</AlertDialogTitle>
          <AlertDialogDescription>
            所选目录中的所有文件和子目录都将被删除。您可能无法完全撤消此操作！
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={async () => {
              const response = await batchDeleteWorkspace({ ids: ids });
              if (response.code === ResponseCode.success) {
                useWorkspaceStore.setState((oldState) => {
                  const { deletedIds, leftIds } = getDeletedWorksId(
                    ids,
                    Array.from(oldState.worksMap.keys()),
                    convertToTree(oldState.workspaces),
                  );
                  const newMap = new Map(oldState.worksMap);
                  deletedIds.forEach((deletedId) => {
                    newMap.delete(deletedId);
                  });
                  return {
                    workIds: leftIds,
                    worksMap: newMap,
                  };
                });
                initialWorkspace();
                onOpenChange(false);
                SToast.success("删除成功", {
                  position: "top-center",
                  id: "delete",
                  duration: 1000,
                });

                return;
              }
              SToast.error(response.message, {
                position: "top-center",
                id: "delete",
                duration: 1000,
              });
            }}
            variant={"destructive"}
          >
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            删除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteWorkspaceDialog;
