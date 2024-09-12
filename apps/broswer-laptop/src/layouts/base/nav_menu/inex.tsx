import { Ellipsis, Folder, LucideIcon, Settings } from "lucide-react";
import {
  buttonVariants,
  cn,
  ScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zhixin/shadcn_lib";
import { MouseEventHandler, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LinkProps {
  icon: LucideIcon;
  key: string;
  label: string;
  variant?: "default" | "ghost";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const NavMenu = () => {
  // https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/mail/components/nav.tsx
  const location = useLocation();
  const navigate = useNavigate();
  const links: LinkProps[] = useMemo(() => {
    return [
      {
        icon: Folder,
        label: "工程",
        key: "/workspace",
        onClick: () => {
          navigate("/workspace");
        },
      },
      { icon: Ellipsis, label: "更多工具", key: "tools" },
    ].map((link) => {
      const variant = location.pathname.startsWith(link.key)
        ? "default"
        : "ghost";
      return {
        ...link,
        variant: variant,
      };
    });
  }, [location.pathname]);
  const functions: LinkProps[] = [
    {
      icon: Settings,
      label: "设置",
      key: "settings",
      variant: "ghost",
      onClick: () => {
        navigate("/settings");
      },
    },
  ];
  return (
    <div className={"border-r h-full flex flex-col"}>
      <div className={"py-2"}>
        <nav className="px-2 grid gap-1">
          {links.map((link) => {
            return (
              <Tooltip key={link.key} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={link.onClick}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9 cursor-pointer dark:text-muted-foreground dark:hover:text-white",
                      link.variant === "default" &&
                        "dark:text-white dark:bg-muted",
                      // "bg-muted text-muted-foreground hover:bg-muted hover:text-white",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
      <Separator orientation={"horizontal"} />
      <ScrollArea className={"flex-1"}>
        <div className={"h-[1900px]"}>xxa</div>
      </ScrollArea>
      <Separator orientation={"horizontal"} />
      <div className={"py-2 "}>
        <nav className="px-2 grid gap-1">
          {functions.map((link) => {
            return (
              <Tooltip key={link.key} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={link.onClick}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9 cursor-pointer dark:text-muted-foreground dark:hover:text-white",
                      link.variant === "default" &&
                        "dark:text-white dark:bg-muted",
                      // "bg-muted text-muted-foreground hover:bg-muted hover:text-white",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default NavMenu;
