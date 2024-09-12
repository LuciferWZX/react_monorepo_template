import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@zhixin/shadcn_lib";
import NavMenu from "@/layouts/base/nav_menu/inex.tsx";

const BaseLayout = () => {
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
export default BaseLayout;
