import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { cn, ScrollArea, TabsList, TabsTrigger } from "@zhixin/shadcn_lib";
import { X } from "lucide-react";
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
    <ScrollArea
      classes={{
        thumb: {
          horizontal: "rounded-none opacity-80",
        },
      }}
      className={"p-1"}
    >
      {files.length > 0 && (
        <TabsList className={"justify-start gap-1"}>
          {files.map((file) => {
            return <Trigger buildId={buildId} file={file} key={file.id} />;
          })}
        </TabsList>
      )}
    </ScrollArea>
  );
};
interface TriggerProps {
  file: IWorkspace;
  buildId: string | undefined;
}
const Trigger = (props: TriggerProps) => {
  const { file, buildId } = props;
  return (
    <TabsTrigger
      className={"group hover:bg-background/30"}
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
