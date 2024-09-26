import { AgentFlow } from "@/components";
import { useTheme } from "@zhixin/shadcn_lib";

const FileContent = () => {
  const { theme } = useTheme();
  return (
    <div className={" h-full w-full overflow-auto"}>
      <AgentFlow theme={theme} />
    </div>
  );
};
export default FileContent;
