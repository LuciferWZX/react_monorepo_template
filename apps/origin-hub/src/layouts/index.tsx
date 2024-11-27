import { Outlet } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { SettingsDialog } from "@/components";
import { Toaster } from "@/components/ui/sonner.tsx";
import useAppColor from "@/layouts/use-app-color.ts";

const RootLayout = () => {
  useAppColor();
  return (
    <div>
      <LocalSettingButton />
      <Outlet />
      <Toaster />
    </div>
  );
};
const LocalSettingButton = () => {
  return (
    <SettingsDialog>
      <Button className={"absolute right-4 top-4"} variant="outline">
        <Settings
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        本地设置
        <kbd className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘ S
        </kbd>
      </Button>
    </SettingsDialog>
  );
};
export default RootLayout;
