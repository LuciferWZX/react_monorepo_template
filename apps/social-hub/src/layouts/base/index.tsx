import { ScrollArea, SidebarProvider } from "@/components";
import { AppSidebar } from "@/layouts/base/app-sidebar.tsx";
import { Outlet } from "react-router-dom";
import useAuthApp from "@/hooks/use-auth-app.ts";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

const BaseLayout = () => {
  const { checking } = useAuthApp();
  const locked = useAppStore(useShallow((state) => !!state.user));
  if (checking) {
    return <div>正在检查用户信息</div>;
  }
  if (!locked) {
    return <div>正在获取用户信息</div>;
  }
  return <AuthBaseLayout />;
};
const AuthBaseLayout = () => {
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
