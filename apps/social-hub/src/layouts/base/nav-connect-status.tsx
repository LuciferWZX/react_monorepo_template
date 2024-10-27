import { SidebarMenu } from "@/components";
import { useWuKongStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { ConnectStatus } from "wukongimjssdk";
import { cn } from "@/lib/utils.ts";

interface NavConnectStatusProps {
  className?: string;
}
export function NavConnectStatus(props: NavConnectStatusProps) {
  const { className } = props;
  const [status] = useWuKongStore(useShallow((state) => [state.status]));
  // const { isMobile } = useSidebar();
  return (
    <SidebarMenu className={className}>
      <div className={"flex items-center"}>
        <div className="flex flex-shrink-0 aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
          <div
            className={cn(
              "flex flex-shrink-0 aspect-square size-2  items-center justify-center rounded-lg",
              {
                "bg-green-600": status === ConnectStatus.Connected,
                "bg-red-600":
                  status === ConnectStatus.ConnectFail ||
                  status === ConnectStatus.Disconnect,
                "bg-yellow-600":
                  status === ConnectStatus.ConnectKick ||
                  status === ConnectStatus.Connecting,
              },
            )}
          />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {status === ConnectStatus.Connecting && "连接中..."}
            {status === ConnectStatus.Connected && "已连接"}
            {status === ConnectStatus.ConnectFail && "连接失败"}
            {status === ConnectStatus.Disconnect && "连接已断开"}
            {status === ConnectStatus.ConnectKick && "重连中"}
          </span>
        </div>
      </div>
    </SidebarMenu>
  );
}
