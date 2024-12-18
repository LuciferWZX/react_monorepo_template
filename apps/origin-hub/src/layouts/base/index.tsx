import { AppSidebar } from "./base-side";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useApp } from "@/hooks";
import { UserProvider, useUser } from "@/components";
import { useWuKong } from "@/hooks/use-wuKong.ts";

const AuthedBaseLayout = () => {
  const { user } = useUser();
  useWuKong(user);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={"h-svh overflow-auto"}>
        <header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
const BaseLayout = () => {
  const { loading, user } = useApp();
  if (loading) {
    return <InitialAppLoading />;
  }
  if (!user) {
    return "user is null";
  }
  return (
    <UserProvider user={user}>
      <AuthedBaseLayout />
    </UserProvider>
  );
  // return <InitialAppLoading />;
};
const InitialAppLoading = () => {
  return (
    <div className={"flex h-screen w-full items-center justify-center px-4"}>
      loading...
    </div>
  );
};
export default BaseLayout;
