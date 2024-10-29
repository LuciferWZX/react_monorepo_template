import {
  Button,
  Label,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarSeparator,
} from "@/components";
import { cn } from "@/lib/utils.ts";
import { Plus, Search } from "lucide-react";
import FriendRequestDialog from "@/pages/chat/components/FriendRequestDialog.tsx";
import { useState } from "react";

const ChatSidebar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <nav
      className={cn(
        "h-full overflow-auto bg-sidebar/80 text-sidebar-foreground",
      )}
    >
      <header>
        <div className={cn("flex gap-2 p-2")}>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput id="search" placeholder="查询" className="pl-8" />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
          <FriendRequestDialog open={visible} onVisibleChange={setVisible}>
            <Button
              variant={"ghost"}
              className={cn("flex-shrink-0 p-1 h-8 w-8")}
              size={"icon"}
            >
              <Plus className={cn("w-4 h-4")} />
            </Button>
          </FriendRequestDialog>
        </div>
      </header>
      <SidebarSeparator />
    </nav>
  );
};
export default ChatSidebar;
