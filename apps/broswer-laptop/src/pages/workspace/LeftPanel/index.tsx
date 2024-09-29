import Directory from "@/pages/workspace/Directory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zhixin/shadcn_lib";
import { useState } from "react";
import VariableList from "@/pages/workspace/Variable";

const LeftPanel = () => {
  const [value, setValue] = useState<"variable" | "workspace" | string>(
    "variable",
  );
  return (
    <Tabs
      value={value}
      onValueChange={(v) => setValue(v)}
      className={"h-full flex flex-col"}
    >
      <TabsList className=" rounded-none flex justify-start">
        <TabsTrigger className={"w-fit"} value="workspace">
          工作区
        </TabsTrigger>
        <TabsTrigger className={"w-fit"} value="variable">
          变量
        </TabsTrigger>
      </TabsList>
      <TabsContent className={"flex-1  overflow-auto"} value="workspace">
        <Directory />
      </TabsContent>
      <TabsContent className={"flex-1 overflow-auto"} value="variable">
        <VariableList />
      </TabsContent>
    </Tabs>
  );
};
export default LeftPanel;
