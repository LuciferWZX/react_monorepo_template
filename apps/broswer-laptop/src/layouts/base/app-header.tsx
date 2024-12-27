import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils.ts";
export interface AppHeaderProps {
  className?: string;
}
const AppHeader = (props: AppHeaderProps) => {
  const { className } = props;
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 transition-[width,height]  border-b ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
};
export default AppHeader;
