import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  SToast,
} from "@zhixin/shadcn_lib";
import { WorkspaceType } from "@/types/workspace.ts";
import { useState } from "react";
import { useRequest } from "ahooks";
import { APIManager } from "@/managers";
import { ResponseCode } from "@/types";
import useWorkspace from "@/pages/workspace/useWorkspace.ts";

interface WorkspaceDialogProps {
  open: boolean;
  openType: WorkspaceType;
  onOpenChange: (_open: boolean) => void;
}
const WorkspaceDialog = (props: WorkspaceDialogProps) => {
  const { open, onOpenChange, openType } = props;
  const isFile = openType === WorkspaceType.file;
  const [name, setName] = useState<string>("");
  const { initialWorkspace } = useWorkspace();
  const { runAsync: addWorkspace } = useRequest(
    APIManager.workspaceService.addWorkspace,
    {
      manual: true,
    },
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isFile ? "新建文件" : "新建文件夹"}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="w-full">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={async (event) => {
              if (event.key === "Enter" && name) {
                const response = await addWorkspace({
                  name: name,
                  type: openType,
                });
                if (response.code === ResponseCode.success) {
                  await initialWorkspace();
                  onOpenChange(false);
                  return;
                }
                SToast.error(response.message, {
                  position: "top-center",
                  id: "add",
                  duration: 1000,
                });
              }
            }}
            placeholder={isFile ? "文件名称" : "文件夹名称"}
            className={"w-full"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WorkspaceDialog;
