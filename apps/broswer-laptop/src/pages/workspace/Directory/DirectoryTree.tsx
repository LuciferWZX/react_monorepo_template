import {
  IWorkspace,
  IWorkspaceTree,
  WorkspaceType,
} from "@/types/workspace.ts";
import { MouseEvent, useMemo, useState } from "react";
import { cn, Collapsible, CollapsibleContent } from "@zhixin/shadcn_lib";
import { FileTerminal, Folder, FolderOpen } from "lucide-react";
import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { convertToTree } from "@/libs";

interface DirectoryTreeProps {
  data: IWorkspace[];
  className?: string;
  rightClick?: (data: IWorkspaceTree) => void;
}

const DirectoryTree = (props: DirectoryTreeProps) => {
  const { data, className, rightClick } = props;
  const ids = useWorkspaceStore(
    useShallow((state) => state.selectedWorkspaceIds),
  );

  const treeData = useMemo(() => convertToTree(data), [data]);
  return (
    <div className={cn("min-w-fit overflow-auto", className)}>
      {treeData.map((_treeData) => {
        return (
          <TreeLeaf
            rightClick={rightClick}
            selectedIds={ids}
            click={(event, _data) => {
              if (event.altKey) {
                if (ids.includes(_data.id)) {
                  useWorkspaceStore.setState({
                    selectedWorkspaceIds: ids.filter((id) => id !== _data.id),
                  });
                } else {
                  useWorkspaceStore.setState({
                    selectedWorkspaceIds: ids.concat(_data.id),
                  });
                }
                return;
              }
              useWorkspaceStore.setState({ selectedWorkspaceIds: [_data.id] });
            }}
            ml={2}
            key={_treeData.id}
            data={_treeData}
          />
        );
      })}
    </div>
  );
};
interface TreeLeafProps {
  data: IWorkspaceTree;
  ml: number;
  className?: string;
  rightClick?: (data: IWorkspaceTree) => void;
  click?: (event: MouseEvent<HTMLButtonElement>, data: IWorkspaceTree) => void;
  selectedIds: string[];
}
const TreeLeaf = (props: TreeLeafProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, className, ml, rightClick, click, selectedIds } = props;

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
          "block w-full p-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
          {
            "!bg-primary": selectedIds.includes(data.id),
          },
        )}
        onDoubleClick={() => {
          setOpen(!open);
          if (data.type === WorkspaceType.file) {
            useWorkspaceStore.setState((oldState) => {
              return {
                worksMap: new Map(oldState.worksMap).set(data.id, "aaaa"),
              };
            });
          }
        }}
        onClick={(event) => click?.(event, data)}
        onContextMenu={() => {
          rightClick?.(data);
        }}
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
            return (
              <TreeLeaf
                selectedIds={selectedIds}
                rightClick={rightClick}
                click={click}
                ml={ml + 20}
                key={_data.id}
                data={_data}
              />
            );
          })}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default DirectoryTree;
