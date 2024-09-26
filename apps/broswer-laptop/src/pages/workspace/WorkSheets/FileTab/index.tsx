import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import {
  Button,
  cn,
  ScrollArea,
  TabsList,
  TabsTrigger,
} from "@zhixin/shadcn_lib";
import { MoreHorizontal, X } from "lucide-react";
import { IWorkspace } from "@/types/workspace.ts";
const FileTab = () => {
  const [files, buildId] = useWorkspaceStore(
    useShallow((state) => {
      const ids = Array.from(state.worksMap.keys());
      const files = state.workspaces.filter((workspace) =>
        ids.includes(workspace.id),
      );
      return [files, state.builderId];
    }),
  );

  return (
    <div>
      <TabsList
        className={
          "w-full rounded-none justify-start h-10 p-0 border-b bg-muted/40 "
        }
      >
        <ScrollArea
          className={"w-full"}
          classes={{
            viewport: "p-1",
            thumb: {
              horizontal: "rounded-none opacity-80",
            },
          }}
        >
          <div className={"whitespace-nowrap"}>
            {files.map((file) => {
              return (
                <Trigger
                  className={"mr-1 "}
                  buildId={buildId}
                  file={file}
                  key={file.id}
                />
              );
            })}
          </div>
        </ScrollArea>
        <div className={"sticky right-0 px-1 bg-background"}>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className={"w-4 h-4"} />
          </Button>
        </div>
      </TabsList>
    </div>
  );
};
interface TriggerProps {
  file: IWorkspace;
  className?: string;
  buildId: string | undefined;
}
const Trigger = (props: TriggerProps) => {
  const { file, buildId, className } = props;
  return (
    <TabsTrigger
      className={cn(
        "group rounded-none hover:bg-background relative",
        {
          "after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600":
            buildId === file.id,
        },
        className,
      )}
      value={file.id}
      onClick={() => {
        useWorkspaceStore.setState({
          builderId: file.id,
        });
      }}
    >
      {file.name}
      <span className={"h-5 w-5"}>
        <span
          onClick={(event) => {
            event.stopPropagation();
            useWorkspaceStore.setState((oldState) => {
              oldState.worksMap.delete(file.id);
              if (buildId === file.id) {
                const ids = Array.from(oldState.worksMap.keys());
                if (ids.length > 0) {
                  return {
                    builderId: ids[0],
                    worksMap: new Map(oldState.worksMap),
                  };
                }
              }
              return {
                worksMap: new Map(oldState.worksMap),
              };
            });
          }}
          className={cn(
            "ml-2 rounded-full h-5 w-5 hidden items-center justify-center hover:bg-muted  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            {
              flex: buildId === file.id,
            },
            "group-hover:flex",
          )}
        >
          <X className={"w-4 h-4"} />
        </span>
      </span>
    </TabsTrigger>
  );
};
export default FileTab;
