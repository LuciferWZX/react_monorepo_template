import { SonnerToaster } from "@/components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className={"h-screen overflow-hidden"}>
      <Outlet />
      <SonnerToaster />
    </div>
  );
};
export default RootLayout;
