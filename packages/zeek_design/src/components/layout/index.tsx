import { ReactNode } from "react";
import {
  // SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import { AppSidebar } from "./app-sidebar.tsx";
import { ScrollArea } from "@/components";

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
      {/*<SidebarInset className={"h-full"}>*/}
      <main className={"h-svh"}>
        <ScrollArea
          className={"h-full break-all "}
          classes={{ viewport: "h-full" }}
        >
          <SidebarTrigger />
          {children}
        </ScrollArea>
      </main>
      {/*</SidebarInset>*/}
    </SidebarProvider>
  );
};
