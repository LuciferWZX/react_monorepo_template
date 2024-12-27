import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { AppManager } from "@/instances/AppManager.ts";
import { toast } from "sonner";
import { Message } from "@/components";
import AppHeader from "@/layouts/base/app-header.tsx";

const DataPage = () => {
  console.log(11111, window.__TAURI__);
  const context = useOutletContext<{ header: typeof AppHeader }>();
  useEffect(() => {
    AppManager.shared.initDataCollectionPath().catch((reason) => {
      toast.custom((t) => (
        <Message type={"error"} handleClose={() => toast.dismiss(t)}>
          {reason}
        </Message>
      ));
      console.log("reason:", reason);
    });
    getCollectionsPath().then();
  });
  const getCollectionsPath = async () => {
    const { appDataDir, join } = window.__TAURI__.path;
    const dataDir = await appDataDir();
    const path = await join(dataDir, "data", "collections");
    console.log("path:", path);
  };
  return (
    <div className={"h-full overflow-auto flex flex-col"}>
      {context.header && <context.header className={"flex-shrink-0"} />}
      <div className={"flex-1 overflow-auto"}>
        <Outlet />
      </div>
    </div>
  );
};
export default DataPage;
