import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "./app-sidebar";
import AppHeader from "@/layouts/base/app-header.tsx";

const BaseLayout = () => {
  return (
    <div className={"h-screen w-screen overflow-auto"}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={"overflow-auto h-svh"}>
          <Outlet context={{ header: AppHeader }} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
export default BaseLayout;
