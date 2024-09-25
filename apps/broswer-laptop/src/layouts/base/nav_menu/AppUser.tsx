import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@zhixin/shadcn_lib";
import { useAppStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import LogoutDialog from "@/components/logout-dialog";
import { useState } from "react";

const AppUser = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const user = useAppStore(useShallow((state) => state.user));
  return (
    <div className={"p-1 flex justify-center items-center"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full overflow-clip"
          >
            <img
              src={user?.avatar}
              alt={"头像"}
              className="h-full w-full object-fill"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"right"} align="end">
          <DropdownMenuLabel className={"max-w-36 break-words"}>
            <div>{user?.nickname}</div>
            <div className={"text-muted-foreground text-sm"}>
              {user?.username}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>我的个人名片</DropdownMenuItem>
          <DropdownMenuItem>设置</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenLogoutDialog(true)}>
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog
        open={openLogoutDialog}
        onOpenChange={setOpenLogoutDialog}
      />
    </div>
  );
};
export default AppUser;
