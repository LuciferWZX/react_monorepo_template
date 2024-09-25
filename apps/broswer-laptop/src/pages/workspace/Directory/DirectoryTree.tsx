import {
  IWorkspace,
  IWorkspaceTree,
  WorkspaceType,
} from "@/types/workspace.ts";
import { useMemo, useState } from "react";
import { cn, Collapsible, CollapsibleContent } from "@zhixin/shadcn_lib";
import { FileTerminal, Folder, FolderOpen } from "lucide-react";

interface DirectoryTreeProps {
  data: IWorkspace[];
  className?: string;
}
function convertToTree(workspaces: IWorkspace[]) {
  const map = new Map();
  const result: IWorkspaceTree[] = [];
  workspaces.forEach((workspace) => {
    map.set(workspace.id, { ...workspace, children: [] });
  });
  workspaces.forEach((workspace) => {
    if (workspace.parentId) {
      const parent = map.get(workspace.parentId);
      if (parent) {
        parent.children.push(map.get(workspace.id));
      }
    } else {
      result.push(map.get(workspace.id));
    }
  });
  return result;
}
const DirectoryTree = (props: DirectoryTreeProps) => {
  const { data, className } = props;
  const treeData = useMemo(() => convertToTree(data), [data]);
  return (
    <div className={cn("min-w-fit overflow-auto", className)}>
      {treeData.map((_treeData) => {
        return <TreeLeaf ml={2} key={_treeData.id} data={_treeData} />;
      })}
    </div>
  );
};
interface TreeLeafProps {
  data: IWorkspaceTree;
  ml: number;
  className?: string;
}
const TreeLeaf = (props: TreeLeafProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, className, ml } = props;
  const renderIcon = () => {
    if (data.type === WorkspaceType.file) {
      return <FileTerminal className={"w-4 h-4 text-blue-500"} />;
    }
    return open ? (
      <FolderOpen className={"w-4 h-4 text-orange-500"} />
    ) : (
      <Folder className={"w-4 h-4 text-orange-500"} />
    );
  };
  return (
    <Collapsible open={open} className={"select-none w-full whitespace-nowrap"}>
      <button
        className={cn(
          "block w-full p-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        onClick={() => setOpen(!open)}
      >
        <div
          className={cn("flex gap-1 items-center text-sm", className)}
          style={{ marginLeft: ml }}
        >
          {renderIcon()}
          {data.name}
        </div>
      </button>
      <CollapsibleContent>
        {data.children.length > 0 &&
          data.children.map((_data) => {
            return <TreeLeaf ml={ml + 20} key={_data.id} data={_data} />;
          })}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default DirectoryTree;
