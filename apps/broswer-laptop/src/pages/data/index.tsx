import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { AppManager } from "@/instances/AppManager.ts";
import { toast } from "sonner";
import { Message } from "@/components";

const DataPage = () => {
  console.log(11111, window.__TAURI__);
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
    <div>
      data page
      <Outlet />
    </div>
  );
};
export default DataPage;
