import { ScrollArea, SidebarProvider } from "@/components";
import { AppSidebar } from "@/layouts/base/app-sidebar.tsx";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className={"h-screen w-full"}>
        <div className={"h-8"}>header</div>
        <ScrollArea className={"h-full"} classes={{ viewport: "h-full" }}>
          <Outlet />
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};
export default BaseLayout;
