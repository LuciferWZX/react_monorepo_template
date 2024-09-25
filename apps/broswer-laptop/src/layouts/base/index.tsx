import { Outlet, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@zhixin/shadcn_lib";
import { useEffect } from "react";
import { APPManager } from "@/managers";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import NavMenu from "@/layouts/base/nav_menu";

const AuthBaseLayout = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className={"h-screen w-screen flex"}>
        <aside>
          <NavMenu />
        </aside>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  );
};
const BaseLayout = () => {
  const user = useAppStore(useShallow((state) => state.user));
  useInitUser();
  if (!user) {
    return <div>loading</div>;
  }
  return <AuthBaseLayout />;
};
const useInitUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    APPManager.shared
      .initApp({
        failed: (reason) => {
          console.log(reason);
          navigate("/login");
        },
      })
      .then();
  }, []);
};
export default BaseLayout;
