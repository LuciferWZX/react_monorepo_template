import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";
import { match } from "ts-pattern";
import { Form } from "@/components/ui/form.tsx";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/components";
import AppearanceSettings from "@/components/setting-dialog/AppearanceSettings.tsx";
const LOCAL_SETTING = ["Appearance", "Language & region"];
const SETTING = {
  nav: [
    { name: "Notifications", label: "通知", icon: Bell },
    { name: "Navigation", label: "导航", icon: Menu },
    { name: "Home", label: "主页", icon: Home },
    { name: "Appearance", label: "界面", icon: Paintbrush },
    { name: "Messages & media", label: "信息与媒体", icon: MessageCircle },
    { name: "Language & region", label: "语言与区域", icon: Globe },
    { name: "Shortcut", label: "快捷键", icon: Keyboard },
    { name: "Mark as read", label: "通知", icon: Check },
    { name: "Audio & video", label: "音频与视频", icon: Video },
    { name: "Connected accounts", label: "关联账户", icon: Link },
    { name: "Privacy & visibility", label: "隐私", icon: Lock },
    { name: "Advanced", label: "高级", icon: Settings },
  ],
};

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}
const settingFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  // font: z.enum(["inter", "manrope", "system"], {
  //   invalid_type_error: "Select a font",
  //   required_error: "Please select a font.",
  // }),
});
type SettingFormValues = z.infer<typeof settingFormSchema>;
export function SettingsDialog(props: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("");
  const [user, isLogin] = useUserStore(
    useShallow((state) => [state.user, !!state.user]),
  );
  console.log("setting:user", user);
  const { theme } = useTheme();
  const mergedOpen = useMemo(() => {
    return props.open ?? open;
  }, [props.open, open]);
  const mergedOnOpenChange = useMemo(
    () => props.onOpenChange ?? setOpen,
    [props.onOpenChange, setOpen],
  );
  const mergedNavs = useMemo(() => {
    if (!isLogin) {
      return SETTING.nav.filter((item) => LOCAL_SETTING.includes(item.name));
    }
    return SETTING.nav;
  }, [isLogin]);
  const targetNav = useMemo(() => {
    return SETTING.nav.find((_nav) => _nav.name === activeNav);
  }, [activeNav]);
  const defaultFormValues: Partial<SettingFormValues> = useMemo(() => {
    return {
      theme: theme,
    };
  }, [theme]);
  const form = useForm<z.infer<typeof settingFormSchema>>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: defaultFormValues,
  });
  useLayoutEffect(() => {
    if (!activeNav) {
      setActiveNav(mergedNavs[0].name);
    }
  }, [mergedNavs]);
  const settingContent = useMemo(() => {
    return match(targetNav?.name)
      .with("Appearance", () => {
        return <AppearanceSettings form={form} />;
      })
      .otherwise(() => {
        return null;
      });
  }, [targetNav, form]);
  return (
    <Dialog open={mergedOpen} onOpenChange={mergedOnOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">设置</DialogTitle>
        <DialogDescription className="sr-only">
          在这里自定义您的设置
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {mergedNavs.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          onClick={() => setActiveNav(item.name)}
                          isActive={item.name === activeNav}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      设置
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{targetNav?.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <Form {...form}>
              <form className="space-y-2 px-4">{settingContent}</form>
            </Form>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
export interface BaseSettingProps {
  form: UseFormReturn<any, any, any>;
}
