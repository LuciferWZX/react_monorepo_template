import { ScrollArea } from "@zhixin/shadcn_lib";
import VariableDialog from "@/pages/workspace/Variable/VariableDialog.tsx";

const VariableList = () => {
  return (
    <ScrollArea className={"h-full w-full"}>
      <div className={"h-screen"}>xxx</div>
      <VariableDialog open={true} onOpenChange={() => {}} />
    </ScrollArea>
  );
};
export default VariableList;
