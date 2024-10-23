import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/sidebar";
import { AppSidebar } from "./app-sidebar.tsx";

interface LayoutProps {
  children?: ReactNode;
}
export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <SidebarProvider
    // style={{
    //   "--sidebar-width": "20rem",
    //   "--sidebar-width-mobile": "20rem",
    // }}
    // className={"overflow-auto"}
    >
      <AppSidebar />
      <SidebarInset>
        {/*<SidebarInset className={"h-full"}>*/}
        <main>{children}</main>
      </SidebarInset>

      {/*</SidebarInset>*/}
    </SidebarProvider>
  );
};
