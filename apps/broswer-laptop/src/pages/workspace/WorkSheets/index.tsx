import { useWorkspaceStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import FileTab from "@/pages/workspace/WorkSheets/FileTab";
import FileContent from "@/pages/workspace/WorkSheets/FileContent";
import { Tabs } from "@zhixin/shadcn_lib";
import { memo } from "react";

const WorkSheets = () => {
  const [builderId] = useWorkspaceStore(
    useShallow((state) => [state.builderId]),
  );

  return (
    <Tabs value={builderId ?? ""} className={"h-full w-full"}>
      <FileTab />
      <FileContent />
    </Tabs>
  );
};
export default memo(WorkSheets);
