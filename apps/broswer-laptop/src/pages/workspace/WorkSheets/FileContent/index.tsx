import { AgentFlow } from "@/components";
import { useTheme } from "@zhixin/shadcn_lib";

const FileContent = () => {
  const { theme } = useTheme();
  return (
    <div className={"flex-1 h-full w-full relative overflow-hidden"}>
      <AgentFlow theme={theme} miniMap={true} />
    </div>
  );
};
export default FileContent;
